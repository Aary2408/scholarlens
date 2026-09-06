"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, BookOpen, Bookmark, ChevronRight, Loader2, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { AdSlot } from "@/components/AdSlot";
import { createClient } from "@/lib/supabase-browser";
import { track } from "@/lib/analytics";

function AuthPanel({ session, onSession }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const supabase = createClient();
  async function sendLink(event) {
    event.preventDefault(); setBusy(true);
    const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: `${window.location.origin}/auth/callback` } });
    setMessage(error ? error.message : "Check your inbox for your magic link."); setBusy(false);
  }
  if (session) return <div className="flex items-center gap-3 text-sm"><span className="hidden max-w-[180px] truncate text-muted-foreground sm:inline">{session.user?.email}</span><Button variant="outline" size="sm" onClick={async () => { await supabase.auth.signOut(); onSession(null); }}>Sign out</Button></div>;
  return <form onSubmit={sendLink} className="flex flex-wrap items-center justify-end gap-2"><Input aria-label="Email for magic link" className="h-9 w-44 bg-white" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@university.edu" /><Button size="sm" type="submit" disabled={busy}>{busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}Sign in</Button>{message ? <span className="basis-full text-right text-xs text-muted-foreground">{message}</span> : null}</form>;
}

function PaperCard({ paper, onSave, saved }) {
  const isOa = paper.is_open_access ?? Boolean(paper.oa_pdf_url);
  return <Card className="group border-border/80 bg-card transition-shadow hover:shadow-md"><CardContent className="p-6"><div className="mb-4 flex items-start justify-between gap-4"><div className="flex flex-wrap items-center gap-2 text-xs font-medium text-muted-foreground"><span>{paper.year || "Year unknown"}</span><span className="text-border">•</span><span>{paper.venue}</span>{isOa ? <span className="rounded-full bg-emerald-50 px-2 py-1 text-emerald-700">Open access</span> : <span className="rounded-full bg-amber-50 px-2 py-1 text-amber-800">Requires access</span>}</div><button aria-label={saved ? "Saved paper" : "Save paper"} onClick={() => onSave(paper)} className={`rounded-full border p-2 transition-colors ${saved ? "border-amber-200 bg-amber-50 text-amber-700" : "border-border text-muted-foreground hover:bg-muted"}`}><Bookmark className="h-4 w-4" fill={saved ? "currentColor" : "none"} /></button></div><Link href={`/paper/${encodeURIComponent(paper.id)}`} className="block"><h2 className="max-w-3xl text-xl font-semibold leading-snug tracking-[-0.02em] text-foreground group-hover:text-primary">{paper.title}</h2></Link><p className="mt-3 text-sm text-muted-foreground">{(paper.authors || []).slice(0, 5).join(", ") || "Author information unavailable"}{paper.authors?.length > 5 ? " et al." : ""}</p><p className="mt-4 line-clamp-3 text-[15px] leading-7 text-foreground/75">{paper.abstract || "No abstract is available for this record. Open the paper to inspect the available metadata and access link."}</p><div className="mt-5 flex items-center justify-between border-t border-border/70 pt-4 text-xs text-muted-foreground"><span>{(paper.citation_count || 0).toLocaleString()} citations</span><Link href={`/paper/${encodeURIComponent(paper.id)}`} className="inline-flex items-center gap-1 font-medium text-primary">Read paper <ArrowUpRight className="h-3.5 w-3.5" /></Link></div></CardContent></Card>;
}

export default function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const [busy, setBusy] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");
  const [session, setSession] = useState(null);
  const [savedIds, setSavedIds] = useState([]);
  const [notice, setNotice] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [activeQuery, setActiveQuery] = useState("");
  const [sort, setSort] = useState("relevance");
  const [access, setAccess] = useState("all");
  const PER_PAGE = 25;
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data?.session || null));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => setSession(nextSession));
    return () => listener?.subscription?.unsubscribe();
  }, [supabase]);

  async function fetchPage({ q, nextPage, nextSort, nextAccess }) {
    const params = new URLSearchParams({ q, page: String(nextPage), per_page: String(PER_PAGE), sort: nextSort, access: nextAccess });
    const response = await fetch(`/api/search?${params.toString()}`);
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.error || "Search unavailable");
    return payload;
  }

  async function runSearch(event) {
    event?.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    setBusy(true); setError(""); setSearched(true); setNotice(""); setPage(1); setActiveQuery(trimmed);
    try {
      const payload = await fetchPage({ q: trimmed, nextPage: 1, nextSort: sort, nextAccess: access });
      setResults(payload.results || []); setTotal(payload.total || 0);
      track("search", { search_term: trimmed, sort, access, match_mode: payload.match_mode, result_count: (payload.results || []).length, total_results: payload.total || 0 });
    } catch (searchError) {
      setError(searchError.message || "Search unavailable"); setResults([]); setTotal(0);
    } finally { setBusy(false); }
  }

  async function applyControls(nextSort, nextAccess) {
    setSort(nextSort); setAccess(nextAccess);
    if (!activeQuery) return;
    setBusy(true); setError(""); setPage(1);
    try {
      const payload = await fetchPage({ q: activeQuery, nextPage: 1, nextSort, nextAccess });
      setResults(payload.results || []); setTotal(payload.total || 0);
      track("search_refine", { search_term: activeQuery, sort: nextSort, access: nextAccess });
    } catch (controlError) { setError(controlError.message || "Search unavailable"); }
    finally { setBusy(false); }
  }

  async function loadMore() {
    if (loadingMore || busy) return;
    const nextPage = page + 1;
    setLoadingMore(true);
    try {
      const payload = await fetchPage({ q: activeQuery, nextPage, nextSort: sort, nextAccess: access });
      setResults((prev) => { const seen = new Set(prev.map((p) => p.id)); return [...prev, ...(payload.results || []).filter((p) => !seen.has(p.id))]; });
      setPage(nextPage);
    } catch (moreError) { setError(moreError.message || "Could not load more."); }
    finally { setLoadingMore(false); }
  }

  async function savePaper(paper) {
    if (!session) { setNotice("Sign in above to save papers to your library."); return; }
    const response = await fetch("/api/library", { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${session.access_token}` }, body: JSON.stringify({ paper }) });
    const payload = await response.json();
    if (!response.ok) { setNotice(payload.error || "Could not save paper."); return; }
    setSavedIds((ids) => [...new Set([...ids, paper.id])]);
    setNotice("Saved to your library.");
  }

  const hasMore = searched && results.length > 0 && results.length < total;
  const SortButton = ({ value, label }) => <button data-testid={`sort-${value}`} onClick={() => applyControls(value, access)} className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${sort === value ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-muted-foreground hover:border-primary/60 hover:text-foreground"}`}>{label}</button>;
  const AccessButton = ({ value, label }) => <button data-testid={`access-${value}`} onClick={() => applyControls(sort, value)} className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${access === value ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-muted-foreground hover:border-primary/60 hover:text-foreground"}`}>{label}</button>;

  return <main className="min-h-screen bg-background">
    <header className="border-b border-border/70 bg-background/95"><div className="container flex min-h-16 flex-wrap items-center justify-between gap-4 py-3"><Link href="/" className="flex items-center gap-2 text-lg font-semibold tracking-[-0.03em]"><span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground"><BookOpen className="h-4 w-4" /></span>ScholarLens</Link><nav className="order-3 flex w-full items-center gap-5 text-sm text-muted-foreground sm:order-2 sm:w-auto"><Link className="font-medium text-foreground" href="/">Search</Link><Link className="hover:text-foreground" href="/library">Library</Link></nav><div className="order-2 sm:order-3"><AuthPanel session={session} onSession={setSession} /></div></div></header>
    <section className="border-b border-border/60 bg-[#f8f8f6]"><div className="container grid gap-10 py-16 lg:grid-cols-[minmax(0,1fr)_300px] lg:py-24"><div className="max-w-3xl"><div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground"><Sparkles className="h-3.5 w-3.5 text-amber-600" />Research, not instant answers</div><h1 className="max-w-2xl text-4xl font-semibold leading-[1.08] tracking-[-0.055em] text-foreground sm:text-6xl">Find the thinking behind the topic.</h1><p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">Search real academic literature, read at your own pace, and ask focused questions about the passages that matter.</p><form onSubmit={runSearch} className="mt-9 flex max-w-2xl gap-2 rounded-lg border border-border bg-background p-2 shadow-sm"><Search className="ml-3 mt-3 h-5 w-5 shrink-0 text-muted-foreground" /><Input className="h-11 border-0 bg-transparent text-base shadow-none focus-visible:ring-0" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try “climate adaptation in coastal cities”" aria-label="Research topic" /><Button className="h-11 px-5" disabled={busy}>{busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}Search</Button></form><div className="mt-4 flex flex-wrap gap-2 text-xs text-muted-foreground"><span>Suggested:</span>{["transformer interpretability", "urban heat islands", "sleep and memory"].map((suggestion) => <button key={suggestion} onClick={() => setQuery(suggestion)} className="rounded-full border border-border bg-background px-3 py-1.5 hover:border-primary hover:text-primary">{suggestion}</button>)}</div></div><div className="hidden self-end lg:block"><div className="border-l border-border pl-6"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">A better starting point</p><p className="mt-4 text-sm leading-7 text-foreground/75">Begin with a question, not a keyword. ScholarLens ranks live OpenAlex results so you can trace ideas back to the original work.</p><div className="mt-6 flex items-center gap-2 text-sm font-medium"><span className="h-2 w-2 rounded-full bg-emerald-500" /> Live scholarly index</div></div></div></div></section>
    <section className="container grid gap-8 py-12 lg:grid-cols-[minmax(0,1fr)_260px]"><div>
      <div className="mb-7 flex items-end justify-between gap-4"><div><p className="text-sm font-medium text-muted-foreground">{searched ? `Results for “${activeQuery}”` : "Your research desk"}</p><h2 className="mt-1 text-2xl font-semibold tracking-[-0.03em]">{searched ? (total > 0 ? `Showing ${results.length} of ${total.toLocaleString()} papers` : `${results.length} papers found`) : "Start with a research question"}</h2></div>{searched ? <button onClick={() => { setSearched(false); setResults([]); setTotal(0); setPage(1); setActiveQuery(""); }} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">Clear <ChevronRight className="h-4 w-4" /></button> : null}</div>
      {searched ? <div className="mb-6 flex flex-wrap items-center gap-3 rounded-lg border border-border bg-card px-4 py-3"><span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Sort</span><SortButton value="relevance" label="Relevance" /><SortButton value="year" label="Newest" /><SortButton value="citations" label="Most cited" /><span className="mx-2 hidden h-4 w-px bg-border sm:inline-block" /><span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Access</span><AccessButton value="all" label="All" /><AccessButton value="oa" label="Open access" /><AccessButton value="closed" label="Requires access" /></div> : null}
      {notice ? <div className="mb-5 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">{notice}</div> : null}
      {error ? <div className="mb-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</div> : null}
      {busy ? <div className="flex items-center gap-3 rounded-lg border border-dashed border-border p-8 text-sm text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" /> Reading the scholarly index…</div> : null}
      {!busy && searched && results.length === 0 && !error ? <div className="rounded-lg border border-dashed border-border p-10 text-center text-muted-foreground">No papers matched that question. Try a broader phrase{access !== "all" ? " or switch Access to All" : ""}.</div> : null}
      <div className="space-y-4">{results.map((paper) => <PaperCard key={paper.id} paper={paper} onSave={savePaper} saved={savedIds.includes(paper.id)} />)}</div>
      {hasMore ? <div className="mt-8 flex justify-center"><Button variant="outline" onClick={loadMore} disabled={loadingMore}>{loadingMore ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading more papers…</> : "Load more papers"}</Button></div> : null}
      {!searched ? <div className="grid gap-4 md:grid-cols-3"><div className="rounded-lg border border-border bg-card p-5"><p className="text-2xl font-semibold">01</p><p className="mt-8 font-medium">Search broadly</p><p className="mt-2 text-sm leading-6 text-muted-foreground">Use natural language to find papers across disciplines.</p></div><div className="rounded-lg border border-border bg-card p-5"><p className="text-2xl font-semibold">02</p><p className="mt-8 font-medium">Read closely</p><p className="mt-2 text-sm leading-6 text-muted-foreground">Highlight a passage when the argument gets dense.</p></div><div className="rounded-lg border border-border bg-card p-5"><p className="text-2xl font-semibold">03</p><p className="mt-8 font-medium">Keep the thread</p><p className="mt-2 text-sm leading-6 text-muted-foreground">Save useful papers and return to them in your library.</p></div></div> : null}
    </div><aside><AdSlot slot="search-sidebar" /></aside></section>
  </main>;
}
