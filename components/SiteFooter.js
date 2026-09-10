import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-border/70 bg-muted/20">
      <div className="container flex flex-col gap-5 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="font-semibold text-foreground">ScholarLens</Link>
        <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-5 gap-y-2">
          <Link href="/about" className="hover:text-foreground">About</Link>
          <Link href="/research-topics" className="hover:text-foreground">Research Topics</Link>
          <Link href="/contact" className="hover:text-foreground">Contact</Link>
          <Link href="/privacy" className="hover:text-foreground">Privacy</Link>
          <Link href="/terms" className="hover:text-foreground">Terms</Link>
        </nav>
      </div>
    </footer>
  );
}