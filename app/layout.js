import "./globals.css";
import Script from "next/script";
import CookieNotice from "@/components/CookieNotice";

const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://scholarlens.app";
const SITE_NAME = "ScholarLens";
const DEFAULT_TITLE = "ScholarLens — Search real research papers with an AI reading assistant";
const DEFAULT_DESCRIPTION = "Search millions of real academic papers on ScholarLens. Read papers with an AI assistant that explains passages, defines jargon, and summarizes sections in plain language.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: DEFAULT_TITLE, template: "%s | ScholarLens" },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "academic search",
    "research papers",
    "scholarly search engine",
    "open access papers",
    "AI reading assistant",
    "paper summarizer",
    "OpenAlex",
    "scientific literature",
    "research discovery",
    "read research papers online",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "education",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: "/",
    locale: "en_US",
    images: [{ url: "/icon.svg", width: 512, height: 512, alt: "ScholarLens" }],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: ["/icon.svg"],
  },
  alternates: { canonical: "/" },
  formatDetection: { email: false, telephone: false, address: false },
  verification: { google: "CMpGK3u2ALgIL22PmVlilKvVld_a8oW84cXoJoiGBTQ" },
};

export const viewport = { width: "device-width", initialScale: 1, themeColor: "#0f172a" };

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/icon.svg`,
};

const siteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="google-adsense-account" content="ca-pub-9144354248628915" />
        <Script
          async
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9144354248628915"
          crossOrigin="anonymous"
        />
        <Script
          async
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-L7M0XLQZS9"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-L7M0XLQZS9');`}
        </Script>
        <Script id="ld-organization" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
        <Script id="ld-website" type="application/ld+json" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }} />
      </head>
      <body>{children}<CookieNotice /></body>
    </html>
  );
}
