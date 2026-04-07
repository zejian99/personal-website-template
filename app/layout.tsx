import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import PageTransition from "./components/PageTransition";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://yoursite.com"),
  title: {
    default: "Your Name",
    template: "%s",
  },
  description: "Your personal website description.",
  authors: [{ name: "Your Name", url: "https://yoursite.com" }],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: "Your Name",
    locale: "en_US",
    url: "https://yoursite.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Name",
    description: "Your personal website description.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <PageTransition>{children}</PageTransition>
        <Analytics />
      </body>
    </html>
  );
}
