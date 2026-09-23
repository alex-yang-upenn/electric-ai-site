import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

/** Lightning bolt drawn as a keypoint skeleton — the brand mark. */
export function LogoMark({ className }: { className?: string }) {
  const pts = [
    [15, 3],
    [6, 15.5],
    [12.5, 15.5],
    [10, 25],
    [21, 11.5],
    [14.5, 11.5],
    [15, 3],
  ];
  return (
    <svg viewBox="0 0 28 28" className={cn("size-7", className)} aria-hidden>
      <rect x="0.5" y="0.5" width="27" height="27" rx="7" fill="#0b0b0c" stroke="rgb(255 255 255 / 0.14)" />
      <polyline
        points={pts.map((p) => p.join(",")).join(" ")}
        fill="rgb(255 42 42 / 0.18)"
        stroke="#ff2a2a"
        strokeWidth="1.6"
        strokeLinejoin="round"
        className="glow-line"
      />
      {pts.slice(0, -1).map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.35" fill="#fff" />
      ))}
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className="text-[15px] font-semibold tracking-tight text-ink">
        {siteConfig.shortName}
        <span className="ml-1 font-normal text-muted">Labs</span>
      </span>
    </span>
  );
}
