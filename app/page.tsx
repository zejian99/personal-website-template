import Link from "next/link";
import Portrait from "./components/Portrait";
import BackToTop from "./components/BackToTop";
import { getAllPosts } from "@/lib/posts";
import { projects } from "@/lib/projects";
import { timeline } from "@/lib/timeline";
import StatusDot from "@/app/components/StatusDot";
import NowPreview from "@/app/components/NowPreview";

const socialLinks = [
  {
    label: "@yourusername",
    official_label: "github",
    href: "https://github.com/yourusername",
    icon: (
      <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current" aria-hidden="true">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "@yourname",
    official_label: "linkedin",
    href: "https://linkedin.com/in/yourname",
    icon: (
      <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

export default function Home() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <main className="min-h-screen">
      <div className="max-w-2xl mx-auto px-6 py-16 md:py-24">

        {/* Hero */}
        <section className="flex flex-col-reverse md:grid md:grid-cols-[1fr_auto] md:gap-12 items-start mb-16">
          <div className="mt-8 md:mt-0">
            <h1 className="text-5xl font-semibold mb-2">
              Your Name
            </h1>
            <p className="text-sm mb-5">
              Your tagline here
            </p>
            <p className="text-sm leading-relaxed">
              Hi! I&apos;m a placeholder bio. Describe who you are, what you do, and what you care about in a sentence or two.
            </p>

            {/* Social pills */}
            <div className="flex flex-wrap gap-2 mt-6">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs border"
                >
                  {s.icon}
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <Portrait />
        </section>

        {/* Now */}
        <section className="mb-14">
          <div className="flex items-baseline justify-between mb-4">
            <h2 className="text-xs uppercase tracking-widest">Now</h2>
            <Link href="/now" className="text-xs underline">
              more →
            </Link>
          </div>
          <NowPreview />
        </section>

        {/* Writing */}
        <section className="mb-14">
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="text-xs uppercase tracking-widest">Writings</h2>
            {posts.length > 0 && (
              <Link href="/blog" className="text-xs underline">
                all posts →
              </Link>
            )}
          </div>

          {posts.length === 0 ? (
            <p className="text-sm">No posts yet.</p>
          ) : (
            <ul className="flex flex-col gap-2">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="grid min-h-18 gap-x-6"
                    style={{ gridTemplateColumns: "1fr max-content" }}
                  >
                    <span className="text-sm self-center">{post.title}</span>
                    <span className="text-xs self-center text-right tabular-nums row-span-2" style={{ fontSize: "0.7rem" }}>
                      {post.date}
                      <span className="block" style={{ fontSize: "0.62rem" }}>
                        {post.readingTime} min read
                      </span>
                    </span>
                    {post.description && (
                      <p className="text-xs mt-0.5 col-start-1 line-clamp-2">
                        {post.description}
                      </p>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Projects */}
        <section className="mb-14">
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="text-xs uppercase tracking-widest">Projects</h2>
            <Link href="/projects" className="text-xs underline">
              all projects →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {projects.slice(0, 2).map((project) => {
              const card = (
                <div className="flex flex-col gap-2 p-4 h-full border">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-sm">{project.title}</span>
                    <div className="flex items-center gap-2">
                      {project.href && <span className="text-xs">→</span>}
                      <StatusDot status={project.status} />
                    </div>
                  </div>
                  {project.description && (
                    <p className="text-xs leading-relaxed">{project.description}</p>
                  )}
                </div>
              );
              if (!project.href) return <div key={project.slug}>{card}</div>;
              const isExternal = project.href.startsWith("http");
              return isExternal ? (
                <a key={project.slug} href={project.href} target="_blank" rel="noopener noreferrer">{card}</a>
              ) : (
                <Link key={project.slug} href={project.href}>{card}</Link>
              );
            })}
          </div>
        </section>

        {/* Timeline */}
        <section className="mb-14">
          <h2 className="text-xs uppercase tracking-widest mb-6">Timeline</h2>
          <div className="relative flex flex-col gap-5 pl-9 border-l">
            {timeline.map((entry) => {
              const isNow = entry.year === "Now";
              const hasLink = !!entry.href;
              return (
                <div key={entry.year} className="relative flex items-baseline gap-3 md:gap-5">
                  <span className="absolute -left-[0.3rem] top-1.5 w-2 h-2 rounded-full border bg-white" />
                  {isNow ? (
                    <Link href="/now" className="text-xs w-24 shrink-0 underline">
                      Now →
                    </Link>
                  ) : (
                    <span className="text-xs w-24 shrink-0" style={{ color: hasLink ? undefined : undefined }}>
                      {entry.year}
                    </span>
                  )}
                  <span className="text-sm">
                    {entry.href && entry.linkText ? (() => {
                      const [before, after] = entry.desc.split(entry.linkText);
                      return (
                        <>{before}<a href={entry.href} target="_blank" rel="noopener noreferrer" className="underline">{entry.linkText}</a>{after}</>
                      );
                    })() : entry.desc}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Footer */}
        <footer className="text-xs pt-6 flex items-center justify-between border-t">
          <span>© {new Date().getFullYear()} Your Name</span>
          <div className="flex gap-4">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                {s.official_label}
              </a>
            ))}
          </div>
        </footer>

      </div>
      <BackToTop fixed className="right-8 lg:right-auto lg:left-[calc(50%+25rem)]" />
    </main>
  );
}
