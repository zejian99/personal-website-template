import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import { getAllPosts, getPost, getRelatedPosts, getAdjacentPosts } from "@/lib/posts";
import TableOfContents from "@/app/components/TableOfContents";
import MobileTOC from "@/app/components/MobileTOC";
import BackToTop from "@/app/components/BackToTop";
import ReadingProgress from "@/app/components/ReadingProgress";
import CodeBlock from "@/app/components/CodeBlock";
import CopyLinkButton from "@/app/components/CopyLinkButton";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description || undefined,
    openGraph: {
      type: "article",
      url: `https://yoursite.com/blog/${slug}`,
      title: post.title,
      description: post.description || undefined,
      publishedTime: post.date || undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description || undefined,
    },
  };
}

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const related = getRelatedPosts(slug);
  const { prev, next } = getAdjacentPosts(slug);

  return (
    <main className="min-h-screen">
      <ReadingProgress />
      <div className="mx-auto px-6 py-16 md:py-24" style={{ maxWidth: "72rem" }}>

        {/* Back link row */}
        <div className="flex justify-between items-center mb-10">
          <Link href="/blog" className="text-xs underline">← writings</Link>
          <Link href="/" aria-label="Home">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
              <path d="M9 21V12h6v9" />
            </svg>
          </Link>
        </div>

        <div className="flex gap-16 items-start">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            <header className="mb-10">
              <h1 className="text-3xl font-semibold mb-10">{post.title}</h1>
              <div className="flex items-center gap-3 text-xs">
                {post.date && <time>{post.date}</time>}
                {post.date && <span>|</span>}
                <span>{post.readingTime} min read</span>
                <span>|</span>
                <CopyLinkButton />
              </div>
              {post.description && (
                <p className="text-sm mt-2">{post.description}</p>
              )}
            </header>

            <MobileTOC headings={post.headings} />

            <article className="prose">
              <MDXRemote
                source={post.content}
                components={{ pre: CodeBlock }}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                    rehypePlugins: [
                      rehypeSlug,
                      [rehypePrettyCode, { theme: "catppuccin-latte" }],
                    ],
                  },
                }}
              />
            </article>

            {/* Prev/next navigation */}
            {(prev || next) && (
              <nav className="flex justify-between mt-16 pt-8 text-xs border-t">
                <div>
                  {prev && (
                    <Link href={`/blog/${prev.slug}`} className="flex flex-col gap-0.5 underline">
                      <span>← older</span>
                      <span className="text-sm">{prev.title}</span>
                    </Link>
                  )}
                </div>
                <div className="text-right">
                  {next && (
                    <Link href={`/blog/${next.slug}`} className="flex flex-col gap-0.5 items-end underline">
                      <span>newer →</span>
                      <span className="text-sm">{next.title}</span>
                    </Link>
                  )}
                </div>
              </nav>
            )}

            {/* Mobile related posts */}
            {related.length > 0 && (
              <div className="lg:hidden mt-16 pt-8 border-t">
                <p className="text-xs uppercase tracking-widest mb-6">Related Posts</p>
                <ul className="flex flex-col gap-5">
                  {related.map((p) => (
                    <li key={p.slug}>
                      <Link href={`/blog/${p.slug}`} className="grid gap-x-6" style={{ gridTemplateColumns: "1fr max-content" }}>
                        <span className="text-sm self-center">{p.title}</span>
                        <span className="text-xs self-center text-right tabular-nums row-span-2" style={{ fontSize: "0.7rem" }}>{p.date}</span>
                        {p.description && (
                          <p className="text-xs mt-0.5 col-start-1">{p.description}</p>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Table of contents sidebar */}
          <aside className="hidden lg:flex shrink-0 sticky self-start flex-col items-start" style={{ width: "14rem", top: "6rem" }}>
            {post.headings.length > 0 && <TableOfContents headings={post.headings} />}

            {related.length > 0 && (
              <div className="mt-6 w-full">
                <div className="mb-3 border-t" />
                <p className="text-xs uppercase tracking-widest mb-3">Related Posts</p>
                <ul className="flex flex-col gap-3">
                  {related.map((p) => (
                    <li key={p.slug}>
                      <Link href={`/blog/${p.slug}`} className="block underline" style={{ fontSize: "0.72rem", lineHeight: 1.4 }}>
                        {p.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <BackToTop />
          </aside>
        </div>

        {/* Mobile back to top */}
        <div className="lg:hidden">
          <BackToTop fixed />
        </div>

      </div>
    </main>
  );
}
