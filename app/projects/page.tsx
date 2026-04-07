import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/lib/projects";
import StatusDot from "@/app/components/StatusDot";

export const metadata: Metadata = {
  title: "Projects",
  description: "Things I've built.",
  openGraph: { type: "website", url: "https://yoursite.com/projects" },
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen">
      <div className="max-w-2xl mx-auto px-6 py-16 md:py-24">

        <div className="flex justify-between items-center mb-10">
          <Link href="/" className="text-xs underline">← back</Link>
        </div>

        <h1 className="text-3xl font-semibold mb-10">Projects</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {projects.map((project) => {
            const card = (
              <div className="flex flex-col gap-3 p-5 h-full border">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-sm">{project.title}</span>
                  <div className="flex items-center gap-2">
                    {project.href && <span className="text-xs">→</span>}
                    <StatusDot status={project.status} />
                  </div>
                </div>
                {project.description && (
                  <p className="text-xs leading-relaxed flex-1">{project.description}</p>
                )}
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs px-1.5 py-0.5 rounded border">
                      {tag}
                    </span>
                  ))}
                </div>
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

      </div>
    </main>
  );
}
