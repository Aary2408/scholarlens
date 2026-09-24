import { notFound } from "next/navigation";
import { guideBySlug, researchGuides } from "@/lib/research-guides";
import { GuidePage } from "../guide-content";

export const revalidate = 3600;

export function generateStaticParams() {
  return researchGuides.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const guide = guideBySlug[slug];
  if (!guide) return { title: "Research guide not found", robots: { index: false, follow: false } };
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: `/research-guides/${guide.slug}` },
    openGraph: { type: "article", title: `${guide.title} | ScholarLens`, description: guide.description, url: `/research-guides/${guide.slug}`, siteName: "ScholarLens" },
  };
}

export default async function ResearchGuidePage({ params }) {
  const { slug } = await params;
  const guide = guideBySlug[slug];
  if (!guide) notFound();
  return <GuidePage guide={guide} />;
}