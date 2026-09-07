export default function sitemap() {
  const base =
    process.env.NEXT_PUBLIC_BASE_URL ||
    "https://scholarlens-iota.vercel.app";

  const now = new Date();

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
  ];
}