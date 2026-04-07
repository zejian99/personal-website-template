import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center">
      <div className="max-w-2xl mx-auto px-6">
        <p className="text-xs uppercase tracking-widest mb-4">404</p>
        <h1 className="text-4xl font-semibold mb-6">
          You&apos;ve wandered off the map.
        </h1>
        <p className="text-sm mb-10" style={{ lineHeight: "1.7" }}>
          This page doesn&apos;t exist... At least not in this universe.
        </p>
        <div className="flex flex-col gap-3 items-start">
          <Link href="/" className="text-sm underline">
            ← back home
          </Link>
        </div>
      </div>
    </main>
  );
}
