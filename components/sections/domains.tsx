import { domains } from "@/config/content";

export function Domains() {
  const items = [...domains, ...domains];
  return (
    <section aria-label="Domains we learn from" className="relative border-y border-line bg-surface/40 py-7">
      <p className="mb-5 text-center font-mono text-[11px] uppercase tracking-[0.22em] text-faint">
        Learning from experts across
      </p>
      <div className="mask-fade-x overflow-hidden">
        <ul className="flex w-max animate-marquee items-center gap-10 hover:[animation-play-state:paused]">
          {items.map((d, i) => (
            <li key={i} className="flex items-center gap-10 whitespace-nowrap text-lg font-medium tracking-tight text-white/55 sm:text-xl">
              {d}
              <span className="size-1.5 rotate-45 bg-accent/80" aria-hidden />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
