export function track(event, params = {}) {
  if (typeof window === "undefined") return;
  const gtag = window.gtag;
  if (typeof gtag !== "function") return;
  try {
    gtag("event", event, params);
  } catch (error) {
    // swallow analytics errors so they never break UX
    if (process.env.NODE_ENV !== "production") console.warn("gtag error", error);
  }
}
