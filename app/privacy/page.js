export const metadata = { title: "Privacy — ScholarLens" };

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto max-w-3xl py-16">
        <h1 className="text-3xl font-semibold tracking-[-0.03em]">Privacy note</h1>
        <div className="prose prose-sm mt-8 space-y-6 text-foreground/80">
          <p>ScholarLens is a research-first paper search and reading platform. We keep this note short and plain.</p>
          <h2 className="mt-8 text-lg font-semibold text-foreground">What we store</h2>
          <ul className="list-disc space-y-2 pl-6">
            <li>Paper metadata fetched from OpenAlex (a public scholarly index).</li>
            <li>If you sign in with a magic link, your email address, and the papers, tags, and notes you save.</li>
            <li>Selected-text explanations you request from the reading assistant, cached to avoid duplicate LLM calls.</li>
          </ul>
          <h2 className="mt-8 text-lg font-semibold text-foreground">Cookies and analytics</h2>
          <p>We use Google Analytics 4 to see aggregate visitor counts and Google AdSense to show ads on the search sidebar and paper footer. These may set cookies. We do not build our own profile of you.</p>
          <h2 className="mt-8 text-lg font-semibold text-foreground">Contact</h2>
          <p>Questions or deletion requests: email the address in your Supabase account settings.</p>
        </div>
      </div>
    </main>
  );
}
