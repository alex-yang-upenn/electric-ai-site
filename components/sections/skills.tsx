"use client";

import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { skillSteps, skillVerbs } from "@/config/content";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";
import { Accent, SectionHeading } from "@/components/ui/section-heading";

/** Gantt rows: [startStep, endStep] blocks per actor (inclusive, in step indices). */
const TRACKS: { name: string; blocks: [number, number, string][] }[] = [
  { name: "gaze", blocks: [[0, 0, "fixate"], [3, 3, "track"], [5, 5, "inspect"]] },
  { name: "hand_R", blocks: [[1, 1, "reach"], [2, 2, "grasp"], [3, 4, "position · torque"], [6, 6, "release"]] },
  { name: "hand_L", blocks: [[3, 5, "stabilize part"]] },
  { name: "tool", blocks: [[2, 4, "screwdriver_PH2"], [5, 5, "✓"]] },
];

export function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const [step, setStep] = useState(-1);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setStep(Math.min(skillSteps.length - 1, Math.floor(v * skillSteps.length)));
  });

  return (
    <section id="vision" className="relative overflow-hidden border-y border-line bg-surface/30 py-28 sm:py-36">
      <div className="pointer-events-none absolute -left-40 top-1/3 size-[520px] rounded-full bg-accent/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="05 · The vision"
          title={
            <>
              Millions of hours. <Accent glow>Thousands of skills.</Accent>
            </>
          }
          description="The long-term vision is a foundational dataset of human interaction with the physical world — not captions, but complete, grounded procedures."
        />

        <div ref={ref} className="mt-16 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div className="flex flex-col gap-8">
            <Reveal>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">Not just</span>
              <p className="mt-3 text-2xl tracking-tight text-white/35 line-through decoration-accent/60 decoration-2 sm:text-3xl">
                &ldquo;A person is holding a screwdriver.&rdquo;
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">But</span>
              <p className="mt-3 text-2xl leading-snug tracking-tight sm:text-3xl">
                <span className="text-ink">&ldquo;A person </span>
                {skillSteps.map((s, i) => (
                  <span key={s}>
                    <span
                      className={cn(
                        "transition-all duration-500",
                        i <= step ? "text-ink" : "text-white/20",
                        i === step && "text-accent glow-text",
                      )}
                    >
                      {s}
                    </span>
                    <span className={cn("transition-colors duration-500", i <= step ? "text-ink" : "text-white/20")}>
                      {i < skillSteps.length - 2 ? ", " : i === skillSteps.length - 2 ? ", and " : ".”"}
                    </span>
                  </span>
                ))}
              </p>
            </Reveal>
          </div>

          {/* action timeline */}
          <Reveal delay={0.15} className="self-center rounded-2xl border border-line-strong bg-black/50 p-5 backdrop-blur sm:p-6">
            <div className="mb-5 flex items-center justify-between font-mono text-[11px] text-faint">
              <span>action_graph · fasten_panel</span>
              <span className="tabular-nums text-accent">
                step {Math.max(step + 1, 0)}/{skillSteps.length}
              </span>
            </div>
            <div className="relative flex flex-col gap-2.5">
              <div className="pointer-events-none absolute inset-y-0 left-[76px] right-0 z-10">
                <motion.span
                  className="absolute inset-y-0 w-px bg-white shadow-[0_0_8px_#ff2a2a]"
                  animate={{ left: `${((Math.max(step, 0) + 0.5) / skillSteps.length) * 100}%`, opacity: step >= 0 ? 0.9 : 0 }}
                  transition={{ type: "spring", stiffness: 140, damping: 22 }}
                />
              </div>
              {TRACKS.map((t) => (
                <div key={t.name} className="grid grid-cols-[64px_1fr] items-center gap-3">
                  <span className="font-mono text-[11px] text-muted">{t.name}</span>
                  <div className="relative h-7 rounded-md bg-white/[0.04]">
                    {t.blocks.map(([a, b, label]) => {
                      const on = step >= a;
                      const current = step >= a && step <= b;
                      return (
                        <div
                          key={label}
                          className={cn(
                            "absolute inset-y-0.5 flex items-center overflow-hidden rounded px-1.5 font-mono text-[10px] transition-all duration-500",
                            current
                              ? "bg-accent text-white shadow-[0_0_16px_rgb(255_42_42/.7)]"
                              : on
                                ? "bg-accent/30 text-white/80"
                                : "bg-white/[0.06] text-white/25",
                          )}
                          style={{
                            left: `calc(${(a / skillSteps.length) * 100}% + 1px)`,
                            width: `calc(${((b - a + 1) / skillSteps.length) * 100}% - 2px)`,
                          }}
                        >
                          <span className="truncate">{label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
              {/* time axis */}
              <div className="grid grid-cols-[64px_1fr] gap-3">
                <span />
                <div className="mt-1 grid text-center font-mono text-[9px] text-faint" style={{ gridTemplateColumns: `repeat(${skillSteps.length}, 1fr)` }}>
                  {skillSteps.map((_, i) => (
                    <span key={i} className={cn(i === step && "text-accent")}>t{i}</span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <VerbTicker />
      </div>
    </section>
  );
}

function VerbTicker() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setI((v) => (v + 1) % skillVerbs.length), 1400);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <Reveal className="mt-24 flex flex-col items-center gap-6 text-center">
      <p className="text-balance text-lg text-muted">At scale, these trajectories become a library of reusable physical skills.</p>
      <div className="relative flex h-[1.15em] items-center justify-center overflow-hidden text-6xl font-medium tracking-[-0.04em] sm:text-8xl">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={skillVerbs[i]}
            initial={{ y: "100%", opacity: 0, filter: "blur(8px)" }}
            animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
            exit={{ y: "-100%", opacity: 0, filter: "blur(8px)" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif italic text-accent glow-text"
          >
            {skillVerbs[i]}.
          </motion.span>
        </AnimatePresence>
      </div>
      <div className="flex max-w-3xl flex-wrap justify-center gap-2">
        {skillVerbs.map((v, j) => (
          <span
            key={v}
            className={cn(
              "rounded-full border px-3 py-1 font-mono text-[11px] transition-all duration-300",
              j === i ? "border-accent bg-accent/15 text-ink" : "border-line text-faint",
            )}
          >
            {v.toLowerCase().replace(" ", "_")}()
          </span>
        ))}
      </div>
    </Reveal>
  );
}
