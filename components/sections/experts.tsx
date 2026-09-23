"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useState } from "react";
import { experts } from "@/config/content";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";
import { Accent, SectionHeading } from "@/components/ui/section-heading";
import { DetectionBox } from "@/components/visuals/detection-box";

export function Experts() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section id="approach" className="relative mx-auto max-w-7xl px-4 py-28 sm:px-6 sm:py-36">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-end">
        <SectionHeading
          eyebrow="01 · The insight"
          title={
            <>
              Every expert is a <Accent glow>robot demonstration.</Accent>
            </>
          }
        />
        <Reveal delay={0.1} className="text-lg leading-relaxed text-muted lg:pb-2">
          A mechanic repairing an engine. A chef preparing a meal. A surgeon performing a procedure. These people
          aren&apos;t just doing their jobs —{" "}
          <span className="text-ink">they are generating demonstrations of how to interact with the physical world.</span>
        </Reveal>
      </div>

      <div className="mt-16 grid auto-rows-[340px] grid-cols-1 gap-3 sm:grid-cols-2 lg:auto-rows-[420px] lg:grid-cols-5">
        {experts.map((e, i) => {
          const on = active === e.key;
          return (
            <Reveal key={e.key} delay={i * 0.07} className={cn("h-full", i === 0 && "sm:col-span-2 lg:col-span-1")}>
              <article
                tabIndex={0}
                onMouseEnter={() => setActive(e.key)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(e.key)}
                onBlur={() => setActive(null)}
                onClick={() => setActive(on ? null : e.key)}
                className={cn(
                  "group relative size-full cursor-default overflow-hidden rounded-2xl border bg-surface outline-none transition-all duration-500",
                  on ? "border-accent/60 shadow-[0_0_40px_-8px_rgb(255_42_42/.55)]" : "border-line",
                )}
              >
                <Image
                  src={e.image}
                  alt={`${e.role}: ${e.task}`}
                  fill
                  sizes="(min-width: 1024px) 20vw, (min-width: 640px) 50vw, 100vw"
                  className={cn(
                    "object-cover transition-all duration-700 photo-grade",
                    on ? "scale-105 brightness-90" : "scale-100",
                  )}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10" />
                <div className={cn("absolute inset-0 bg-accent/15 mix-blend-color transition-opacity duration-500", on ? "opacity-100" : "opacity-40")} />

                <DetectionBox box={e.box} label={e.boxLabel} active={on} />

                <div className="absolute left-4 top-4 font-mono text-[10px] tracking-widest text-white/50">
                  0{i + 1} / 05
                </div>

                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="text-2xl font-medium tracking-tight text-ink">{e.role}</h3>
                  <p className="mt-1 text-sm text-muted">{e.task}</p>

                  <motion.div
                    initial={false}
                    animate={{ height: on ? "auto" : 0, opacity: on ? 1 : 0 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <ol className="mt-4 flex flex-col gap-1.5 border-t border-white/10 pt-3 font-mono text-[11px]">
                      {e.demo.map((step, j) => (
                        <li key={step} className="flex items-center gap-2 text-white/80">
                          <span className="text-accent">{String(j + 1).padStart(2, "0")}</span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </motion.div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
      <p className="mt-4 text-center font-mono text-[11px] text-faint lg:text-left">Hover a card to see the demonstration it contains.</p>
    </section>
  );
}
