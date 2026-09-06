"use client";

import { useEffect, useRef } from "react";

const CLIENT_ID = "ca-pub-9144354248628915";
// Slot IDs come from AdSense → Ads → By ad unit. Set these in your Vercel env to render real ads.
const SLOT_IDS = {
  "search-sidebar": process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR,
  "paper-footer": process.env.NEXT_PUBLIC_ADSENSE_SLOT_FOOTER,
};

export function AdSlot({ slot }) {
  const slotId = SLOT_IDS[slot];
  const pushed = useRef(false);

  useEffect(() => {
    if (!slotId || pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch (error) {
      if (process.env.NODE_ENV !== "production") console.warn("adsbygoogle push failed", error);
    }
  }, [slotId]);

  if (!slotId) {
    return (
      <div
        data-ad-slot={slot}
        aria-label={`${slot} advertisement`}
        className="flex min-h-[180px] flex-col items-center justify-center rounded-lg border border-dashed border-border bg-muted/30 px-5 text-center"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/70">Advertisement</span>
        <span className="mt-2 text-xs text-muted-foreground/70">{slot}</span>
      </div>
    );
  }

  return (
    <div data-ad-slot={slot} aria-label={`${slot} advertisement`} className="min-h-[180px] w-full overflow-hidden">
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={CLIENT_ID}
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
