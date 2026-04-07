import type { Metadata } from "next";
import Link from "next/link";
import { nowSections } from "@/lib/now";

export const metadata: Metadata = {
  title: "Now",
  description: "A snapshot of what I'm focused on right now.",
  openGraph: { type: "website", url: "https://yoursite.com/now" },
};

export default function NowPage() {
  return (
    <main className="min-h-screen">
      <div className="max-w-2xl mx-auto px-6 py-16 md:py-24">

        <div className="flex justify-between items-center mb-10">
          <Link href="/" className="text-xs underline">← back</Link>
        </div>

        <h1 className="text-2xl font-semibold mb-2">Now</h1>
        <p className="text-xs mb-12">
          A snapshot of what I&apos;m focused on right now.{" "}
          <a href="https://nownownow.com/about" target="_blank" rel="noopener noreferrer" className="underline">
            What is a now page?
          </a>
        </p>

        <div className="flex flex-col gap-10">
          {nowSections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xs uppercase tracking-widest mb-4">{section.heading}</h2>
              <ul className="flex flex-col gap-2">
                {section.items.map((item) => (
                  <li key={item} className="flex items-baseline gap-2 text-sm">
                    <span className="select-none shrink-0">—</span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <p className="text-xs mt-16">Last updated: March 2026</p>

      </div>
    </main>
  );
}
