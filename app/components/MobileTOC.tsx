"use client";

import { useState } from "react";
import type { Heading } from "./TableOfContents";

export default function MobileTOC({ headings }: { headings: Heading[] }) {
  const [open, setOpen] = useState(false);

  if (headings.length === 0) return null;

  return (
    <div className="lg:hidden mb-8 border">
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0.6rem 0.85rem",
          fontSize: "0.72rem",
          cursor: "pointer",
          border: "none",
          background: "#f1f1f1",
        }}
      >
        <span>Contents</span>
        <svg
          width="12" height="12" viewBox="0 0 12 12" fill="none"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s", flexShrink: 0 }}
        >
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <ul style={{ padding: "0.5rem 0.85rem 0.7rem" }}>
          {headings.map((h) => (
            <li key={h.id} style={{ paddingLeft: h.level === 3 ? "0.85rem" : "0" }}>
              <a
                href={`#${h.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(false);
                  document.getElementById(h.id)?.scrollIntoView({ behavior: "smooth" });
                }}
                style={{ display: "block", fontSize: "0.72rem", lineHeight: 1.4, padding: "0.22rem 0", textDecoration: "none" }}
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
