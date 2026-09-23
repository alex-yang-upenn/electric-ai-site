"use client";

import Image from "next/image";
import { Brain, FlaskConical, Sparkles, type LucideIcon } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/ui/reveal";
import { Accent, SectionHeading } from "@/components/ui/section-heading";

const benefits: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: Brain, title: "Reason before acting", body: "Robots imagine the outcome of an action before executing it." },
  { icon: FlaskConical, title: "Train in simulation", body: "Learned environments let policies practice millions of times, safely." },
  { icon: Sparkles, title: "Learn without demos", body: "Acquire skills that were never demonstrated directly on a robot." },
];

export function WorldModel() {
  return (
    <section className="relative overflow-hidden py-28 sm:py-36">
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 opacity-[0.18] lg:block">
        <Image src="/images/robot-hand.jpg" alt="" fill sizes="50vw" className="object-cover grayscale" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-bg" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="06 · Beyond imitation"
          title={
            <>
              Not copying humans. Understanding <Accent glow>how actions change the world.</Accent>
            </>
          }
          description="By learning from enormous collections of expert trajectories, we can work toward models that predict the consequences of physical actions."
        />

        <Reveal className="mt-16 rounded-3xl border border-line-strong bg-black/50 p-4 backdrop-blur sm:p-8">
          <div className="grid items-center gap-4 md:grid-cols-[1fr_auto_1fr_auto_1fr]">
            <Tile label="state" sub="sₜ">
              <StateScene />
            </Tile>
            <Op>+</Op>
            <Tile label="action" sub="aₜ">
              <ActionScene />
            </Tile>
            <Op>→</Op>
            <Tile label="future state" sub="ŝₜ₊₁" highlight>
              <FutureScene />
            </Tile>
          </div>
          <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-line pt-6 sm:flex-row">
            <code className="font-mono text-sm text-muted sm:text-base">
              <span className="text-accent">f</span>
              <span className="text-faint">θ</span>( state, action ) <span className="text-accent">→</span> future state
            </code>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-faint">learned world model</span>
          </div>
        </Reveal>

        <div className="mt-3 grid gap-3 md:grid-cols-3">
          {benefits.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.08} className="rounded-2xl border border-line bg-surface/60 p-6">
              <b.icon className="size-5 text-accent" strokeWidth={1.6} />
              <h3 className="mt-5 text-lg font-medium tracking-tight">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{b.body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20 text-center">
          <p className="text-balance text-3xl font-medium tracking-[-0.03em] sm:text-4xl">
            Video becomes the foundation for a <Accent glow>learned environment.</Accent>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Tile({
  label,
  sub,
  highlight = false,
  children,
}: {
  label: string;
  sub: string;
  highlight?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={
        "relative overflow-hidden rounded-2xl border bg-surface " +
        (highlight ? "border-accent/50 shadow-[0_0_50px_-12px_rgb(255_42_42/.6)]" : "border-line")
      }
    >
      <div className="absolute inset-0 bg-grid opacity-50" />
      <div className="relative aspect-[4/3]">{children}</div>
      <div className="relative flex items-center justify-between border-t border-line px-4 py-2.5 font-mono text-[11px]">
        <span className="uppercase tracking-widest text-muted">{label}</span>
        <span className={highlight ? "text-accent" : "text-faint"}>{sub}</span>
      </div>
    </div>
  );
}

function Op({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center font-mono text-3xl text-accent glow-text max-md:rotate-90">{children}</div>
  );
}

/* ── Mini scenes (SVG, 160×120) ─────────────────────────── */

function Gripper({ x, y, open = 1 }: { x: number; y: number; open?: number }) {
  const gap = 10 + open * 8;
  return (
    <g transform={`translate(${x} ${y})`} stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round">
      <line x1="0" y1="-40" x2="0" y2="-14" />
      <line x1={-gap} y1="-14" x2={gap} y2="-14" />
      <line x1={-gap} y1="-14" x2={-gap} y2="2" />
      <line x1={gap} y1="-14" x2={gap} y2="2" />
      <circle cx="0" cy="-40" r="3" fill="#ff2a2a" stroke="none" />
    </g>
  );
}

function Peg({ x, y, ghost = false }: { x: number; y: number; ghost?: boolean }) {
  return (
    <rect
      x={x - 9}
      y={y - 12}
      width="18"
      height="24"
      rx="2"
      fill={ghost ? "none" : "rgb(255 42 42 / .25)"}
      stroke={ghost ? "rgb(255 255 255 / .35)" : "#ff2a2a"}
      strokeDasharray={ghost ? "3 3" : undefined}
      strokeWidth="1.5"
    />
  );
}

function Base() {
  return (
    <g>
      <line x1="10" y1="100" x2="150" y2="100" stroke="rgb(255 255 255 / .25)" />
      {/* hole */}
      <rect x="104" y="92" width="22" height="8" fill="#050505" stroke="rgb(255 255 255 / .5)" strokeWidth="1" />
    </g>
  );
}

function StateScene() {
  return (
    <svg viewBox="0 0 160 120" className="absolute inset-0 size-full">
      <Base />
      <Peg x={48} y={78} />
      <Gripper x={48} y={64} open={0.1} />
      <text x="10" y="18" className="fill-white/40 font-mono text-[7px]">peg_A · grasped</text>
    </svg>
  );
}

function ActionScene() {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 160 120" className="absolute inset-0 size-full">
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#ff2a2a" />
        </marker>
      </defs>
      <motion.path
        d="M 30 88 C 50 30, 100 30, 118 78"
        fill="none"
        stroke="#ff2a2a"
        strokeWidth="2.5"
        markerEnd="url(#arrow)"
        className="glow-line"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={reduce ? { duration: 0 } : { duration: 1.6, repeat: Infinity, repeatDelay: 1.2, ease: "easeInOut" }}
      />
      <text x="10" y="18" className="fill-white/40 font-mono text-[7px]">Δpose · lift → move → insert</text>
      <text x="92" y="112" className="fill-white/40 font-mono text-[7px]">Δz −24mm</text>
    </svg>
  );
}

function FutureScene() {
  const reduce = useReducedMotion();
  const t = reduce ? { duration: 0 } : { duration: 1.6, repeat: Infinity, repeatDelay: 1.2, ease: "easeInOut" as const };
  return (
    <svg viewBox="0 0 160 120" className="absolute inset-0 size-full">
      <Base />
      <Peg x={48} y={78} ghost />
      <motion.g initial={{ x: 0, y: 0 }} animate={{ x: [0, 34, 67], y: [0, -40, 10] }} transition={t}>
        <Peg x={48} y={78} />
        <Gripper x={48} y={64} open={0.1} />
      </motion.g>
      <text x="10" y="18" className="fill-white/40 font-mono text-[7px]">peg_A · inserted</text>
      <text x="96" y="18" className="fill-[#ff2a2a] font-mono text-[7px]">p = 0.93</text>
    </svg>
  );
}
