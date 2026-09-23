import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-muted",
        className,
      )}
    >
      <span className="relative flex size-1.5">
        <span className="absolute inset-0 animate-pulse-ring rounded-full bg-accent" />
        <span className="relative size-1.5 rounded-full bg-accent" />
      </span>
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "flex max-w-3xl flex-col gap-5",
        align === "center" && "mx-auto items-center text-center",
        className,
      )}
    >
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="text-balance text-4xl font-medium leading-[1.05] tracking-[-0.035em] text-ink sm:text-5xl md:text-6xl">
        {title}
      </h2>
      {description && <p className="max-w-2xl text-pretty text-lg leading-relaxed text-muted">{description}</p>}
    </Reveal>
  );
}

/** Serif italic accent word inside a headline. */
export function Accent({ children, glow = false }: { children: React.ReactNode; glow?: boolean }) {
  return (
    <span className={cn("font-serif font-normal italic tracking-[-0.01em]", glow ? "text-accent glow-text" : "text-white")}>
      {children}
    </span>
  );
}
