import Link from "next/link";
import { FileText } from "lucide-react";

const SITE_URL = "https://scholarlens-iota.vercel.app";

export const metadata = {
  title: "Research Services | ScholarLens",
  description: "Get curated academic literature, research themes, methodology comparisons, and research-gap analysis for your research topic.",
  alternates: { canonical: `${SITE_URL}/research-services` },
  openGraph: {
    type: "website",
    title: "Research Services | ScholarLens",
    description: "Get curated academic literature, research themes, methodology comparisons, and research-gap analysis for your research topic.",
    url: `${SITE_URL}/research-services`,
  },
  twitter: {
    card: "summary",
    title: "Research Services | ScholarLens",
    description: "Get curated academic literature, research themes, methodology comparisons, and research-gap analysis for your research topic.",
  },
};

const packages = [
  {
    name: "Starter",
    requestPackage: "starter",
    price: "₹199 / $5",
    description: "A focused starting point for a defined topic or early project idea.",
    items: [
      "5–7 relevant research papers",
      "Short relevance notes",
      "Important keywords",
    ],
    cta: "Request Starter",
  },
  {
    name: "Research Pack",
    requestPackage: "research-pack",
    price: "₹399 / $10",
    label: "Most Popular",
    description: "A structured overview for comparing a broader body of literature.",
    items: [
      "10–15 relevant research papers",
      "Literature comparison",
      "Major research themes",
      "Potential research gaps",
      "Suggested research directions",
    ],
    cta: "Request Research Pack",
  },
  {
    name: "Deep Dive",
    requestPackage: "deep-dive",
    price: "₹799 / $20",
    description: "A broader research landscape and planning document for a developed question.",
    items: [
      "20–25 relevant research papers",
      "Methodology comparison",
      "Research-gap analysis",
      "Research directions",
      "Relevant datasets/resources where applicable",
    ],
    cta: "Request Deep Dive",
  },
];

const audiences = [
  "Final-year project students",
  "Undergraduate researchers",
  "Master's students",
  "Early-stage researchers",
  "Project teams",
];

const deliverableSteps = [
  "Research question",
  "Relevant papers",
  "Research themes",
  "Method comparison",
  "Research gaps",
  "Potential research directions",
];

const faqs = [
  ["Do you write assignments or research papers?", "No. ScholarLens research services focus on finding, organizing, and understanding relevant literature. We do not write academic submissions on behalf of students."],
  ["How do I request a research pack?", "Choose a package and contact ScholarLens with your research topic or question."],
  ["How long does delivery take?", "Delivery time depends on the scope and will be confirmed before payment."],
  ["Can I request a specific topic?", "Yes. You can provide a specific research question, topic, project idea, or area of interest."],
  ["Will every paper be relevant?", "We aim to provide highly relevant literature, but academic databases and research metadata can contain limitations. The final pack should be reviewed by the customer before use."],
];

function SectionHeading({ eyebrow, title, children }) {
  return <div className="max-w-2xl"><p className="text-sm font-medium text-muted-foreground">{eyebrow}</p><h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">{title}</h2>{children ? <p className="mt-4 leading-7 text-muted-foreground">{children}</p> : null}</div>;
}

export default function ResearchServicesPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="border-b border-border/60 bg-[#f8f8f6]"><div className="container max-w-5xl py-16 lg:py-24"><p className="text-sm font-medium text-muted-foreground">Research support</p><h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-tight tracking-[-0.05em] sm:text-6xl">Start your research with the right literature.</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">Tell us your research topic or question. We will help you discover relevant academic literature, organize the research landscape, and identify useful directions for further investigation.</p><div className="mt-8 flex flex-wrap gap-3"><Link href="#pricing" className="inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground hover:opacity-90">Request a Research Pack</Link><Link href="/" className="inline-flex min-h-11 items-center justify-center rounded-md border border-border bg-background px-5 text-sm font-medium hover:bg-muted">Explore ScholarLens</Link></div></div></section>

      <section className="container max-w-5xl py-16"><SectionHeading eyebrow="How it works" title="A practical path from question to research plan." /><div className="mt-10 grid gap-8 md:grid-cols-3">{[["01", "Tell us your topic", "Share your research question, project idea, or topic."], ["02", "We research the literature", "We identify relevant academic papers, themes, methods, and research directions."], ["03", "Receive your research pack", "You receive a structured research document tailored to your topic."]].map(([number, title, text]) => <div key={number} className="border-t-2 border-primary pt-5"><p className="text-sm font-semibold text-muted-foreground">{number}</p><h3 className="mt-5 text-xl font-semibold">{title}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{text}</p></div>)}</div></section>

      <section id="pricing" className="border-y border-border/60 bg-muted/20"><div className="container max-w-6xl py-16"><SectionHeading eyebrow="Research packs" title="Choose the level of support that fits your question." /><div className="mt-8"><p className="text-sm font-semibold text-foreground">Student Launch Pricing</p><p className="mt-1 text-sm leading-6 text-muted-foreground">Introductory pricing while ScholarLens is growing.</p><p className="mt-4 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">India and international pricing shown together</p></div><div className="mt-6 grid gap-5 lg:grid-cols-3">{packages.map((item) => <article key={item.name} className={`relative flex flex-col rounded-lg border bg-card p-6 ${item.label ? "border-primary shadow-sm" : "border-border"}`}>{item.label ? <span className="absolute right-5 top-5 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">{item.label}</span> : null}<h3 className="pr-24 text-lg font-semibold">{item.name}</h3><p className="mt-5 text-3xl font-semibold tracking-[-0.04em]">{item.price}</p><p className="mt-3 min-h-14 text-sm leading-6 text-muted-foreground">{item.description}</p><ul className="mt-6 flex-1 space-y-3 border-t border-border pt-6 text-sm leading-6 text-foreground/80">{item.items.map((feature) => <li key={feature} className="flex gap-2"><span className="text-primary" aria-hidden="true">✓</span><span>{feature}</span></li>)}</ul><Link href={`/research-services/request?package=${item.requestPackage}`} className="mt-8 inline-flex min-h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:opacity-90">{item.cta}</Link></article>)}</div><p className="mt-8 text-center text-sm leading-6 text-muted-foreground">These services support research discovery and planning. They do not replace independent academic work, expert supervision, or institutional requirements.</p></div></section>

      <section className="container max-w-5xl py-16"><SectionHeading eyebrow="What you receive" title="A structured document you can use to plan your next step." /><div className="mt-10 flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:gap-3">{deliverableSteps.map((step, index) => <div key={step} className="flex flex-col items-center gap-2 sm:flex-1 sm:flex-row"><div className="w-full rounded-md border border-border bg-card px-4 py-4 text-center text-sm font-medium">{step}</div>{index < deliverableSteps.length - 1 ? <span className="text-muted-foreground sm:shrink-0" aria-hidden="true">↓</span> : null}</div>)}</div><div className="mt-6 rounded-lg border border-border bg-muted/20 p-5 text-sm leading-7 text-muted-foreground"><p>The final research pack will be delivered as a structured digital document. Its contents depend on the selected package, the available literature, and the scope confirmed before payment.</p></div></section>

      <section className="border-y border-border/60 bg-[#f8f8f6]"><div className="container max-w-5xl py-16"><SectionHeading eyebrow="Sample Research Pack" title="See a Sample Research Pack"><span>See how ScholarLens turns a research topic into a structured literature landscape, research themes, gaps, and research questions.</span></SectionHeading><div className="mt-10 overflow-hidden rounded-xl border border-border bg-card shadow-sm"><div className="grid gap-0 md:grid-cols-[minmax(0,1fr)_280px]"><div className="p-6 sm:p-8"><div className="flex items-center gap-3"><span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-primary"><FileText className="h-3.5 w-3.5" aria-hidden="true" />Sample</span><span className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">Free preview</span></div><h3 className="mt-7 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">The 2026 Research Landscape of Agentic AI</h3><p className="mt-3 text-sm font-medium leading-6 text-muted-foreground">Planning, Tool Use, Memory, Multi-Agent Systems &amp; Safety</p><ul className="mt-7 grid gap-3 text-sm leading-6 text-foreground/80 sm:grid-cols-2">{["Curated research papers", "Research themes", "Literature comparison", "Research gaps", "Research questions"].map((item) => <li key={item} className="flex gap-2"><span className="text-primary" aria-hidden="true">✓</span><span>{item}</span></li>)}</ul><p className="mt-7 max-w-2xl text-sm leading-7 text-muted-foreground">This sample shows the type of structured research support you can expect from a ScholarLens Research Pack.</p><a href="/research-packs/ScholarLens_Agentic_AI_Research_Pack.pdf" target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground hover:opacity-90">View Sample Research Pack <FileText className="h-4 w-4" aria-hidden="true" /></a></div><div className="flex min-h-48 items-center justify-center border-t border-border bg-muted/30 p-8 md:border-l md:border-t-0"><div className="flex h-36 w-28 flex-col items-center justify-center rounded-md border border-border bg-background shadow-sm"><FileText className="h-10 w-10 text-primary/70" aria-hidden="true" /><span className="mt-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">PDF</span></div></div></div></div></div></section>

      <section className="border-y border-border/60 bg-[#f8f8f6]"><div className="container max-w-5xl py-16"><SectionHeading eyebrow="Who it is for" title="Useful support at the beginning of a project." /><div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">{audiences.map((audience) => <div key={audience} className="rounded-lg border border-border bg-background p-5 text-sm font-medium leading-6">{audience}</div>)}</div><p className="mt-8 max-w-3xl text-sm leading-7 text-muted-foreground">Research support can help you orient yourself, but it does not guarantee academic grades, publication acceptance, or research success.</p></div></section>

      <section className="container max-w-3xl py-16"><SectionHeading eyebrow="Common questions" title="Before you request a pack." /><div className="mt-8 divide-y divide-border border-y border-border">{faqs.map(([question, answer]) => <details key={question} className="group py-5"><summary className="cursor-pointer list-none pr-8 text-base font-semibold marker:content-none">{question}<span className="float-right text-muted-foreground group-open:rotate-45" aria-hidden="true">+</span></summary><p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">{answer}</p></details>)}</div></section>

      <section className="border-t border-border/60 bg-primary text-primary-foreground"><div className="container max-w-5xl py-16"><p className="text-sm font-medium text-primary-foreground/70">Ready to start?</p><h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">Share your question and we will define the right scope.</h2><p className="mt-4 max-w-2xl leading-7 text-primary-foreground/75">Send us your research topic and the package you want. We will confirm the scope, price, and expected delivery time before payment.</p><Link href="/contact" className="mt-8 inline-flex min-h-11 items-center justify-center rounded-md bg-background px-5 text-sm font-medium text-foreground hover:bg-background/90">Contact ScholarLens</Link></div></section>

      <section className="container max-w-5xl py-10"><p className="text-center text-sm leading-7 text-muted-foreground">ScholarLens uses academic literature discovery tools and publicly available scholarly metadata to support research discovery. Research recommendations should be independently evaluated by the user.</p></section>
    </main>
  );
}