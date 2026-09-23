"use client";

import { Activity, Bot, Database, Film, ListTree, ScanEye, type LucideIcon } from "lucide-react";
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { useRef, useState } from "react";
import { pipeline } from "@/config/content";
import { cn } from "@/lib/utils";
import { Accent, SectionHeading } from "@/components/ui/section-heading";

const icons: LucideIcon[] = [Film, ScanEye, ListTree, Activity, Database, Bot];
const N = pipeline.length;

export function Pipeline() {
  return (
    <section id="pipeline" className="relative">
      <DesktopPipeline />
      <MobilePipeline />
    </section>
  );
}

function useActiveIndex(progress: MotionValue<number>) {
  const [active, setActive] = useState(-1);
  useMotionValueEvent(progress, "change", (v) => {
    const idx = v <= 0.01 ? -1 : Math.min(N - 1, Math.floor(v * (N - 1) + 0.08));
    setActive(idx);
  });
  return active;
}

function DesktopPipeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progress = useSpring(useTransform(scrollYProgress, [0.08, 0.85], [0, 1], { clamp: true }), {
    stiffness: 120,
    damping: 24,
  });
  const active = useActiveIndex(progress);
  const width = useTransform(progress, (v) => `${v * 100}%`);

  return (
    <div ref={ref} className="relative hidden h-[240vh] lg:block">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_60%,rgb(255_42_42/.12),transparent)]" />
        <div className="relative mx-auto w-full max-w-7xl px-6">
          <SectionHeading
            eyebrow="03 · The pipeline"
            title={
              <>
                From video to <Accent glow>robot intelligence.</Accent>
              </>
            }
            description="We turn unstructured video into the building blocks of robot learning."
          />

          <div className="relative mt-20">
            {/* track */}
            <div className="absolute left-[calc((100%-80px)/12)] right-[calc((100%-80px)/12)] top-5 h-px bg-white/10">
              <motion.div style={{ width }} className="relative h-full bg-gradient-to-r from-accent-deep via-accent to-accent shadow-[0_0_14px_#ff2a2a]">
                <span className="absolute -right-1.5 -top-1.5 size-3 rounded-full bg-white shadow-[0_0_16px_4px_rgb(255_42_42/.9)]" />
              </motion.div>
            </div>

            <ol className="relative grid grid-cols-6 gap-4">
              {pipeline.map((step, i) => {
                const Icon = icons[i];
                const on = i <= active;
                return (
                  <li key={step.title} className="flex flex-col items-center text-center">
                    <span
                      className={cn(
                        "relative z-10 flex size-10 items-center justify-center rounded-full border font-mono text-xs transition-all duration-500",
                        on
                          ? "border-accent bg-accent text-white shadow-[0_0_0_6px_rgb(255_42_42/.15),0_0_30px_rgb(255_42_42/.8)]"
                          : "border-line-strong bg-bg text-faint",
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div
                      className={cn(
                        "mt-8 flex w-full flex-1 flex-col items-center rounded-2xl border p-5 transition-all duration-700",
                        on ? "border-accent/40 bg-surface-2 shadow-[0_20px_60px_-20px_rgb(255_42_42/.45)]" : "border-line bg-surface/40",
                        i === active && "-translate-y-2",
                      )}
                    >
                      <Icon className={cn("size-6 transition-colors duration-500", on ? "text-accent" : "text-white/30")} strokeWidth={1.5} />
                      <h3 className={cn("mt-4 text-[15px] font-medium tracking-tight transition-colors", on ? "text-ink" : "text-white/45")}>
                        {step.title}
                      </h3>
                      <p className={cn("mt-2 text-[13px] leading-relaxed transition-colors", on ? "text-muted" : "text-white/25")}>{step.body}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobilePipeline() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 26 });
  const active = useActiveIndex(progress);
  const height = useTransform(progress, (v) => `${v * 100}%`);

  return (
    <div className="px-4 py-28 sm:px-6 lg:hidden">
      <SectionHeading
        eyebrow="03 · The pipeline"
        title={
          <>
            From video to <Accent glow>robot intelligence.</Accent>
          </>
        }
        description="We turn unstructured video into the building blocks of robot learning."
      />
      <div className="relative mt-14">
        <div className="absolute bottom-5 left-5 top-5 w-px bg-white/10">
          <motion.div style={{ height }} className="w-full bg-gradient-to-b from-accent-deep to-accent shadow-[0_0_12px_#ff2a2a]" />
        </div>
      <ol ref={ref} className="relative flex flex-col gap-6 pl-14">
        {pipeline.map((step, i) => {
          const Icon = icons[i];
          const on = i <= active;
          return (
            <li key={step.title} className="relative">
              <span
                className={cn(
                  "absolute -left-14 top-3 flex size-10 items-center justify-center rounded-full border font-mono text-xs transition-all duration-500",
                  on ? "border-accent bg-accent text-white shadow-[0_0_24px_rgb(255_42_42/.8)]" : "border-line-strong bg-bg text-faint",
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className={cn("rounded-2xl border p-5 transition-all duration-500", on ? "border-accent/40 bg-surface-2" : "border-line bg-surface/40")}>
                <div className="flex items-center gap-3">
                  <Icon className={cn("size-5", on ? "text-accent" : "text-white/30")} strokeWidth={1.5} />
                  <h3 className="text-base font-medium tracking-tight">{step.title}</h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
              </div>
            </li>
          );
        })}
      </ol>
      </div>
    </div>
  );
}
