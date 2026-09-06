import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { createClient } from "@supabase/supabase-js";

const openAlexUrl = "https://api.openalex.org/works";
const geminiModel = process.env.GEMINI_MODEL || "gemini-3.6-flash";
const localExplanationCache = new Map();

function withTimeout(promise, milliseconds = 2500) {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error("Supabase cache timeout")), milliseconds)),
  ]);
}

function databaseClient(request) {
  const authorization = request.headers.get("authorization");
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    { auth: { persistSession: false, autoRefreshToken: false }, global: authorization ? { headers: { Authorization: authorization } } : undefined },
  );
}

function abstractFromInvertedIndex(index) {
  if (!index || typeof index !== "object") return "";
  return Object.entries(index)
    .flatMap(([word, positions]) => (Array.isArray(positions) ? positions.map((position) => [position, word]) : []))
    .sort((a, b) => a[0] - b[0]).map((entry) => entry[1]).join(" ");
}

function authorsFromWork(work) {
  return (work?.authorships || []).map((authorship) => authorship?.author?.display_name).filter(Boolean);
}

function normalizeWork(work) {
  const id = work?.id || work?.openalex_id || "";
  const primaryLocation = work?.primary_location || {};
  const source = primaryLocation?.source || {};
  const isOpenAccess = Boolean(work?.open_access?.is_oa);
  return {
    id,
    openalex_id: id,
    title: work?.display_name || work?.title || "Untitled research work",
    abstract: work?.abstract_inverted_index ? abstractFromInvertedIndex(work.abstract_inverted_index) : (work?.abstract || ""),
    authors: authorsFromWork(work),
    venue: source?.display_name || "Unpublished venue",
    year: work?.publication_year || null,
    citation_count: work?.cited_by_count || 0,
    oa_pdf_url: primaryLocation?.pdf_url || work?.best_oa_location?.pdf_url || null,
    oa_url: work?.open_access?.oa_url || primaryLocation?.landing_page_url || null,
    is_open_access: isOpenAccess,
    oa_status: work?.open_access?.oa_status || (isOpenAccess ? "green" : "closed"),
    landing_page_url: primaryLocation?.landing_page_url || null,
    doi: work?.doi || null,
  };
}

const STOPWORDS = new Set(["a","an","the","and","or","of","in","on","for","to","with","by","is","are","was","were","be","been","being","this","that","these","those","from","as","at","it","its","i","we","you","they","he","she","them","us","our","their","his","her","which","who","whom","whose","what","when","where","why","how","not","no","do","does","did","have","has","had","can","could","should","would","may","might","will","shall","about","into","over","under","between","through","across"]);

function planQuery(rawQuery) {
  const trimmed = (rawQuery || "").trim();
  const words = trimmed.split(/\s+/).filter(Boolean);
  if (words.length <= 2) {
    // Short queries: strict match — term must appear in title or abstract, not just fulltext neighborhoods
    return { mode: "strict", queryText: trimmed };
  }
  const keywords = words.filter((word) => {
    const lower = word.toLowerCase().replace(/[^a-z0-9-]/g, "");
    return lower.length > 2 && !STOPWORDS.has(lower);
  });
  const kept = keywords.length >= 2 ? keywords : words;
  return { mode: "keywords", queryText: kept.join(" ") };
}

async function searchPapers(query, { page = 1, perPage = 25, sort = "relevance", access = "all" } = {}) {
  const url = new URL(openAlexUrl);
  const { mode, queryText } = planQuery(query);
  const filters = [];
  if (mode === "strict") {
    filters.push(`title_and_abstract.search:${queryText}`);
    url.searchParams.set("search", queryText);
  } else {
    url.searchParams.set("search", queryText);
  }
  if (access === "oa") filters.push("is_oa:true");
  else if (access === "closed") filters.push("is_oa:false");
  if (filters.length) url.searchParams.set("filter", filters.join(","));
  url.searchParams.set("per-page", String(Math.min(Math.max(perPage, 1), 50)));
  url.searchParams.set("page", String(Math.max(page, 1)));
  const sortMap = { year: "publication_year:desc", citations: "cited_by_count:desc", relevance: "relevance_score:desc" };
  url.searchParams.set("sort", sortMap[sort] || sortMap.relevance);
  const response = await fetch(url, { next: { revalidate: 60 } });
  if (!response.ok) throw new Error("OpenAlex unavailable");
  const payload = await response.json();
  return {
    results: (payload?.results || []).map(normalizeWork),
    total: payload?.meta?.count || 0,
    page: payload?.meta?.page || page,
    perPage: payload?.meta?.per_page || perPage,
    matchMode: mode,
    effectiveQuery: queryText,
  };
}

async function fetchPaper(id) {
  const workId = decodeURIComponent(id).replace(/\/$/, "").split("/").pop();
  const response = await fetch(`${openAlexUrl}/${encodeURIComponent(workId)}`, { next: { revalidate: 300 } });
  if (!response.ok) return null;
  return normalizeWork(await response.json());
}

async function currentUser(request, client) {
  if (!request.headers.get("authorization")) return null;
  const { data } = await client.auth.getUser();
  return data?.user || null;
}

export async function GET(request, context) {
  try {
    const { path = [] } = await context.params;
    const route = path[0];
    const client = databaseClient(request);
    if (route === "search") {
      const query = request.nextUrl.searchParams.get("q")?.trim();
      if (!query || query.length < 2) return NextResponse.json({ error: "Enter at least two characters." }, { status: 400 });
      const page = parseInt(request.nextUrl.searchParams.get("page") || "1", 10);
      const perPage = parseInt(request.nextUrl.searchParams.get("per_page") || "25", 10);
      const sort = request.nextUrl.searchParams.get("sort") || "relevance";
      let access = (request.nextUrl.searchParams.get("access") || "").toLowerCase();
      const legacyOa = request.nextUrl.searchParams.get("oa");
      if (!access && (legacyOa === "1" || legacyOa === "true")) access = "oa";
      if (!["all", "oa", "closed"].includes(access)) access = "all";
      const { results: papers, total, page: currentPage, perPage: currentPerPage, matchMode, effectiveQuery } = await searchPapers(query, { page, perPage, sort, access });
      if (papers.length) await client.from("papers").upsert(papers, { onConflict: "id" });
      return NextResponse.json({ results: papers, query, total, page: currentPage, per_page: currentPerPage, sort, access, match_mode: matchMode, effective_query: effectiveQuery });
    }
    if (route === "paper") {
      const id = request.nextUrl.searchParams.get("id");
      if (!id) return NextResponse.json({ error: "A paper id is required." }, { status: 400 });
      const existing = await client.from("papers").select("*").eq("id", id).maybeSingle();
      if (existing?.data) return NextResponse.json({ paper: existing.data });
      const paper = await fetchPaper(id);
      if (!paper) return NextResponse.json({ error: "Paper not found." }, { status: 404 });
      await client.from("papers").upsert(paper, { onConflict: "id" });
      return NextResponse.json({ paper });
    }
    if (route === "library") {
      const user = await currentUser(request, client);
      if (!user) return NextResponse.json({ error: "Sign in to view your library." }, { status: 401 });
      const saved = await client.from("users_saved_papers").select("paper_id, tags, note, saved_at, papers(*)").eq("user_id", user.id).order("saved_at", { ascending: false });
      if (saved.error) throw saved.error;
      return NextResponse.json({ saved: saved.data || [] });
    }
    return NextResponse.json({ error: "Route not found." }, { status: 404 });
  } catch (error) {
    console.error("ScholarLens GET error", error instanceof Error ? error.message : "unknown");
    return NextResponse.json({ error: "Something went wrong while loading research." }, { status: 500 });
  }
}

export async function POST(request, context) {
  try {
    const { path = [] } = await context.params;
    const route = path[0];
    const body = await request.json();
    const client = databaseClient(request);
    if (route === "explain") {
      const text = typeof body?.text === "string" ? body.text.trim() : "";
      const mode = ["explain", "define", "summarize"].includes(body?.mode) ? body.mode : "explain";
      if (text.length < 2 || text.length > 12000) return NextResponse.json({ error: "Select a passage between 2 and 12,000 characters." }, { status: 400 });
      if (!process.env.GEMINI_API_KEY) return NextResponse.json({ error: "Gemini is not configured yet." }, { status: 503 });
      const textHash = createHash("sha256").update(text, "utf8").digest("hex");
      if (localExplanationCache.has(textHash)) return NextResponse.json({ explanation: localExplanationCache.get(textHash), cached: true });
      try {
        const cached = await withTimeout(client.from("explanations_cache").select("explanation, selected_text").eq("text_hash", textHash).maybeSingle());
        if (cached?.data?.explanation) {
          localExplanationCache.set(textHash, cached.data.explanation);
          return NextResponse.json({ explanation: cached.data.explanation, cached: true });
        }
      } catch (cacheError) {
        console.warn("ScholarLens explanation cache read skipped", cacheError instanceof Error ? cacheError.message : "unknown");
      }
      const instructions = { explain: "Explain the passage in plain language, preserving nuance and stating the central claim.", define: "Define the important jargon and technical terms in the passage, then briefly explain the overall meaning.", summarize: "Summarize the passage in 3 to 5 concise bullets for a researcher who is scanning the section." }[mode];
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const generated = await ai.models.generateContent({ model: geminiModel, contents: `${instructions}\n\nGround every statement in the supplied text. Do not invent context.\n\nSelected passage:\n${text}` });
      const explanation = generated?.text?.trim();
      if (!explanation) throw new Error("Gemini returned no explanation");
      localExplanationCache.set(textHash, explanation);
      try {
        await withTimeout(client.from("explanations_cache").upsert({ text_hash: textHash, selected_text: text, explanation, created_at: new Date().toISOString() }, { onConflict: "text_hash" }));
      } catch (cacheError) {
        console.warn("ScholarLens explanation cache write skipped", cacheError instanceof Error ? cacheError.message : "unknown");
      }
      return NextResponse.json({ explanation, cached: false });
    }
    if (route === "library") {
      const user = await currentUser(request, client);
      if (!user) return NextResponse.json({ error: "Sign in to save papers." }, { status: 401 });
      const paper = body?.paper;
      if (!paper?.id || !paper?.title) return NextResponse.json({ error: "A complete paper is required." }, { status: 400 });
      const upsert = await client.from("papers").upsert({ ...paper, id: paper.id, openalex_id: paper.openalex_id || paper.id }, { onConflict: "id" });
      if (upsert.error) throw upsert.error;
      const saved = await client.from("users_saved_papers").upsert({ user_id: user.id, paper_id: paper.id, tags: body.tags || [], note: body.note || "" }, { onConflict: "user_id,paper_id" });
      if (saved.error) throw saved.error;
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ error: "Route not found." }, { status: 404 });
  } catch (error) {
    console.error("ScholarLens POST error", error instanceof Error ? error.message : "unknown");
    return NextResponse.json({ error: "This action could not be completed." }, { status: 500 });
  }
}

export async function DELETE(request, context) {
  try {
    const { path = [] } = await context.params;
    if (path[0] !== "library") return NextResponse.json({ error: "Route not found." }, { status: 404 });
    const client = databaseClient(request);
    const user = await currentUser(request, client);
    if (!user) return NextResponse.json({ error: "Sign in to manage your library." }, { status: 401 });
    const paperId = request.nextUrl.searchParams.get("id");
    if (!paperId) return NextResponse.json({ error: "A paper id is required." }, { status: 400 });
    const result = await client.from("users_saved_papers").delete().eq("user_id", user.id).eq("paper_id", paperId);
    if (result.error) throw result.error;
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("ScholarLens DELETE error", error instanceof Error ? error.message : "unknown");
    return NextResponse.json({ error: "This paper could not be removed." }, { status: 500 });
  }
}