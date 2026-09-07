import { notFound } from "next/navigation";
import Link from "next/link";
import ReaderPanel from "./reader-panel";
import { researchTopics } from "@/lib/research-topics";

export const revalidate = 3600;

const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ||
  "https://scholarlens-iota.vercel.app";

function paperUrl(id) {
  return `${SITE_URL}/paper/${encodeURIComponent(id)}`;
}

async function loadPaper(id) {
  try {
    const decodedId = decodeURIComponent(id);
    const workId = decodedId.replace(/\/$/, "").split("/").pop();

    if (!workId) return null;

    const response = await fetch(
      `https://api.openalex.org/works/${encodeURIComponent(workId)}`,
      { next: { revalidate: 300 } }
    );

    if (!response.ok) return null;

    const work = await response.json();

    const primaryLocation = work?.primary_location || {};
    const source = primaryLocation?.source || {};

    const abstract = work?.abstract_inverted_index
      ? Object.entries(work.abstract_inverted_index)
          .flatMap(([word, positions]) =>
            Array.isArray(positions)
              ? positions.map((position) => [position, word])
              : []
          )
          .sort((a, b) => a[0] - b[0])
          .map((entry) => entry[1])
          .join(" ")
      : work?.abstract || "";

    const authors = (work?.authorships || [])
      .map((authorship) => authorship?.author?.display_name)
      .filter(Boolean);

    const topics = (work?.topics || [])
      .map((topic) => topic?.display_name)
      .filter(Boolean)
      .slice(0, 8);
    const concepts = (work?.concepts || [])
      .sort((a, b) => (b?.score || 0) - (a?.score || 0))
      .map((concept) => concept?.display_name)
      .filter(Boolean)
      .slice(0, 8);

    const isOpenAccess = Boolean(work?.open_access?.is_oa);

    return {
      id: work?.id || work?.openalex_id || decodedId,
      openalex_id: work?.id || work?.openalex_id || decodedId,
      title: work?.display_name || work?.title || "Untitled research work",
      abstract,
      authors,
      venue: source?.display_name || "Unpublished venue",
      year: work?.publication_year || null,
      citation_count: work?.cited_by_count || 0,
      oa_pdf_url:
        primaryLocation?.pdf_url ||
        work?.best_oa_location?.pdf_url ||
        null,
      oa_url:
        work?.open_access?.oa_url ||
        primaryLocation?.landing_page_url ||
        null,
      is_open_access: isOpenAccess,
      oa_status:
        work?.open_access?.oa_status ||
        (isOpenAccess ? "green" : "closed"),
      landing_page_url: primaryLocation?.landing_page_url || null,
      doi: work?.doi || null,
      topics,
      concepts,
      related_work_ids: (work?.related_works || []).filter(Boolean).slice(0, 3),
    };
  } catch (error) {
    console.error("Paper page load failed:", error);
    return null;
  }
}

function truncate(text, length) {
  if (!text) return "";
  const clean = String(text).replace(/\s+/g, " ").trim();
  return clean.length > length
    ? clean.slice(0, length - 1).trimEnd() + "…"
    : clean;
}

export async function generateMetadata({ params }) {
  const resolved = await params;
  const paper = await loadPaper(resolved.id);

  if (!paper) {
    return {
      title: "Paper not found",
      robots: { index: false, follow: false },
    };
  }

  const authorsShort = (paper.authors || []).slice(0, 3).join(", ");

  const description = `Explore ${paper.title}, a research paper${
    paper.year ? ` from ${paper.year}` : ""
  }${
        paper.venue && paper.venue !== "Unpublished venue"
          ? ` published in ${paper.venue}`
          : ""
      }${authorsShort ? ` by ${authorsShort}` : ""}. ${
    paper.abstract ? truncate(paper.abstract, 110) : "Read the available paper details and research context on ScholarLens."
  }`;

  const canonical = paperUrl(paper.id);

  const keywords = [
    ...(paper.title || "")
      .split(/\s+/)
      .filter((word) => word.length > 3)
      .slice(0, 6),
    paper.venue,
    ...(paper.authors || []).slice(0, 3),
    "research paper",
    "academic article",
  ].filter(Boolean);

  return {
    title: `${paper.title} — Research Paper`,
    description,
    keywords,
    authors: (paper.authors || []).map((name) => ({ name })),
    alternates: { canonical },
    openGraph: {
      type: "article",
      title: `${paper.title} — Research Paper | ScholarLens`,
      description,
      url: canonical,
      publishedTime: paper.year
        ? `${paper.year}-01-01T00:00:00Z`
        : undefined,
      authors: paper.authors || [],
      siteName: "ScholarLens",
    },
    twitter: {
      card: "summary_large_image",
      title: truncate(paper.title, 70),
      description,
    },
  };
}

function topicLinks(paper) {
  const names = [...(paper.topics || []), ...(paper.concepts || [])];
  return names
    .map((name) => researchTopics.find((topic) => topic.name.toLowerCase() === name.toLowerCase()))
    .filter((topic, index, matches) => topic && matches.findIndex((item) => item.slug === topic.slug) === index)
    .slice(0, 4);
}

function PaperSeoContent({ paper }) {
  const topics = topicLinks(paper);
  const relatedWorks = (paper.related_work_ids || []).filter((id) => id !== paper.id);

  return (
    <section className="container max-w-5xl border-t border-border/60 py-10">
      <h2 className="text-2xl font-semibold tracking-[-0.03em]">About this research paper</h2>
      {paper.abstract ? <p className="mt-4 max-w-4xl text-base leading-8 text-foreground/80">{paper.abstract}</p> : null}
      {topics.length ? (
        <div className="mt-7">
          <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">Research topics</h3>
          <div className="mt-3 flex flex-wrap gap-3">
            {topics.map((topic) => <Link key={topic.slug} href={`/research-topics/${topic.slug}`} className="text-sm font-medium text-primary hover:underline">{topic.name}</Link>)}
          </div>
        </div>
      ) : null}
      {paper.concepts?.length ? <p className="mt-5 text-sm leading-6 text-muted-foreground"><span className="font-medium text-foreground">Key concepts:</span> {paper.concepts.join(", ")}</p> : null}
      {relatedWorks.length ? (
        <div className="mt-7">
          <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">Related papers</h3>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
            {relatedWorks.map((id, index) => <Link key={id} href={`/paper/${encodeURIComponent(id)}`} className="text-sm font-medium text-primary hover:underline">Related paper {index + 1}</Link>)}
          </div>
        </div>
      ) : null}
      <div className="mt-7 flex flex-wrap gap-5 text-sm font-medium">
        <Link href="/" className="text-primary hover:underline">Back to paper search</Link>
        <Link href="/research-topics" className="text-primary hover:underline">Browse research topics</Link>
      </div>
    </section>
  );
}

export default async function PaperPage({ params }) {
  const resolved = await params;
  const paper = await loadPaper(resolved.id);

  if (!paper) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: paper.title,
    name: paper.title,
    abstract: paper.abstract || undefined,
    author: (paper.authors || []).map((name) => ({
      "@type": "Person",
      name,
    })),
    datePublished: paper.year ? String(paper.year) : undefined,
    publisher:
      paper.venue && paper.venue !== "Unpublished venue"
        ? {
            "@type": "Organization",
            name: paper.venue,
          }
        : undefined,
    citation: paper.doi || undefined,
    identifier: paper.doi || paper.openalex_id || paper.id,
    description: paper.abstract ? truncate(paper.abstract, 300) : undefined,
    url: paperUrl(paper.id),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <ReaderPanel paper={paper} />
      <PaperSeoContent paper={paper} />
    </>
  );
}
