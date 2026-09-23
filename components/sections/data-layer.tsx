"use client";

import Image from "next/image";
import * as Tooltip from "@radix-ui/react-tooltip";
import { Check, Minus } from "lucide-react";
import { motion } from "motion/react";
import { comparison } from "@/config/content";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";
import { Accent, SectionHeading } from "@/components/ui/section-heading";

export function DataLayer() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-28 sm:px-6 sm:py-36">
      <SectionHeading
        eyebrow="04 · The data layer for physical AI"
        title={
          <>
            Robots shouldn&apos;t have to generate <Accent glow>all their own</Accent> training data.
          </>
        }
        description="Instead of asking robots to collect every demonstration themselves, we learn from the humans who already know how to do the work."
      />

      <div className="mt-16 grid gap-3 lg:grid-cols-2">
        {/* robot side */}
        <Reveal className="relative overflow-hidden rounded-2xl border border-line bg-surface p-8">
          <div className="absolute inset-y-0 right-0 w-1/2 opacity-30">
            <Image src="/images/robot-hand.jpg" alt="" fill sizes="30vw" className="object-cover grayscale mask-fade-x" />
          </div>
          <div className="relative">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">Today</span>
            <h3 className="mt-3 text-2xl font-medium tracking-tight text-white/70">{comparison.robot.title}</h3>
            <ul className="mt-8 flex flex-col gap-4">
              {comparison.robot.points.map((p) => (
                <li key={p} className="flex items-center gap-3 text-white/55">
                  <span className="flex size-6 items-center justify-center rounded-full border border-line-strong">
                    <Minus className="size-3.5" />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* human side */}
        <Reveal delay={0.1} className="relative overflow-hidden rounded-2xl border border-accent/40 bg-gradient-to-br from-accent/[0.14] via-surface to-surface p-8 shadow-[0_30px_80px_-30px_rgb(255_42_42/.5)]">
          <div className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-accent/25 blur-3xl" />
          <div className="relative">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">What we&apos;re building</span>
            <h3 className="mt-3 text-2xl font-medium tracking-tight text-ink">{comparison.human.title}</h3>
            <ul className="mt-8 flex flex-col gap-4">
              {comparison.human.points.map((p) => (
                <li key={p} className="flex items-center gap-3 text-ink">
                  <span className="flex size-6 items-center justify-center rounded-full bg-accent text-white shadow-[0_0_14px_rgb(255_42_42/.7)]">
                    <Check className="size-3.5" strokeWidth={3} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      {/* comparison bars */}
      <Reveal className="mt-3 rounded-2xl border border-line bg-surface/60 p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h3 className="text-sm font-medium text-ink">Order-of-magnitude comparison</h3>
          <div className="flex items-center gap-5 text-xs text-muted">
            <span className="flex items-center gap-2">
              <span className="h-2 w-4 rounded-sm bg-accent" /> Human expert video
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2 w-4 rounded-sm bg-[#8a8a8f]" /> Robot teleoperation
            </span>
          </div>
        </div>

        <Tooltip.Provider delayDuration={80}>
          <div className="mt-8 flex flex-col gap-8">
            {comparison.bars.map((b, i) => (
              <div key={b.metric} className="grid gap-3 sm:grid-cols-[220px_1fr] sm:items-center">
                <div>
                  <div className="text-sm text-ink">{b.metric}</div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-faint">
                    {b.lowerIsBetter ? "lower is better" : "higher is better"}
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <Bar value={b.human} label={b.humanLabel} tone="accent" delay={i * 0.12} tip={`Human expert video · ${b.metric}: ${b.humanLabel}`} />
                  <Bar value={b.robot} label={b.robotLabel} tone="gray" delay={i * 0.12 + 0.08} tip={`Robot teleoperation · ${b.metric}: ${b.robotLabel}`} />
                </div>
              </div>
            ))}
          </div>
        </Tooltip.Provider>
        <p className="mt-8 font-mono text-[11px] leading-relaxed text-faint">
          Illustrative estimates from public reporting and our own early pilots. Not a guarantee of future performance.
        </p>
      </Reveal>
    </section>
  );
}

function Bar({
  value,
  label,
  tone,
  delay,
  tip,
}: {
  value: number;
  label: string;
  tone: "accent" | "gray";
  delay: number;
  tip: string;
}) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <div className="group flex h-6 cursor-default items-center gap-3 outline-none" tabIndex={0}>
          <div className="relative h-2.5 flex-1">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${Math.max(value, 1.5)}%` }}
              viewport={{ once: true, margin: "0px 0px -60px 0px" }}
              transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                "h-full rounded-r-[4px] transition-[filter] group-hover:brightness-125",
                tone === "accent" ? "bg-accent shadow-[0_0_14px_rgb(255_42_42/.6)]" : "bg-[#8a8a8f]",
              )}
            />
          </div>
          <span className={cn("w-20 shrink-0 text-right font-mono text-xs tabular-nums", tone === "accent" ? "text-ink" : "text-muted")}>
            {label}
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
