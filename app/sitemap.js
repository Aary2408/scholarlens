import { researchTopics } from "@/lib/research-topics";

export default function sitemap() {
  const base =
    process.env.NEXT_PUBLIC_BASE_URL ||
    "https://scholarlens-iota.vercel.app";

  const now = new Date();

  const topicEntries = researchTopics.map((topic) => ({
    url: `${base}/research-topics/${topic.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [
    {
      url: `${base}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${base}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${base}/research-topics`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...topicEntries,
  ];
}