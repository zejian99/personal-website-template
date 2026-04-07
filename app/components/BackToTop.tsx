"use client";

import { useEffect, useState } from "react";

type BackToTopProps = {
  fixed?: boolean;
  className?: string;
};

export default function BackToTop({ fixed = false, className = "" }: BackToTopProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 300);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className={`flex items-center justify-center border ${fixed ? "fixed bottom-8 right-8 z-50" : "mt-4"} ${className}`}
      style={{ width: "36px", height: "36px", borderRadius: "999px", cursor: "pointer", background: "white" }}
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M6 9.5V2.5M2.5 6L6 2.5L9.5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
