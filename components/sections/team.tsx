import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { mailto, siteConfig } from "@/config/site";
import { initials } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";
import { Accent, SectionHeading } from "@/components/ui/section-heading";
import { LinkedInIcon } from "@/components/ui/brand-icons";

export function Team() {
  return (
    <section id="team" className="relative mx-auto max-w-7xl px-4 py-28 sm:px-6 sm:py-36">
      <SectionHeading
        eyebrow="08 · Team"
        title={
          <>
            A small team, <Accent glow>obsessed with physical AI.</Accent>
          </>
        }
        description="A technical founding team working at the intersection of computer vision, human motion and robot learning."
      />

      <div className="mt-16 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {siteConfig.founders.map((f, i) => (
          <Reveal key={`${f.name}-${i}`} delay={i * 0.08}>
            <article className="group relative h-full overflow-hidden rounded-2xl border border-line bg-surface p-6 transition-colors duration-500 hover:border-accent/40">
              <div className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-accent/0 blur-3xl transition-colors duration-700 group-hover:bg-accent/20" />
              <div className="relative flex items-center gap-4">
                <div className="relative size-16 shrink-0 overflow-hidden rounded-full border border-line-strong bg-gradient-to-br from-accent/40 to-accent-deep/20">
                  {f.image ? (
                    <Image src={f.image} alt={f.name} fill sizes="64px" className="object-cover grayscale" />
                  ) : (
                    <span className="flex size-full items-center justify-center text-lg font-medium text-white">
                      {initials(f.name)}
                    </span>
                  )}
                </div>
                <div className="min-w-0">
                  <h3 className="truncate text-lg font-medium tracking-tight">{f.name}</h3>
                  <p className="font-mono text-[11px] uppercase tracking-widest text-accent">{f.role}</p>
                </div>
                {f.linkedin && (
                  <a
                    href={f.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${f.name} on LinkedIn`}
                    className="ml-auto flex size-9 items-center justify-center rounded-full border border-line-strong text-muted transition-colors hover:border-accent hover:text-ink"
                  >
                    <LinkedInIcon className="size-4" />
                  </a>
                )}
              </div>
              <p className="relative mt-5 text-sm leading-relaxed text-muted">{f.bio}</p>
            </article>
          </Reveal>
        ))}

        <Reveal delay={siteConfig.founders.length * 0.08}>
          <a
            href={mailto("Joining ElectricAI Labs")}
            className="group flex h-full min-h-[168px] flex-col justify-between rounded-2xl border border-dashed border-line-strong p-6 transition-colors duration-500 hover:border-accent/60 hover:bg-accent/[0.04]"
          >
            <span className="font-mono text-[11px] uppercase tracking-widest text-faint">We&apos;re hiring</span>
            <span className="flex items-end justify-between gap-4">
              <span className="text-lg font-medium tracking-tight">
                Research engineers in vision, 3D & robot learning
              </span>
              <ArrowUpRight className="size-5 shrink-0 text-accent transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
