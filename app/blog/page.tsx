import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import AnimatedPostList from "@/app/components/AnimatedPostList";

export const metadata: Metadata = {
  title: "Writings",
  description: "Thoughts on building agents, AI, and software.",
  openGraph: { type: "website", url: "https://yoursite.com/blog" },
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen">
      <div className="max-w-2xl mx-auto px-6 py-16 md:py-24">

        <div className="flex justify-between items-center mb-10">
          <Link href="/" className="text-xs underline">
            ← back
          </Link>
        </div>

        <h1 className="text-3xl font-semibold mb-10">Writings</h1>

        {posts.length === 0 ? (
          <p className="text-sm">No posts yet.</p>
        ) : (
          <AnimatedPostList posts={posts} />
        )}
      </div>
    </main>
  );
}
