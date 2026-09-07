import Link from "next/link";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { researchTopics } from "@/lib/research-topics";

export const metadata = {
  title: "Research Topics",
  description: "Explore clear, original guides to major research areas and find relevant papers with ScholarLens.",
  alternates: { canonical: "/research-topics" },
  openGraph: {
    type: "website",
    title: "Research Topics | ScholarLens",
    description: "Explore major research areas and discover relevant academic papers with ScholarLens.",
    url: "/research-topics",
  },
};

export default function ResearchTopicsPage() {
  return <main className="min-h-screen bg-background">
    <header className="border-b border-border/70 bg-background/95"><div className="container flex min-h-16 items-center justify-between gap-4"><Link href="/" className="flex items-center gap-2 text-lg font-semibold tracking-[-0.03em]"><span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground"><BookOpen className="h-4 w-4" /></span>ScholarLens</Link><nav className="flex items-center gap-5 text-sm text-muted-foreground"><Link href="/">Search</Link><Link className="font-medium text-foreground" href="/research-topics">Research Topics</Link><Link href="/library">Library</Link></nav></div></header>
    <section className="border-b border-border/60 bg-[#f8f8f6]"><div className="container max-w-4xl py-16 lg:py-20"><p className="text-sm font-medium text-muted-foreground">ScholarLens guides</p><h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-tight tracking-[-0.05em] sm:text-6xl">Start with the shape of a field.</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">Build useful context before you dive into the literature. These concise guides explain the ideas, open questions, and applications behind major research areas.</p></div></section>
    <section className="container py-12"><div className="grid gap-4 md:grid-cols-2">{researchTopics.map((topic, index) => <Link key={topic.slug} href={`/research-topics/${topic.slug}`} className="group rounded-lg border border-border bg-card p-6 transition-shadow hover:shadow-md"><div className="flex items-start justify-between gap-4"><span className="text-sm font-semibold text-muted-foreground">{String(index + 1).padStart(2, "0")}</span><ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></div><h2 className="mt-8 text-xl font-semibold tracking-[-0.02em] group-hover:text-primary">{topic.name}</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">{topic.shortDescription}</p><span className="mt-5 inline-block text-sm font-medium text-primary">Read guide</span></Link>)}</div></section>
  </main>;
}
