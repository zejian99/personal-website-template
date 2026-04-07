export type Project = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  href?: string;       // external link or internal page (e.g. "/projects/foo")
  status: "live" | "wip" | "coming-soon";
};

export const projects: Project[] = [
  {
    slug: "personal-website",
    title: "Personal Website",
    description: "This site — built with Next.js, MDX, and Tailwind CSS.",
    tags: ["next.js", "mdx", "tailwind"],
    href: "https://github.com/yourusername/personal-website-template",
    status: "live",
  },
  {
    slug: "project-two",
    title: "Project Two",
    description: "Placeholder: describe what this project does and why you built it.",
    tags: ["example", "placeholder"],
    status: "wip",
  },
  {
    slug: "project-three",
    title: "Project Three",
    description: "Placeholder: another project you're working on or have shipped.",
    tags: ["example"],
    status: "coming-soon",
  },
];
