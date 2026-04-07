import { ImageResponse } from "next/og";
import { projects } from "@/lib/projects";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";
export const alt = "Projects — Ze Jian";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const statusLabel: Record<string, string> = {
  live: "live",
  wip: "in progress",
  "coming-soon": "soon",
};

export default async function Image() {
  const circularBook = fs.readFileSync(
    path.join(process.cwd(), "public/fonts/CircularStdBook.otf")
  );
  const circularBold = fs.readFileSync(
    path.join(process.cwd(), "public/fonts/Circular_Std_Font.ttf")
  );
  const portraitData = fs.readFileSync(path.join(process.cwd(), "public/portrait.JPG"));
  const portraitSrc = `data:image/jpeg;base64,${portraitData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "#fffdfa",
          display: "flex",
          flexDirection: "column",
          padding: "64px 72px",
          fontFamily: "CircularStd",
          position: "relative",
        }}
      >
        {/* Left accent bar */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: "6px",
            background: "#7a5018",
          }}
        />

        {/* Portrait */}
        <img
          src={portraitSrc}
          alt=""
          style={{
            position: "absolute",
            top: "56px",
            right: "72px",
            width: "160px",
            height: "160px",
            borderRadius: "50%",
            objectFit: "cover",
            border: "3px solid #e2cdb0",
          }}
        />

        {/* Label */}
        <div
          style={{
            fontSize: "13px",
            color: "#936a25",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: "20px",
            display: "flex",
          }}
        >
          zejiantan.com
        </div>

        {/* Title */}
        <div
          style={{
            fontFamily: "serif",
            fontSize: "64px",
            fontWeight: 700,
            color: "#2a1a08",
            lineHeight: 1.1,
            marginBottom: "36px",
            display: "flex",
          }}
        >
          Projects
        </div>

        {/* Project list */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", flex: 1 }}>
          {projects.map((project) => (
            <div key={project.slug} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ fontSize: "18px", color: "#2a1a08", fontWeight: 500 }}>
                  {project.title}
                </span>
                <span
                  style={{
                    fontSize: "11px",
                    color: "#936a25",
                    border: "1px solid #e2cdb0",
                    borderRadius: "4px",
                    padding: "2px 8px",
                    background: "#f5ede0",
                  }}
                >
                  {statusLabel[project.status]}
                </span>
              </div>
              <span style={{ fontSize: "14px", color: "#936a25" }}>{project.description}</span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "24px",
            borderTop: "1px solid #e2cdb0",
          }}
        >
          <span style={{ fontSize: "15px", color: "#936a25" }}>Things I&apos;ve built</span>
          <span style={{ fontSize: "15px", color: "#936a25", fontWeight: 500 }}>
            zejiantan.com
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "CircularStd", data: circularBook, weight: 400 },
        { name: "CircularStd", data: circularBold, weight: 700 },
      ],
    }
  );
}
