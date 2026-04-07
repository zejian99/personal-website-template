import fs from "fs";
import path from "path";
import matter from "gray-matter";
import GithubSlugger from "github-slugger";

const postsDir = path.join(process.cwd(), "posts");

function formatDate(raw: unknown): string {
  if (raw instanceof Date) return raw.toISOString().slice(0, 10);
  const s = String(raw);
  // Already yyyy-mm-dd
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
  // Try parsing and extracting date portion
  const d = new Date(s);
  if (!isNaN(d.getTime())) return d.toISOString().slice(0, 10);
  return s;
}

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  published: boolean;
  readingTime: number;
}

export interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

export interface Post extends PostMeta {
  content: string;
  headings: HeadingItem[];
  readingTime: number;
}

function extractHeadings(content: string): HeadingItem[] {
  const slugger = new GithubSlugger();
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: HeadingItem[] = [];
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = slugger.slug(text);
    headings.push({ id, text, level });
  }
  return headings;
}

function ensurePostsDir() {
  if (!fs.existsSync(postsDir)) fs.mkdirSync(postsDir);
}

export function getAllPosts(): PostMeta[] {
  ensurePostsDir();
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));

  return files
    .map((filename) => {
      const slug = filename.replace(/\.mdx?$/, "");
      const raw = fs.readFileSync(path.join(postsDir, filename), "utf8");
      const { data, content } = matter(raw);
      const wordCount = content.trim().split(/\s+/).length;
      return {
        slug,
        title: data.title ?? slug,
        date: data.date ? formatDate(data.date) : "",
        description: data.description ?? "",
        tags: Array.isArray(data.tags) ? data.tags : [],
        published: data.published !== false,
        readingTime: Math.max(1, Math.round(wordCount / 200)),
      };
    })
    .filter((p) => p.published)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

const STOP_WORDS = new Set([
  "a","an","the","and","or","but","in","on","at","to","for","of","with",
  "by","from","up","about","into","is","are","was","were","be","been",
  "have","has","had","do","does","did","will","would","could","should",
  "may","might","it","its","i","my","we","you","he","she","they","this",
  "that","these","those","not","so","as","if","when","what","which","who",
  "how","all","more","also","just","get","got","can","one","some","there",
]);

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w));
}

function buildVector(tokens: string[]): Map<string, number> {
  const freq = new Map<string, number>();
  for (const t of tokens) freq.set(t, (freq.get(t) ?? 0) + 1);
  return freq;
}

function cosineSimilarity(a: Map<string, number>, b: Map<string, number>): number {
  let dot = 0, magA = 0, magB = 0;
  for (const [term, val] of a) {
    dot += val * (b.get(term) ?? 0);
    magA += val * val;
  }
  for (const val of b.values()) magB += val * val;
  return magA && magB ? dot / (Math.sqrt(magA) * Math.sqrt(magB)) : 0;
}

function postToText(p: Post): string {
  // Weight title and tags more heavily by repeating them
  return [
    ...Array(4).fill(p.title),
    ...Array(4).fill(p.tags.join(" ")),
    ...Array(2).fill(p.description),
    p.content,
  ].join(" ");
}

export function getRelatedPosts(slug: string, count = 2): PostMeta[] {
  const all = getAllPosts()
    .map((m) => getPost(m.slug))
    .filter((p): p is Post => p !== null);

  const current = all.find((p) => p.slug === slug);
  if (!current) return [];

  const currentVec = buildVector(tokenize(postToText(current)));

  return all
    .filter((p) => p.slug !== slug)
    .map((p) => ({ meta: p, score: cosineSimilarity(currentVec, buildVector(tokenize(postToText(p)))) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map(({ meta }) => ({
      slug: meta.slug,
      title: meta.title,
      date: meta.date,
      description: meta.description,
      tags: meta.tags,
      published: meta.published,
      readingTime: meta.readingTime,
    }));
}

export function getAdjacentPosts(slug: string): { prev: PostMeta | null; next: PostMeta | null } {
  const all = getAllPosts(); // newest-first
  const idx = all.findIndex((p) => p.slug === slug);
  return {
    next: idx > 0 ? all[idx - 1] : null,
    prev: idx < all.length - 1 ? all[idx + 1] : null,
  };
}

export function getPost(slug: string): Post | null {
  ensurePostsDir();
  const mdxPath = path.join(postsDir, `${slug}.mdx`);
  const mdPath = path.join(postsDir, `${slug}.md`);
  const filepath = fs.existsSync(mdxPath) ? mdxPath : mdPath;
  if (!fs.existsSync(filepath)) return null;

  const raw = fs.readFileSync(filepath, "utf8");
  const { data, content } = matter(raw);

  const wordCount = content.trim().split(/\s+/).length;
  const readingTime = Math.max(1, Math.round(wordCount / 200));

  return {
    slug,
    title: data.title ?? slug,
    date: data.date ? formatDate(data.date) : "",
    description: data.description ?? "",
    tags: Array.isArray(data.tags) ? data.tags : [],
    published: data.published !== false,
    content,
    headings: extractHeadings(content),
    readingTime,
  };
}
