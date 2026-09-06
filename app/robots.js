export default function robots() {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "https://scholarlens.app";
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/", "/library"] },
      { userAgent: "Googlebot", allow: "/", disallow: ["/api/"] },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
