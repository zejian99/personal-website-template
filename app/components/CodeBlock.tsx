"use client";

import { useRef, useState } from "react";

export default function CodeBlock({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);
  const lang = (props as { "data-language"?: string })["data-language"];

  function handleCopy() {
    const text = preRef.current?.innerText ?? "";
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

  return (
    <div style={{ position: "relative" }}>
      <pre ref={preRef} {...props}>{children}</pre>
      {lang && (
        <span style={{ position: "absolute", top: "0.5rem", left: "0.5rem", fontSize: "0.65rem", opacity: 0.6, pointerEvents: "none", userSelect: "none" }}>
          {lang}
        </span>
      )}
      <button
        onClick={handleCopy}
        style={{ position: "absolute", top: "0.5rem", right: "0.5rem", fontSize: "0.65rem", background: "#f1f1f1", border: "1px solid #ccc", borderRadius: "4px", padding: "2px 8px", cursor: "pointer" }}
      >
        {copied ? "copied!" : "copy"}
      </button>
    </div>
  );
}
