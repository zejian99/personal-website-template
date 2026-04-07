"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";

type Post = {
  slug: string;
  title: string;
  date: string;
  description?: string;
  tags?: string[];
  readingTime?: number;
};

const POSTS_PER_PAGE = 6;

export default function AnimatedPostList({ posts }: { posts: Post[] }) {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags ?? []))).sort();
  const filtered = posts.filter((p) => {
    const matchesTag = activeTag ? p.tags?.includes(activeTag) : true;
    const q = query.trim().toLowerCase();
    const matchesQuery = q
      ? p.title.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q)
      : true;
    return matchesTag && matchesQuery;
  });

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        {allTags.length > 0 && (
          <div ref={dropdownRef} style={{ position: "relative", display: "inline-block" }}>
            <button
              onClick={() => setOpen((o) => !o)}
              className="flex items-center gap-1.5 text-xs"
              style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
            >
              {activeTag ?? "all posts"}
              <svg
                width="10" height="10" viewBox="0 0 10 10" fill="none"
                style={{ transition: "transform 0.15s", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
              >
                <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {open && (
              <div
                className="flex flex-col"
                style={{
                  position: "absolute",
                  top: "calc(100% + 6px)",
                  left: 0,
                  border: "1px solid",
                  borderRadius: "6px",
                  minWidth: "120px",
                  zIndex: 10,
                  maxHeight: "160px",
                  overflowY: "auto",
                  background: "white",
                }}
              >
                {[null, ...allTags].map((tag) => {
                  const key = tag ?? "__all__";
                  const isActive = activeTag === tag;
                  return (
                    <button
                      key={key}
                      onClick={() => { setActiveTag(tag); setOpen(false); setPage(1); }}
                      className="text-left text-xs px-3 py-2"
                      style={{
                        background: isActive ? "#f1f1f1" : "none",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      {tag ?? "all posts"}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        <input
          type="text"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setPage(1); }}
          placeholder="search..."
          className="text-xs bg-transparent outline-none border rounded-full px-3 py-1"
          style={{ width: "120px" }}
        />
      </div>

      <ul className="flex flex-col">
        {paginated.map((post) => (
          <li
            key={post.slug}
            className="py-5 border-b"
          >
            <Link href={`/blog/${post.slug}`} className="grid gap-x-6" style={{ gridTemplateColumns: "1fr max-content" }}>
              <span className="text-sm self-center">{post.title}</span>
              <span className="text-xs self-center text-right tabular-nums row-span-2" style={{ fontSize: "0.7rem" }}>
                {post.date}
                {post.readingTime != null && <span className="block" style={{ fontSize: "0.62rem" }}>{post.readingTime} min read</span>}
              </span>
              {post.description && (
                <p className="text-xs mt-0.5 col-start-1">{post.description}</p>
              )}
            </Link>
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {post.tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={(e) => { e.preventDefault(); setActiveTag(activeTag === tag ? null : tag); setPage(1); }}
                    className="text-xs px-2 py-0.5 rounded-full border"
                    style={{ background: "none", cursor: "pointer", fontSize: "0.65rem" }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>

      {filtered.length === 0 && (
        <p className="text-sm">No posts found.</p>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-8 text-xs">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            style={{
              background: "none",
              border: "none",
              cursor: page === 1 ? "default" : "pointer",
              opacity: page === 1 ? 0.3 : 1,
              padding: 0,
            }}
          >
            ← prev
          </button>
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n, i) => (
              <span key={n} className="flex items-center gap-2">
                {i > 0 && <span>/</span>}
                <button
                  onClick={() => setPage(n)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: n === page ? "default" : "pointer",
                    fontWeight: n === page ? 600 : 400,
                    padding: 0,
                  }}
                >
                  {n}
                </button>
              </span>
            ))}
          </div>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            style={{
              background: "none",
              border: "none",
              cursor: page === totalPages ? "default" : "pointer",
              opacity: page === totalPages ? 0.3 : 1,
              padding: 0,
            }}
          >
            next →
          </button>
        </div>
      )}
    </div>
  );
}
