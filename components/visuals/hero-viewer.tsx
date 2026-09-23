"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { DetectionBox } from "./detection-box";
import { HandSkeleton, scalePts, type Pt } from "./hand-skeleton";
import heroImg from "@/public/images/hero-mechanic.jpg";

// viewBox is 100 × 75 to match the 4:3 photo exactly.
const VB_W = 100;
const VB_H = 75;

const RIGHT_HAND: Pt[] = [
  [71, 43],
  [65, 44], [59, 44], [54, 45], [51, 47],
  [58, 51], [53, 51], [50, 55], [51, 58],
  [60, 56], [55, 59], [52, 62], [53, 65],
  [62, 61], [58, 65], [56, 67], [57, 69],
  [65, 65], [62, 69], [60, 71], [61, 72],
];

const LEFT_HAND: Pt[] = [
  [25, 6],
  [28, 12], [29, 19], [27, 25], [24, 29],
  [22, 17], [20, 24], [18, 29], [17, 32],
  [18, 17], [15, 24], [12, 30], [11, 34],
  [14, 17], [11, 23], [8, 28], [7, 33],
  [11, 18], [7, 22], [5, 26], [4, 30],
];

const PHASES = [
  { name: "reach", t: "00:14.2", contact: "none", grip: "open · 88 mm", torque: "—" },
  { name: "grasp", t: "00:15.0", contact: "hand_R ↔ wrench", grip: "power · 41 mm", torque: "—" },
  { name: "align", t: "00:15.9", contact: "wrench ↔ bolt_M10", grip: "power · 39 mm", torque: "0.4 N·m" },
  { name: "torque", t: "00:16.8", contact: "wrench ↔ bolt_M10", grip: "power · 37 mm", torque: "24.8 N·m" },
  { name: "verify", t: "00:18.1", contact: "hand_L ↔ radiator", grip: "release", torque: "—" },
];

export function HeroViewer() {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState(3);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setPhase((p) => (p + 1) % PHASES.length), 1800);
    return () => clearInterval(id);
  }, [reduce]);

  const current = PHASES[phase];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-line-strong bg-surface/80 shadow-[0_40px_120px_-30px_rgb(255_42_42/.35)] backdrop-blur">
      {/* window chrome */}
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-white/15" />
          <span className="size-2.5 rounded-full bg-accent/80" />
        </div>
        <span className="font-mono text-[10px] tracking-wider text-faint sm:text-[11px]">
          electric-ai / pipeline / session_0412 / cam_ego_01.mp4
        </span>
        <span className="hidden font-mono text-[11px] text-faint sm:block">v0.3</span>
      </div>

      <div className="grid lg:grid-cols-[1fr_300px]">
        {/* frame */}
        <div className="relative aspect-[4/3] overflow-hidden grain">
          <Image
            src={heroImg}
            alt="First-person view of a mechanic's hands tightening a bolt with a wrench"
            fill
            priority
            placeholder="blur"
            sizes="(min-width: 1024px) 900px, 100vw"
            className="object-cover photo-grade"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
          <div className="absolute inset-0 bg-accent/10 mix-blend-color" />

          {/* scan line */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[10%] animate-scan bg-gradient-to-b from-transparent via-accent/15 to-transparent" />

          <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="absolute inset-0 size-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="traj" x1="0" x2="1">
                <stop offset="0" stopColor="#ff2a2a" stopOpacity="0" />
                <stop offset="1" stopColor="#ff2a2a" />
              </linearGradient>
            </defs>
            {/* predicted rotation arc around the bolt */}
            <path
              d="M 60 41.25 A 19.2 19.2 0 0 0 66.4 29.9"
              fill="none"
              stroke="#fff"
              strokeOpacity="0.35"
              strokeDasharray="1.2 1.2"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
            <motion.path
              d="M 36 62 C 44 56, 52 47, 60 41.25"
              fill="none"
              stroke="url(#traj)"
              strokeWidth="0.45"
              strokeLinecap="round"
              className="glow-line"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.2, delay: 1.2, ease: "easeInOut" }}
            />
            {/* bolt target */}
            <circle cx="47.5" cy="26.6" r="1.4" fill="none" stroke="#ff2a2a" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
            <circle cx="47.5" cy="26.6" r="3" fill="none" stroke="#ff2a2a" strokeOpacity="0.5" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            <HandSkeleton points={scalePts(RIGHT_HAND, VB_W, VB_H)} delay={0.6} />
            <HandSkeleton points={scalePts(LEFT_HAND, VB_W, VB_H)} delay={0.9} />
          </svg>

          <DetectionBox box={[43, 31, 9, 10]} label="wrench_19mm · 0.97" delay={1.4} />
          <DetectionBox box={[48, 39, 26, 34]} label="hand_R · power_grasp" tone="white" delay={1.6} />
          <DetectionBox box={[2, 12, 29, 36]} label="hand_L · stabilize" tone="white" delay={1.8} className="hidden sm:block" />
          <DetectionBox box={[81, 52, 18, 19]} label="distributor · 0.91" delay={2.0} className="hidden sm:block" />

          {/* HUD */}
          <div className="absolute left-3 top-3 flex items-center gap-2 font-mono text-[10px] text-white/80 sm:text-[11px]">
            <span className="flex items-center gap-1.5 rounded bg-black/50 px-1.5 py-0.5 backdrop-blur">
              <span className="size-1.5 animate-blink rounded-full bg-accent" /> REC
            </span>
            <span className="rounded bg-black/50 px-1.5 py-0.5 backdrop-blur">{current.t}</span>
          </div>
          <div className="absolute right-3 top-3 hidden rounded bg-black/50 px-1.5 py-0.5 font-mono text-[11px] text-white/70 backdrop-blur sm:block">
            30 fps · ego · depth ✓
          </div>

          {/* phase timeline */}
          <div className="absolute inset-x-3 bottom-3 rounded-lg border border-white/10 bg-black/55 p-2 backdrop-blur-md">
            <div className="grid grid-cols-5 gap-1">
              {PHASES.map((p, i) => (
                <div key={p.name} className="flex flex-col gap-1">
                  <div className="relative h-1 overflow-hidden rounded-full bg-white/10">
                    {i < phase && <div className="absolute inset-0 bg-white/50" />}
                    {i === phase && (
                      <motion.div
                        key={`bar-${phase}`}
                        className="absolute inset-y-0 left-0 bg-accent shadow-[0_0_10px_#ff2a2a]"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: reduce ? 0 : 1.8, ease: "linear" }}
                      />
                    )}
                  </div>
                  <span
                    className={cn(
                      "font-mono text-[9px] uppercase tracking-wider transition-colors sm:text-[10px]",
                      i === phase ? "text-accent" : i < phase ? "text-white/70" : "text-white/35",
                    )}
                  >
                    {p.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* structured output panel */}
        <div className="hidden flex-col border-l border-line font-mono text-[11px] lg:flex">
          <div className="border-b border-line px-4 py-3 text-faint">structured_output.json</div>
          <div className="flex flex-1 flex-col gap-3.5 p-4">
            <Field k="task" v="replace_water_pump" />
            <Field k="subtask" v="loosen_mount_bolt (3/7)" />
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={phase}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-3.5"
              >
                <Field k="skill" v={current.name} hot />
                <Field k="contact" v={current.contact} />
                <Field k="grip" v={current.grip} />
                <Field k="est_torque" v={current.torque} />
              </motion.div>
            </AnimatePresence>
            <Field k="hand_pose" v="21 kp × 2 · 3D" />
            <Field k="tool_6dof" v="[0.42, −0.11, 0.63]" />
            <div className="mt-auto rounded-md border border-accent/30 bg-accent/[0.07] p-3">
              <div className="mb-2 flex items-center justify-between text-faint">
                <span>outcome</span>
                <span className="text-accent">● success</span>
              </div>
              <div className="h-1 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[94%] rounded-full bg-gradient-to-r from-accent-deep to-accent" />
              </div>
              <div className="mt-1.5 text-right text-faint">confidence 0.94</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ k, v, hot = false }: { k: string; v: string; hot?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <span className="text-faint">{k}</span>
      <span className={cn("truncate text-right", hot ? "text-accent glow-text" : "text-white/85")}>{v}</span>
    </div>
  );
}
