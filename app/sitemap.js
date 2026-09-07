import { researchTopics } from "@/lib/research-topics";

const SITE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ||
  "https://scholarlens-iota.vercel.app";

export const revalidate = 3600;

async function paperEntries(now) {
  try {
    const response = await fetch(
      "https://api.openalex.org/works?sort=publication_year:desc&per-page=100",
      { next: { revalidate: 3600 } }
    );
    if (!response.ok) return [];

    const payload = await response.json();
    return (payload?.results || [])
      .map((work) => work?.id)
      .filter(Boolean)
      .map((id) => ({
        url: `${SITE_URL}/paper/${encodeURIComponent(id)}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.6,
      }));
  } catch (error) {
    console.error("Paper sitemap generation failed:", error);
    return [];
  }
}

export default async function sitemap() {
  const now = new Date();

  const topicEntries = researchTopics.map((topic) => ({
    url: `${SITE_URL}/research-topics/${topic.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/research-topics`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...topicEntries,
    ...(await paperEntries(now)),
  ];
}