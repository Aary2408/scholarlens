"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";

const STORAGE_KEY = "scholarlens.cookieConsent.v1";

export default function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch (error) {
      // localStorage may be unavailable in privacy modes; fail silently
    }
  }, []);

  function dismiss(choice) {
    try { localStorage.setItem(STORAGE_KEY, choice); } catch (error) {}
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-3xl rounded-lg border border-border bg-card p-4 shadow-lg sm:inset-x-6 sm:bottom-6">
      <div className="flex items-start gap-4">
        <div className="flex-1 text-sm leading-6 text-foreground/80">
          <p className="font-medium text-foreground">This site uses cookies</p>
          <p className="mt-1 text-muted-foreground">We use cookies for basic analytics (Google Analytics) and to serve ads (Google AdSense). No personal profile is built by us. See our <Link href="/privacy" className="underline underline-offset-2 hover:text-foreground">privacy note</Link> for details.</p>
        </div>
        <button aria-label="Dismiss" onClick={() => dismiss("dismissed")} className="rounded-md p-1 text-muted-foreground hover:text-foreground">
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="mt-3 flex flex-wrap justify-end gap-2">
        <button onClick={() => dismiss("rejected")} className="rounded-md border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted">Reject non-essential</button>
        <button onClick={() => dismiss("accepted")} className="rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:opacity-90">Accept</button>
      </div>
    </div>
  );
}
