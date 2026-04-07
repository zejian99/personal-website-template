"use client";

import { useState, useRef } from "react";
import { nowSections } from "@/lib/now";

function ExpandablePreview({ preview, open }: { preview: string; open: boolean }) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: open ? "1fr" : "0fr",
        opacity: open ? 1 : 0,
        transition: "grid-template-rows 0.25s ease, opacity 0.25s ease",
      }}
    >
      <div ref={ref} style={{ overflow: "hidden" }}>
        <p className="text-sm" style={{ paddingTop: "6px", paddingLeft: "10px", borderLeft: "1.5px solid", marginTop: "6px" }}>
          {preview}
        </p>
      </div>
    </div>
  );
}

export default function NowPreview() {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  return (
    <ul className="flex flex-col gap-4">
      {nowSections.map((s) => (
        <li key={s.heading}>
          <button
            onClick={() => setExpanded((prev) => {
              const next = new Set(prev);
              next.has(s.heading) ? next.delete(s.heading) : next.add(s.heading);
              return next;
            })}
            className="flex items-center gap-3 text-sm w-full text-left"
            style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
          >
            <span className="select-none">•</span>
            <span className="shrink-0 uppercase tracking-widest select-none" style={{ fontSize: "0.6rem" }}>
              {s.heading}
            </span>
            <span style={{ fontSize: "0.7rem", display: "inline-block", transition: "transform 0.25s ease", transform: expanded.has(s.heading) ? "rotate(180deg)" : "rotate(0deg)" }}>
              ▾
            </span>
          </button>
          <ExpandablePreview preview={s.preview} open={expanded.has(s.heading)} />
        </li>
      ))}
    </ul>
  );
}
