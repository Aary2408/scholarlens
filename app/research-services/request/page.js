import RequestForm from "./request-form";

export const metadata = {
  title: "Request Research Support — ScholarLens",
  description: "Submit a research topic and request a ScholarLens research discovery and planning pack.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/research-services/request" },
};

const validPackages = ["starter", "research-pack", "deep-dive"];

export default async function ResearchRequestPage({ searchParams }) {
  const params = await searchParams;
  const requestedPackage = validPackages.includes(params?.package) ? params.package : "";

  return (
    <main className="min-h-screen bg-background">
      <section className="border-b border-border/60 bg-[#f8f8f6]"><div className="container max-w-4xl py-14 lg:py-18"><p className="text-sm font-medium text-muted-foreground">Research support</p><h1 className="mt-3 text-4xl font-semibold leading-tight tracking-[-0.05em] sm:text-5xl">Request Research Support</h1><p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">Share your research question and we will review the scope before confirming the package, payment details, and expected delivery time.</p></div></section>
      <div className="container grid max-w-6xl gap-12 py-12 lg:grid-cols-[minmax(0,1fr)_280px] lg:py-16">
        <RequestForm initialPackage={requestedPackage} />
        <aside className="space-y-8 lg:pt-2">
          <section><h2 className="text-xl font-semibold tracking-[-0.03em]">How it works</h2><ol className="mt-5 space-y-5">{["Submit your research request", "ScholarLens reviews the scope", "We confirm the package and payment details", "Research work begins after confirmation", "You receive your structured Research Pack"].map((step, index) => <li key={step} className="flex gap-3 text-sm leading-6 text-muted-foreground"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">{index + 1}</span><span>{step}</span></li>)}</ol></section>
          <section className="rounded-lg border border-border bg-muted/20 p-5"><p className="text-sm font-semibold text-foreground">Student Launch Pricing</p><p className="mt-2 text-sm leading-6 text-muted-foreground">Introductory pricing while ScholarLens is growing.</p></section>
        </aside>
      </div>
    </main>
  );
}