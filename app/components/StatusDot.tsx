const config = {
  live: { color: "#22c55e" },
  wip: { color: "#ca8a04" },
  "coming-soon": { color: "#94a3b8" },
} as const;

export default function StatusDot({ status }: { status: keyof typeof config }) {
  const { color } = config[status];

  return (
    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border" style={{ flexShrink: 0 }}>
      <span className="inline-flex rounded-full" style={{ width: 7, height: 7, background: color }} />
      <span style={{ fontSize: "0.65rem" }}>{status}</span>
    </span>
  );
}
