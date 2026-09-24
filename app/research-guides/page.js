import { GuideIndex } from "./guide-content";

export const metadata = {
  title: "Research Guides",
  description: "Practical guides for finding research papers, conducting literature reviews, and identifying research gaps.",
  alternates: { canonical: "/research-guides" },
  openGraph: {
    type: "website",
    title: "Research Guides | ScholarLens",
    description: "Practical guides for finding research papers, conducting literature reviews, and identifying research gaps.",
    url: "/research-guides",
  },
};

export default function ResearchGuidesPage() {
  return <GuideIndex />;
}