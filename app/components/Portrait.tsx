"use client";

import Image from "next/image";
import { useState } from "react";

export default function Portrait() {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden shrink-0 relative border bg-gray-100">
      <div
        className={`absolute inset-0 flex items-center justify-center ${!loaded && !error ? "animate-pulse" : ""}`}
        style={{ opacity: loaded ? 0 : 1, transition: "opacity 0.3s ease" }}
      >
        <span className="text-xl font-medium">YN</span>
      </div>

      {!error && (
        <Image
          src="/portrait.jpg"
          alt="Portrait"
          width={128}
          height={128}
          className="object-cover w-full h-full"
          style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.3s ease" }}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          unoptimized
        />
      )}
    </div>
  );
}
