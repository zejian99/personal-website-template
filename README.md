# Personal Website Template

> **Heads up:** This is **not** an exact replica of my personal website. It is a cleaned-up template that captures the core structure and functionality — stripped of personal content, private API keys, and service-specific configuration. Think of it as a solid foundation you can build on top of, not a pixel-perfect clone.

---

## What This Is

A minimal, opinionated personal website template built with Next.js. It covers the pages and components I find most useful for a personal site:

- **Home** — hero section, social links, recent posts, projects, and a timeline
- **Blog** — MDX-powered blog with reading time, table of contents, code highlighting, and per-post OG images
- **Projects** — project cards with status indicators
- **Now** — a `/now` page for what you're currently up to
- **Chat widget** — an AI assistant that can answer questions about you, your posts, and your projects
- **Post summarizer** — generates a one-sentence summary for each blog post
- **RSS feed** — auto-generated at `/feed.xml`
- **Sitemap & robots.txt** — auto-generated for SEO

---

## What Was Removed

API connections have been intentionally removed from this template for security reasons. The following features require you to wire up your own keys before they will work:

| Feature | What you need |
|---|---|
| Chat widget (`/api/chat`) | An LLM API key (OpenAI-compatible). The route uses `LITELLM_API_KEY` pointed at a LiteLLM proxy — swap in your own provider |
| Post summarizer (`/api/summarize`) | Same LLM API key as above |

To re-enable these, add your API key to a `.env.local` file:

```env
LITELLM_API_KEY=your_key_here
```

And update the `baseURL` in [app/api/chat/route.ts](app/api/chat/route.ts) and [app/api/summarize/route.ts](app/api/summarize/route.ts) to point at your provider.

---

## Project Structure

```
app/
  api/
    chat/route.ts         # AI chat widget backend
    summarize/route.ts    # Blog post summarizer backend
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
  summaryCache.ts         # In-memory cache for post summaries

content/                  # Your blog posts go here (MDX files)
```

---

## Making It Yours

This template is designed to be customized. Here's where to start:

1. **Personal info** — update your name, bio, and social links in [app/page.tsx](app/page.tsx)
2. **Blog posts** — add `.mdx` files to your `content/` directory
3. **Projects** — edit [lib/projects.ts](lib/projects.ts) to list your own work
4. **Timeline** — edit [lib/timeline.ts](lib/timeline.ts) with your own milestones
5. **Now page** — edit [lib/now.ts](lib/now.ts) with what you're currently focused on
6. **Theming** — all colors are CSS variables in [app/globals.css](app/globals.css), swap them freely
7. **Fonts** — fonts are configured in `layout.tsx` via `next/font`
8. **AI persona** — if you set up the chat API, update the system prompt in [app/api/chat/route.ts](app/api/chat/route.ts) to describe yourself

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

---

## Tech Stack

- [Next.js 15](https://nextjs.org) (App Router)
- [Tailwind CSS](https://tailwindcss.com)
- [MDX](https://mdxjs.com) for blog posts
- [Shiki](https://shiki.style) for code syntax highlighting
- [AI SDK](https://sdk.vercel.ai) for the chat widget streaming

---

## Deploying

The easiest path is [Vercel](https://vercel.com). Push this repo, import it in Vercel, and add your environment variables in the project settings.

See the [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying) for more options.
