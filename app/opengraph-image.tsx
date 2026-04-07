import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";
export const alt = "Ze Jian";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            objectFit: "cover",
            border: "3px solid #e2cdb0",
          }}
        />

        {/* Name */}
        <div
          style={{
            fontFamily: "serif",
            fontSize: "72px",
            fontWeight: 700,
            color: "#2a1a08",
            lineHeight: 1.1,
            marginTop: "auto",
            marginBottom: "12px",
            display: "flex",
          }}
        >
          Ze Jian
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: "22px",
            color: "#7a5018",
            marginBottom: "auto",
            display: "flex",
          }}
        >
          Learning to build agents
        </div>

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
          <span style={{ fontSize: "15px", color: "#936a25" }}>
            Based in Singapore · building in public
          </span>
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
