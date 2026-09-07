"use client";

import Link from "next/link";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function RelatedPapers({ query }) {
  const [papers, setPapers] = useState([]);
  const [state, setState] = useState("loading");

  useEffect(() => {
    let active = true;
    fetch(`/api/search?q=${encodeURIComponent(query)}&per_page=5&sort=relevance&access=all`)
      .then(async (response) => {
        const payload = await response.json();
        if (!response.ok) throw new Error(payload.error || "Search unavailable");
        if (active) { setPapers(payload.results || []); setState("ready"); }
      })
      .catch(() => { if (active) setState("error"); });
    return () => { active = false; };
  }, [query]);

  if (state === "loading") return <div className="flex items-center gap-2 rounded-lg border border-dashed border-border p-6 text-sm text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" /> Finding relevant papers...</div>;
  if (state === "error") return <p className="rounded-lg border border-dashed border-border p-6 text-sm text-muted-foreground">Relevant papers are temporarily unavailable. Search the topic directly to continue exploring.</p>;
  if (!papers.length) return <p className="rounded-lg border border-dashed border-border p-6 text-sm text-muted-foreground">No matching papers were returned. Try a broader search.</p>;

  return <div className="space-y-3">{papers.map((paper) => <article key={paper.id} className="rounded-lg border border-border bg-card p-5"><div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground"><span>{paper.year || "Year unknown"}</span><span className="text-border">•</span><span>{paper.venue}</span></div><Link href={`/paper/${encodeURIComponent(paper.id)}`} className="mt-2 block text-base font-semibold leading-6 hover:text-primary">{paper.title}</Link><p className="mt-2 text-sm text-muted-foreground">{(paper.authors || []).slice(0, 3).join(", ") || "Author information unavailable"}{paper.authors?.length > 3 ? " et al." : ""}</p><Link href={`/paper/${encodeURIComponent(paper.id)}`} className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">Read paper <ArrowUpRight className="h-3.5 w-3.5" /></Link></article>)}</div>;
}
