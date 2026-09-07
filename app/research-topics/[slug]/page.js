import Link from "next/link";
import { ArrowLeft, ArrowUpRight, BookOpen, Search } from "lucide-react";
import { notFound } from "next/navigation";
import RelatedPapers from "./related-papers";
import { researchTopics, topicBySlug } from "@/lib/research-topics";

export const revalidate = 3600;

export function generateStaticParams() {
  return researchTopics.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const topic = topicBySlug[slug];
  if (!topic) return { title: "Research topic not found", robots: { index: false, follow: false } };
  const title = `${topic.name}: concepts, questions, and papers`;
  const description = `${topic.shortDescription} Explore key concepts, current research questions, applications, and relevant papers on ScholarLens.`;
  return { title, description, keywords: [topic.name, "research", "academic papers", "ScholarLens"], alternates: { canonical: `/research-topics/${topic.slug}` }, openGraph: { type: "article", title: `${title} | ScholarLens`, description, url: `/research-topics/${topic.slug}`, siteName: "ScholarLens" } };
}

function ListSection({ title, items }) {
  return <section><h2 className="text-2xl font-semibold tracking-[-0.03em]">{title}</h2><ul className="mt-5 grid gap-3 sm:grid-cols-2">{items.map((item) => <li key={item} className="rounded-md border border-border bg-card px-4 py-3 text-sm leading-6 text-foreground/80">{item}</li>)}</ul></section>;
}

export default async function ResearchTopicPage({ params }) {
  const { slug } = await params;
  const topic = topicBySlug[slug];
  if (!topic) notFound();
  const relatedTopics = topic.related.map((name) => researchTopics.find((item) => item.name === name)).filter(Boolean);

  return <main className="min-h-screen bg-background"><header className="border-b border-border/70 bg-background/95"><div className="container flex min-h-16 items-center justify-between gap-4"><Link href="/" className="flex items-center gap-2 text-lg font-semibold tracking-[-0.03em]"><span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground"><BookOpen className="h-4 w-4" /></span>ScholarLens</Link><nav className="flex items-center gap-5 text-sm text-muted-foreground"><Link href="/">Search</Link><Link className="font-medium text-foreground" href="/research-topics">Research Topics</Link><Link href="/library">Library</Link></nav></div></header>
    <section className="border-b border-border/60 bg-[#f8f8f6]"><div className="container max-w-5xl py-12 lg:py-16"><Link href="/research-topics" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"><ArrowLeft className="h-4 w-4" /> All research topics</Link><p className="mt-10 text-sm font-medium text-muted-foreground">Research topic</p><h1 className="mt-3 max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.05em] sm:text-6xl">{topic.name}</h1><p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">{topic.shortDescription}</p></div></section>
    <div className="container grid max-w-5xl gap-12 py-12 lg:grid-cols-[minmax(0,1fr)_280px]"><article className="space-y-12"><section><h2 className="text-2xl font-semibold tracking-[-0.03em]">Overview</h2><p className="mt-5 text-[17px] leading-8 text-foreground/80">{topic.overview}</p></section><section><h2 className="text-2xl font-semibold tracking-[-0.03em]">What it is</h2><p className="mt-5 text-[17px] leading-8 text-foreground/80">{topic.whatItIs}</p></section><section><h2 className="text-2xl font-semibold tracking-[-0.03em]">How it works</h2><p className="mt-5 text-[17px] leading-8 text-foreground/80">{topic.howItWorks}</p></section><ListSection title="Key concepts" items={topic.keyConcepts} /><ListSection title="Current research questions" items={topic.researchQuestions} /><ListSection title="Applications" items={topic.applications} /><section><h2 className="text-2xl font-semibold tracking-[-0.03em]">Relevant research papers</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">A live selection from the ScholarLens research index. Open any result to read its full paper page and use the Reading Assistant where available.</p><div className="mt-5"><RelatedPapers query={topic.searchQuery} /></div></section><section className="rounded-lg border border-border bg-card p-6"><h2 className="text-xl font-semibold">Keep exploring</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">Search the literature with your own question, or open a paper and read it closely with ScholarLens.</p><div className="mt-5 flex flex-wrap gap-3"><Link href="/" className="inline-flex h-10 items-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground"><Search className="h-4 w-4" /> Open paper search</Link><Link href="/" className="inline-flex h-10 items-center gap-2 rounded-md border border-border px-4 text-sm font-medium hover:bg-muted">Explore papers <ArrowUpRight className="h-4 w-4" /></Link></div></section></article><aside className="lg:pt-2"><div className="sticky top-6 rounded-lg border border-border bg-card p-5"><p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">Related topics</p><div className="mt-4 space-y-3">{relatedTopics.map((related) => <Link key={related.slug} href={`/research-topics/${related.slug}`} className="block text-sm font-medium hover:text-primary">{related.name}</Link>)}</div><Link href="/research-topics" className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary">View all topics <ArrowUpRight className="h-3.5 w-3.5" /></Link></div></aside></div>
  </main>;
}
