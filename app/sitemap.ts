import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `https://yoursite.com/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    { url: "https://yoursite.com", lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: "https://yoursite.com/blog", lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: "https://yoursite.com/projects", lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: "https://yoursite.com/now", lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    ...postEntries,
  ];
}
