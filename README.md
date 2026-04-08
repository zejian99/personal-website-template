# Personal Website Template

> **Heads up:** This is **not** an exact replica of my personal website. It is a cleaned-up template that captures the core structure and functionality — stripped of personal content and private configuration. Think of it as a solid foundation you can build on top of, not a pixel-perfect clone.

---

## What This Is

A minimal, opinionated personal website template built with Next.js. It covers the pages and components I find most useful for a personal site:

- **Home** — hero section, social links, recent posts, projects, and a timeline
- **Blog** — MDX-powered blog with reading time, table of contents, code highlighting, and per-post OG images
- **Projects** — project cards with status indicators
- **Now** — a `/now` page for what you're currently up to
- **RSS feed** — auto-generated at `/feed.xml`
- **Sitemap & robots.txt** — auto-generated for SEO

---

## Project Structure

```
app/
  blog/                   # Blog listing + individual post pages
  projects/               # Projects page
  now/                    # /now page
  components/             # Shared UI components
  globals.css             # CSS variables for theming
  layout.tsx              # Root layout
  page.tsx                # Home page

lib/
  posts.ts                # MDX blog post loader
  projects.ts             # Projects data
  timeline.ts             # Timeline data
  now.ts                  # Now page content

posts/                    # Your blog posts go here (MDX files)
```

---

## Making It Yours

This template is designed to be customized. Here's where to start:

1. **Personal info** — update your name, bio, and social links in [app/page.tsx](app/page.tsx)
2. **Blog posts** — add `.mdx` files to your `posts/` directory
3. **Projects** — edit [lib/projects.ts](lib/projects.ts) to list your own work
4. **Timeline** — edit [lib/timeline.ts](lib/timeline.ts) with your own milestones
5. **Now page** — edit [lib/now.ts](lib/now.ts) with what you're currently focused on
6. **Theming** — all colors are CSS variables in [app/globals.css](app/globals.css), swap them freely
7. **Fonts** — fonts are configured in `layout.tsx` via `next/font`

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

---

## Tech Stack

- [Next.js](https://nextjs.org) (App Router)
- [Tailwind CSS](https://tailwindcss.com)
- [MDX](https://mdxjs.com) for blog posts
- [Shiki](https://shiki.style) for code syntax highlighting

---

## Deploying

The easiest path is [Vercel](https://vercel.com). Push this repo, import it in Vercel, and you're good to go.

See the [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying) for more options.
