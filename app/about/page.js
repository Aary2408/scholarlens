import Link from "next/link";

export const metadata = {
  title: "About ScholarLens",
  description: "Learn how ScholarLens helps people discover and read academic research.",
  alternates: { canonical: "/about" },
  openGraph: { type: "website", title: "About ScholarLens | ScholarLens", description: "Learn how ScholarLens helps people discover and read academic research.", url: "/about" },
  twitter: { card: "summary", title: "About ScholarLens | ScholarLens", description: "Learn how ScholarLens helps people discover and read academic research." },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="border-b border-border/60 bg-[#f8f8f6]"><div className="container max-w-4xl py-16 lg:py-20"><p className="text-sm font-medium text-muted-foreground">About ScholarLens</p><h1 className="mt-3 text-4xl font-semibold leading-tight tracking-[-0.05em] sm:text-6xl">A clearer way into the research.</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">ScholarLens is an independent research and discovery platform for finding academic papers and reading them with useful context.</p></div></section>
      <article className="container max-w-3xl space-y-10 py-12 text-[17px] leading-8 text-foreground/80">
        <section><h2 className="text-2xl font-semibold tracking-[-0.03em] text-foreground">What ScholarLens does</h2><p className="mt-4">Research literature is valuable, but finding a relevant paper and understanding its vocabulary can take time. ScholarLens brings search, paper metadata, research topics, and a passage-level reading assistant into one public interface.</p></section>
        <section><h2 className="text-2xl font-semibold tracking-[-0.03em] text-foreground">How paper search works</h2><p className="mt-4">Search results and paper pages are built from scholarly metadata. You can search by a question or topic, review titles, authors, publication details, abstracts, access information, concepts, and related works, then follow the available original or full-text source.</p></section>
        <section><h2 className="text-2xl font-semibold tracking-[-0.03em] text-foreground">OpenAlex as a metadata source</h2><p className="mt-4">ScholarLens uses OpenAlex, an open scholarly index, to retrieve bibliographic information such as titles, authors, venues, publication years, abstracts when available, concepts, access links, citation counts, and related works. Availability and accuracy can vary by record, so paper pages link back to available source information rather than treating the index as the paper itself.</p></section>
        <section><h2 className="text-2xl font-semibold tracking-[-0.03em] text-foreground">Reading selected passages</h2><p className="mt-4">On eligible paper pages, the AI reading assistant can explain a passage selected by the user, define terminology, or summarize the selected text. Its responses are generated explanations, not authoritative interpretations, and may contain errors. Users should check the original paper and cited sources.</p></section>
        <section><h2 className="text-2xl font-semibold tracking-[-0.03em] text-foreground">Who it is for</h2><p className="mt-4">ScholarLens is intended for students, researchers, educators, professionals, and curious readers who want a practical starting point for exploring academic literature. It is an independent research and discovery platform, not a university, publisher, journal, or substitute for expert review.</p></section>
        <p className="border-l-2 border-primary pl-5 text-base leading-7">Questions about the platform or its data can be sent through the <Link href="/contact" className="font-medium text-primary hover:underline">Contact page</Link>.</p>
      </article>
    </main>
  );
}