"use client";

import { ArrowDown, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { mailto } from "@/config/site";
import { heroStats } from "@/config/content";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/section-heading";
import { HeroViewer } from "@/components/visuals/hero-viewer";
import { ParticleField } from "@/components/visuals/particle-field";

const ease = [0.16, 1, 0.3, 1] as const;

const headline: { w: string; accent?: boolean }[] = [
  { w: "The" },
  { w: "world's" },
  { w: "experts" },
  { w: "are" },
  { w: "already", accent: true },
  { w: "generating" },
  { w: "the" },
  { w: "data" },
  { w: "robots" },
  { w: "need." },
];

export function Hero() {
  const viewerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: viewerRef, offset: ["start end", "center center"] });
  const rotateX = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [22, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [0.9, 1]);
  const glow = useTransform(scrollYProgress, [0, 1], [0.2, 0.9]);

  return (
    <section id="top" className="relative overflow-hidden pt-36 sm:pt-44">
      {/* backdrop */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-grid mask-radial opacity-60" />
        <div className="absolute left-1/2 top-[-20%] h-[720px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(255_42_42/.28),transparent)] blur-2xl" />
        <div className="absolute left-1/2 top-[8%] h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(179_0_27/.35),transparent)] blur-3xl" />
      </div>
      <ParticleField className="absolute inset-0 h-[900px] mask-fade-b" />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-4 text-center sm:px-6">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}>
          <span className="inline-flex items-center gap-3 rounded-full border border-line-strong bg-white/[0.03] py-1.5 pl-3 pr-4 backdrop-blur">
            <Eyebrow className="text-[10px] tracking-[0.18em] text-ink/80">ElectricAI Labs</Eyebrow>
            <span className="h-3 w-px bg-white/15" />
            <span className="text-xs text-muted">The data layer for physical AI</span>
          </span>
        </motion.div>

        <h1 className="mt-8 max-w-5xl text-balance text-[2.6rem] font-medium leading-[1.02] tracking-[-0.045em] text-ink sm:text-6xl md:text-7xl lg:text-[5.4rem]">
          {headline.map(({ w, accent }, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.9, delay: 0.15 + i * 0.06, ease }}
            >
              {accent ? (
                <span className="font-serif font-normal italic tracking-[-0.02em] text-accent glow-text">{w}</span>
              ) : (
                w
              )}
              {i < headline.length - 1 && " "}
            </motion.span>
          ))}
        </h1>

        <motion.p
          className="mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-muted sm:text-xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.85, ease }}
        >
          We turn real-world, first-person video of experts at work into structured, robot-ready training data —
          hands, tools, actions and 3D trajectories.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1, ease }}
        >
          <ButtonLink href={mailto("Partnering with ElectricAI Labs")} className="h-12 px-6 text-[15px]">
            Partner with us
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </ButtonLink>
          <ButtonLink href="#approach" variant="ghost" className="h-12 px-6 text-[15px]">
            See how it works
            <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" />
          </ButtonLink>
        </motion.div>

        <motion.dl
          className="mt-14 grid w-full max-w-3xl grid-cols-3 divide-x divide-line border-y border-line"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          {heroStats.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1 px-2 py-5">
              <dt className="order-2 max-w-[18ch] text-[11px] leading-snug text-faint sm:text-xs">{s.label}</dt>
              <dd className="order-1 text-2xl font-medium tracking-tight text-ink sm:text-3xl">{s.value}</dd>
            </div>
          ))}
        </motion.dl>
      </div>

      <div className="relative mx-auto mt-16 max-w-6xl px-4 pb-24 [perspective:1600px] sm:px-6 sm:pb-32">
        <motion.div
          ref={viewerRef}
          style={{ rotateX, scale, transformOrigin: "50% 0%" }}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.9, ease }}
          className="relative"
        >
          <motion.div
            style={{ opacity: glow }}
            className="pointer-events-none absolute -inset-x-10 -bottom-10 top-10 -z-10 rounded-[3rem] bg-[radial-gradient(closest-side,rgb(255_42_42/.35),transparent)] blur-3xl"
          />
          <HeroViewer />
        </motion.div>
        <p className="mt-4 text-center font-mono text-[11px] text-faint">
          Prototype pipeline output on licensed stock footage · illustrative
        </p>
      </div>
    </section>
  );
}
