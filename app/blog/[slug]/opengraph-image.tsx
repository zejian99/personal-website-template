import { ImageResponse } from "next/og";
import { getPost } from "@/lib/posts";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";
export const alt = "Blog post";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return new Response("Not found", { status: 404 });

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
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            objectFit: "cover",
            border: "3px solid #e2cdb0",
          }}
        />

        {/* Tags */}
        {post.tags.length > 0 && (
          <div style={{ display: "flex", gap: "8px", marginBottom: "28px" }}>
            {post.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: "13px",
                  color: "#936a25",
                  border: "1px solid #e2cdb0",
                  borderRadius: "4px",
                  padding: "3px 10px",
                  background: "#f5ede0",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <div
          style={{
            fontFamily: "serif",
            fontSize: post.title.length > 60 ? "48px" : "58px",
            fontWeight: 700,
            color: "#2a1a08",
            lineHeight: 1.15,
            flex: 1,
            display: "flex",
            alignItems: "flex-start",
          }}
        >
          {post.title}
        </div>

        {/* Description */}
        {post.description && (
          <div
            style={{
              fontSize: "20px",
              color: "#7a5018",
              marginTop: "20px",
              lineHeight: 1.5,
              maxWidth: "900px",
              display: "flex",
            }}
          >
            {post.description}
          </div>
        )}

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "40px",
            paddingTop: "24px",
            borderTop: "1px solid #e2cdb0",
          }}
        >
          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            {post.date && (
              <span style={{ fontSize: "15px", color: "#936a25" }}>{post.date}</span>
            )}
            {post.date && (
              <span style={{ fontSize: "15px", color: "#e2cdb0" }}>·</span>
            )}
            <span style={{ fontSize: "15px", color: "#936a25" }}>
              {post.readingTime} min read
            </span>
          </div>
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
