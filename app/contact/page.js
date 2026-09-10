import Link from "next/link";

const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL;

export const metadata = {
  title: "Contact ScholarLens",
  description: "Contact ScholarLens about feedback, technical issues, data concerns, privacy, or partnerships.",
  alternates: { canonical: "/contact" },
  openGraph: { type: "website", title: "Contact ScholarLens | ScholarLens", description: "Contact ScholarLens about feedback, technical issues, data concerns, privacy, or partnerships.", url: "/contact" },
  twitter: { card: "summary", title: "Contact ScholarLens | ScholarLens", description: "Contact ScholarLens about feedback, technical issues, data concerns, privacy, or partnerships." },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background"><div className="container max-w-3xl py-16 lg:py-20"><p className="text-sm font-medium text-muted-foreground">Get in touch</p><h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">Contact ScholarLens</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">For platform questions, feedback, or requests, email ScholarLens at {contactEmail ? <a className="font-medium text-foreground underline decoration-border underline-offset-4 hover:decoration-foreground" href={`mailto:${contactEmail}`}>{contactEmail}</a> : <span className="text-foreground">the public contact email configured by the site owner</span>}.</p><div className="mt-12 grid gap-4 sm:grid-cols-2"><section className="rounded-lg border border-border bg-card p-6"><h2 className="font-semibold">Feedback</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">Tell us what would make research discovery or reading more useful.</p></section><section className="rounded-lg border border-border bg-card p-6"><h2 className="font-semibold">Technical issues</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">Include the page URL and a description of what went wrong.</p></section><section className="rounded-lg border border-border bg-card p-6"><h2 className="font-semibold">Content and data concerns</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">Report inaccurate metadata, broken source links, or an indexing concern.</p></section><section className="rounded-lg border border-border bg-card p-6"><h2 className="font-semibold">Privacy and partnerships</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">Use this address for privacy requests or partnership inquiries.</p></section></div><p className="mt-10 text-sm leading-6 text-muted-foreground">For privacy details, read the <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.</p></div></main>
  );
}