"use client";

import { useEffect, useState } from "react";

export interface Heading {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (headings.length === 0) return;

    const handleScroll = () => {
      const threshold = window.innerHeight * 0.3;
      let active = headings[0].id;
      for (const h of headings) {
        const el = document.getElementById(h.id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= threshold) active = h.id;
      }
      setActiveId(active);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="max-h-[calc(100vh-8rem)] overflow-y-auto" style={{ minWidth: 0 }}>
      <div className="mb-4 border-t" />
      <ul className="space-y-1">
        {headings.map((h) => (
          <li key={h.id} style={{ paddingLeft: h.level === 3 ? "0.85rem" : "0" }}>
            <a
              href={`#${h.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(h.id)?.scrollIntoView({ behavior: "smooth" });
              }}
              style={{
                display: "block",
                fontSize: h.level === 3 ? "0.7rem" : "0.72rem",
                lineHeight: 1.4,
                padding: "0.2rem 0",
                fontWeight: activeId === h.id ? 500 : 400,
                textDecoration: "none",
                wordBreak: "break-word",
              }}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
