const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL;

export const metadata = {
  title: "Terms of Service",
  description: "The terms that apply when you use ScholarLens.",
  alternates: { canonical: "/terms" },
  openGraph: { type: "website", title: "Terms of Service | ScholarLens", description: "The terms that apply when you use ScholarLens.", url: "/terms" },
  twitter: { card: "summary", title: "Terms of Service | ScholarLens", description: "The terms that apply when you use ScholarLens." },
};

const sections = [
  ["Using ScholarLens", "ScholarLens provides public tools for discovering scholarly works and reading available information about them. You may use the service only in accordance with these terms and applicable law."],
  ["Research content and AI explanations", "Paper metadata, abstracts, links, and other research information may be incomplete or inaccurate. ScholarLens is not a publisher or academic authority. AI-generated explanations may contain errors and are not medical, legal, financial, or other professional advice. Check the original source and consult a qualified expert where appropriate."],
  ["External links", "Paper pages may link to publishers, repositories, OpenAlex, and other third parties. Those sites operate independently and have their own terms, availability, and privacy practices."],
  ["Accounts and saved library content", "Some features require an account. You are responsible for keeping access to your account secure. Saved papers, tags, and notes are associated with your account and should not be used to store material you do not have the right to save."],
  ["Acceptable use", "Do not abuse, scrape, disrupt, reverse engineer, circumvent access controls, upload unlawful material, infringe rights, or use the service to misrepresent research or another person. We may restrict access when necessary to protect the service or its users."],
  ["Intellectual property", "ScholarLens software, branding, and original site content are protected by applicable law. Paper metadata and linked content belong to their respective sources and rights holders. These terms do not transfer ownership of third-party content."],
  ["Limitation of liability", "To the extent permitted by law, ScholarLens is provided without guarantees about uninterrupted availability, completeness, accuracy, or fitness for a particular purpose. ScholarLens is not responsible for third-party content or decisions made from information found through the service."],
];

export default function TermsPage() {
  return <main className="min-h-screen bg-background"><article className="container max-w-3xl py-16 lg:py-20"><p className="text-sm font-medium text-muted-foreground">Last updated: September 10, 2026</p><h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">Terms of Service</h1><div className="mt-10 space-y-8 text-[16px] leading-7 text-foreground/80">{sections.map(([title, text]) => <section key={title}><h2 className="text-xl font-semibold text-foreground">{title}</h2><p className="mt-3">{text}</p></section>)}<section><h2 className="text-xl font-semibold text-foreground">Contact</h2><p className="mt-3">Questions about these terms may be sent to {contactEmail ? <a className="text-primary hover:underline" href={`mailto:${contactEmail}`}>{contactEmail}</a> : "the public contact email configured by the site owner"}.</p></section></div></article></main>;
}