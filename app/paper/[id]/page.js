import { notFound } from "next/navigation";
import ReaderPanel from "./reader-panel";

export const revalidate = 3600;

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

  const description = paper.abstract
    ? truncate(paper.abstract, 180)
    : `A ${paper.year || ""} paper${
        paper.venue && paper.venue !== "Unpublished venue"
          ? ` published in ${paper.venue}`
          : ""
      }${authorsShort ? ` by ${authorsShort}` : ""}.`;

  const canonical = `/paper/${encodeURIComponent(paper.id)}`;

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
    url: paper.oa_url || paper.oa_pdf_url || undefined,
    isAccessibleForFree: Boolean(
      paper.is_open_access ?? paper.oa_pdf_url
    ),
    citationCount: paper.citation_count || 0,
    inLanguage: "en",
    keywords: (paper.title || "")
      .split(/\s+/)
      .filter((word) => word.length > 3)
      .slice(0, 8)
      .join(", "),
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
    </>
  );
}
