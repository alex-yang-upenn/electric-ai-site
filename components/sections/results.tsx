"use client";

import * as Tooltip from "@radix-ui/react-tooltip";
import { Info } from "lucide-react";
import { motion } from "motion/react";
import { results } from "@/config/content";
import { Counter } from "@/components/ui/counter";
import { Reveal } from "@/components/ui/reveal";
import { Accent, SectionHeading } from "@/components/ui/section-heading";

export function Results() {
  const { benchmark } = results;
  return (
    <section id="results" className="relative border-y border-line bg-surface/30 py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="07 · Early results"
          title={
            <>
              Early signal from our <Accent glow>prototype pipeline.</Accent>
            </>
          }
          description="We're early. These are preliminary numbers from an internal pilot — small, honest, and improving every week."
        />

        <Tooltip.Provider delayDuration={80}>
          <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-4">
            {results.stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.07} className="relative bg-bg p-6 sm:p-8">
                <div className="text-4xl font-medium tracking-[-0.04em] text-ink sm:text-5xl">
                  <Counter value={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-3 flex items-start gap-1.5 text-sm text-muted">
                  <span>{s.label}</span>
                  <Tooltip.Root>
                    <Tooltip.Trigger aria-label={`About: ${s.label}`} className="mt-0.5 shrink-0 text-faint transition-colors hover:text-accent">
                      <Info className="size-3.5" />
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Content
                        sideOffset={6}
                        className="z-50 max-w-60 rounded-md border border-line-strong bg-black/90 px-2.5 py-1.5 font-mono text-[11px] text-ink shadow-xl backdrop-blur animate-in fade-in-0 zoom-in-95"
                      >
                        {s.note}
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  </Tooltip.Root>
                </div>
              </Reveal>
            ))}
          </div>

          {/* benchmark chart */}
          <Reveal className="mt-3 rounded-2xl border border-line bg-bg p-6 sm:p-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h3 className="text-base font-medium tracking-tight text-ink">{benchmark.title}</h3>
                <p className="mt-1 font-mono text-[11px] text-faint">score, 0–100 · higher is better · preliminary</p>
              </div>
              <div className="flex flex-wrap items-center gap-5 text-xs text-muted">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-4 rounded-sm bg-accent" /> {benchmark.ours}
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-2 w-4 rounded-sm bg-[#8a8a8f]" /> {benchmark.baseline}
                </span>
              </div>
            </div>

            <div className="relative mt-8">
              {/* recessive gridlines */}
              <div className="pointer-events-none absolute inset-y-0 left-0 right-12 hidden sm:left-[228px] sm:block">
                {[0, 25, 50, 75, 100].map((g) => (
                  <div key={g} className="absolute inset-y-0 w-px bg-white/[0.06]" style={{ left: `${g}%` }}>
                    <span className="absolute -bottom-5 -translate-x-1/2 font-mono text-[9px] text-faint">{g}</span>
                  </div>
                ))}
              </div>

              <div className="relative flex flex-col gap-6">
                {benchmark.rows.map((r, i) => (
                  <div key={r.metric} className="grid gap-2 sm:grid-cols-[220px_1fr] sm:items-center">
                    <span className="text-sm text-ink">{r.metric}</span>
                    <div className="flex flex-col gap-1.5">
                      <BenchBar value={r.ours} tone="accent" delay={i * 0.1} tip={`${benchmark.ours} · ${r.metric}: ${r.ours}`} />
                      <BenchBar value={r.baseline} tone="gray" delay={i * 0.1 + 0.08} tip={`${benchmark.baseline} · ${r.metric}: ${r.baseline}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-10 font-mono text-[11px] leading-relaxed text-faint">
              Internal evaluation on 150 held-out egocentric clips across 6 task domains. Baseline: a general-purpose
              vision-language model prompted zero-shot. Results are preliminary and not peer-reviewed.
            </p>
          </Reveal>
        </Tooltip.Provider>
      </div>
    </section>
  );
}

function BenchBar({ value, tone, delay, tip }: { value: number; tone: "accent" | "gray"; delay: number; tip: string }) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <div tabIndex={0} className="group flex h-5 cursor-default items-center gap-3 outline-none">
          <div className="relative h-2.5 flex-1">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${value}%` }}
              viewport={{ once: true, margin: "0px 0px -60px 0px" }}
              transition={{ duration: 1.3, delay, ease: [0.16, 1, 0.3, 1] }}
              className={
                "h-full rounded-r-[4px] transition-[filter] group-hover:brightness-125 " +
                (tone === "accent" ? "bg-accent shadow-[0_0_14px_rgb(255_42_42/.55)]" : "bg-[#8a8a8f]")
              }
            />
          </div>
          <span className={"w-9 text-right font-mono text-xs tabular-nums " + (tone === "accent" ? "text-ink" : "text-muted")}>
            {value}
          </span>
        </div>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          sideOffset={6}
          className="z-50 rounded-md border border-line-strong bg-black/90 px-2.5 py-1.5 font-mono text-[11px] text-ink shadow-xl backdrop-blur animate-in fade-in-0 zoom-in-95"
        >
          {tip}
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}
