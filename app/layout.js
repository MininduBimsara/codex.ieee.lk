import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: {
    default: "IEEE CodeX Sri Lanka - Competitive Programming Excellence",
    template: "%s | IEEE CodeX Sri Lanka",
  },
  description:
    "IEEE CodeX Sri Lanka promotes competitive programming through NOI, IEEEXtreme, and ICPC competitions. Join our training sessions and represent Sri Lanka globally.",
  keywords: [
    "IEEE CodeX Sri Lanka",
    "competitive programming",
    "NOI",
    "IEEEXtreme",
    "ICPC",
    "programming contests",
    "coding training",
  ],

  // Open Graph
  openGraph: {
    title: "IEEE CodeX Sri Lanka - Competitive Programming Excellence",
    description:
      "Join IEEE CodeX Sri Lanka for competitive programming training and competitions.",
    url: "https://codex.ieee.lk",
    siteName: "IEEE CodeX Sri Lanka",
    images: ["/images/codex-logo.png"],
    locale: "en_US",
    type: "website",
  },

  // Twitter
  twitter: {
    card: "summary_large_image",
    title: "IEEE CodeX Sri Lanka - Competitive Programming Excellence",
    description:
      "Join IEEE CodeX Sri Lanka for competitive programming training and competitions.",
    images: ["/images/codex-logo.png"],
  },

  // Basic SEO
  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "https://codex.ieee.lk",
  },

  // Complete favicon configuration
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#1e40af",
      },
    ],
  },

  // Web app manifest
  manifest: "/site.webmanifest",
};

import AnimatedBackground from "./components/AnimatedBackground";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Additional favicon meta tags for better browser support */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#0ea5e9" />
        <meta name="msapplication-TileColor" content="#020617" />
        <meta name="theme-color" content="#020617" />

        {/* Essential structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "IEEE CodeX Sri Lanka",
              url: "https://codex.ieee.lk",
              logo: "https://codex.ieee.lk/images/codex-logo.png",
              description:
                "IEEE CodeX Sri Lanka promotes competitive programming through training and competitions",
              contactPoint: {
                "@type": "ContactPoint",
                email: "info@codex.ieee.lk",
                contactType: "General Inquiries",
              },
              sameAs: [
                "https://www.facebook.com/IEEECodeXSriLanka",
                "https://www.linkedin.com/company/ieee-codex-sri-lanka",
                "https://www.instagram.com/ieeecodexsrilanka",
              ],
            }),
          }}
        />
      </head>
      <body className={`${inter.className} text-white antialiased`}>
        {/* Animated background — canvas particles + glow orbs + grain */}
        <AnimatedBackground />
        {/* Deep blue-black base */}
        <div className="fixed inset-0 -z-10 animated-gradient opacity-95"></div>
        <main className="relative z-10">{children}</main>
      </body>
    </html>
  );
}
