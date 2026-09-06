import { notFound } from "next/navigation";
import ReaderPanel from "./reader-panel";

// Cache paper pages for one hour so Google can crawl them efficiently and repeat visits are fast.
export const revalidate = 3600;

async function loadPaper(id) {
  const base =
    process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const response = await fetch(
    `${base}/api/paper?id=${encodeURIComponent(id)}`,
    { next: { revalidate: 3600 } }
  );

  if (!response.ok) return null;

  const payload = await response.json();
  return payload.paper || null;
}

function truncate(text, length) {
  if (!text) return "";
  const clean = String(text).replace(/\s+/g, " ").trim();
  return clean.length > length ? clean.slice(0, length - 1).trimEnd() + "…" : clean;
}

export async function generateMetadata({ params }) {
  const resolved = await params;
  const paper = await loadPaper(resolved.id);
  if (!paper) return { title: "Paper not found", robots: { index: false, follow: false } };
  const authorsShort = (paper.authors || []).slice(0, 3).join(", ");
  const description = paper.abstract
    ? truncate(paper.abstract, 180)
    : `A ${paper.year || ""} paper${paper.venue && paper.venue !== "Unpublished venue" ? ` published in ${paper.venue}` : ""}${authorsShort ? ` by ${authorsShort}` : ""}.`;
  const canonical = `/paper/${encodeURIComponent(paper.id)}`;
  const keywords = [
    ...(paper.title || "").split(/\s+/).filter((word) => word.length > 3).slice(0, 6),
    paper.venue,
    ...(paper.authors || []).slice(0, 3),
    "research paper",
    "academic article",
  ].filter(Boolean);
  return {
    title: paper.title,
    description,
    keywords,
    authors: (paper.authors || []).map((name) => ({ name })),
    alternates: { canonical },
    openGraph: {
      type: "article",
      title: paper.title,
      description,
      url: canonical,
      publishedTime: paper.year ? `${paper.year}-01-01T00:00:00Z` : undefined,
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
    author: (paper.authors || []).map((name) => ({ "@type": "Person", name })),
    datePublished: paper.year ? String(paper.year) : undefined,
    publisher: paper.venue && paper.venue !== "Unpublished venue" ? { "@type": "Organization", name: paper.venue } : undefined,
    citation: paper.doi || undefined,
    identifier: paper.doi || paper.openalex_id || paper.id,
    url: paper.oa_url || paper.oa_pdf_url || undefined,
    isAccessibleForFree: Boolean(paper.is_open_access ?? paper.oa_pdf_url),
    citationCount: paper.citation_count || 0,
    inLanguage: "en",
    keywords: (paper.title || "").split(/\s+/).filter((word) => word.length > 3).slice(0, 8).join(", "),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ReaderPanel paper={paper} />
    </>
  );
}
