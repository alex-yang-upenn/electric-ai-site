"use client";

import Image from "next/image";
import {
  Activity,
  Box,
  Hand,
  ListTree,
  MoveHorizontal,
  Route,
  ShieldCheck,
  Timer,
  Waypoints,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Group, Panel, Separator } from "react-resizable-panels";
import { useInView } from "motion/react";
import { representations } from "@/config/content";
import { Reveal } from "@/components/ui/reveal";
import { Accent, SectionHeading } from "@/components/ui/section-heading";
import { DetectionBox } from "@/components/visuals/detection-box";
import { HandSkeleton, scalePts, type Pt } from "@/components/visuals/hand-skeleton";
import splitImg from "@/public/images/split-ratchet.jpg";

const icons: Record<string, LucideIcon> = {
  tasks: ListTree,
  objects: Box,
  hands: Hand,
  interactions: Activity,
  temporal: Timer,
  skills: Waypoints,
  trajectories: Route,
  outcomes: ShieldCheck,
};

// 3:2 photo → 150 × 100 viewBox
const VB_W = 150;
const VB_H = 100;
const HAND: Pt[] = [
  [21, 24],
  [26, 20], [32, 19], [37, 23], [40, 28],
  [34, 28], [39, 32], [41, 36], [39, 40],
  [31, 31], [36, 37], [37, 41], [34, 43],
  [28, 33], [32, 39], [32, 42], [29, 43],
  [25, 34], [28, 39], [27, 41], [25, 41],
];

export function RawToStructured() {
  const frameRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const inView = useInView(frameRef, { once: true, margin: "0px 0px -120px 0px" });

  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const layer = { width: width || "100%" } as const;

  return (
    <section className="relative overflow-hidden border-y border-line bg-surface/30 py-28 sm:py-36">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40 mask-radial" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          align="center"
          eyebrow="02 · What we extract"
          title={
            <>
              From raw pixels to <Accent glow>robot-ready</Accent> structure.
            </>
          }
          description="Our models transform raw egocentric video into structured representations designed specifically for training physical AI. Drag the divider."
        />

        <Reveal className="mt-16 grid gap-3 lg:grid-cols-[1fr_340px]">
          {/* comparison frame */}
          <div
            ref={frameRef}
            className="relative aspect-[3/2] overflow-hidden rounded-2xl border border-line-strong bg-black"
          >
            <Group orientation="horizontal" className="size-full" resizeTargetMinimumSize={{ coarse: 44, fine: 20 }}>
              <Panel defaultSize="58%" minSize="6%" className="relative size-full overflow-hidden">
                <div className="absolute inset-y-0 left-0" style={layer}>
                  <Image
                    src={splitImg}
                    alt="Annotated video frame: hand keypoints, tool detections and rotation axis"
                    fill
                    placeholder="blur"
                    sizes="(min-width: 1024px) 900px, 100vw"
                    className="object-cover photo-grade"
                  />
                  <div className="absolute inset-0 bg-black/35" />
                  <div className="absolute inset-0 bg-accent/15 mix-blend-color" />
                  <svg viewBox={`0 0 ${VB_W} ${VB_H}`} preserveAspectRatio="none" className="absolute inset-0 size-full">
                    {/* tool axis */}
                    <line x1="71.3" y1="27" x2="77.3" y2="76" stroke="#fff" strokeOpacity=".55" strokeDasharray="2 2" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                    {/* rotation about the axis */}
                    <ellipse cx="73" cy="29" rx="13" ry="4" fill="none" stroke="#ff2a2a" strokeWidth="2" vectorEffect="non-scaling-stroke" className="glow-line" />
                    <path d="M 84 31 l 3 -1 l -1.5 3.2 z" fill="#ff2a2a" />
                    {/* hand path into grasp */}
                    <path d="M 5 60 C 15 48, 22 36, 36 30" fill="none" stroke="#ff2a2a" strokeOpacity=".8" strokeWidth="2" strokeLinecap="round" vectorEffect="non-scaling-stroke" className="glow-line" />
                    {[0.2, 0.45, 0.7].map((t) => (
                      <circle key={t} cx={5 + 31 * t} cy={60 - 30 * t} r=".9" fill="#fff" />
                    ))}
                    <HandSkeleton points={scalePts(HAND, VB_W, VB_H)} active={inView} delay={0.3} jointRadius={0.8} boneWidth={0.3} />
                  </svg>
                  <DetectionBox box={[17, 11, 27, 36]} label="hand_R · power_grasp" tone="white" active={inView} delay={0.5} />
                  <DetectionBox box={[39, 24, 16, 16]} label="ratchet_3/8 · 0.96" active={inView} delay={0.7} />
                  <DetectionBox box={[47, 62, 9, 16]} label="socket_12mm · 0.93" active={inView} delay={0.9} />
                  <DetectionBox box={[60, 44, 30, 26]} label="engine_bay · ctx" tone="white" active={inView} delay={1.1} />
                </div>
                <span className="absolute bottom-3 left-3 rounded bg-accent px-2 py-1 font-mono text-[10px] tracking-widest text-white">
                  STRUCTURED
                </span>
              </Panel>

              <Separator className="group relative w-px bg-accent outline-none shadow-[0_0_12px_#ff2a2a]">
                <span className="absolute left-1/2 top-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-accent bg-black/80 text-accent shadow-[0_0_24px_-2px_rgb(255_42_42/.8)] backdrop-blur transition-transform group-hover:scale-110 group-data-[separator=active]:scale-110">
                  <MoveHorizontal className="size-4" />
                </span>
              </Separator>

              <Panel minSize="6%" className="relative size-full overflow-hidden">
                <div className="absolute inset-y-0 right-0" style={layer}>
                  <Image
                    src={splitImg}
                    alt=""
                    aria-hidden
                    fill
                    placeholder="blur"
                    sizes="(min-width: 1024px) 900px, 100vw"
                    className="object-cover saturate-[.35] contrast-[1.05] brightness-[.8]"
                  />
                  <div className="absolute inset-0 grain" />
                </div>
                <span className="absolute bottom-3 right-3 rounded bg-black/60 px-2 py-1 font-mono text-[10px] tracking-widest text-white/80 backdrop-blur">
                  RAW VIDEO
                </span>
              </Panel>

            </Group>
          </div>

          {/* structured record */}
          <div className="flex flex-col overflow-hidden rounded-2xl border border-line-strong bg-black/60 font-mono text-[12px] leading-relaxed">
            <div className="flex items-center justify-between border-b border-line px-4 py-3 text-faint">
              <span>demo_000184.json</span>
              <span className="text-accent">● valid</span>
            </div>
            <pre className="flex-1 whitespace-pre-wrap break-words p-4 text-[11.5px] text-white/80">
              <code>
                <J k="task" v='"loosen_bolt"' />
                <J k="domain" v='"automotive"' />
                <J k="subtasks" v='["reach","grasp","seat","rotate"]' />
                <J k="objects" v='["ratchet_3/8","socket_12mm"]' />
                <J k="hand" v='"right"' />
                <J k="grasp_type" v='"power_cylindrical"' />
                <J k="keypoints" v="[21, 3]  // per frame" />
                <J k="contact" v="{ t: 15.2s, obj: ratchet }" />
                <J k="tool_axis" v="[0.06, 0.99, 0.08]" />
                <J k="rotation" v="-94.5°  // ccw" />
                <J k="trajectory" v="SE(3) × 212" />
                <J k="success" v="true" hot />
              </code>
            </pre>
          </div>
        </Reveal>

        {/* representations grid */}
        <div className="mt-20 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {representations.map((r, i) => {
            const Icon = icons[r.key];
            return (
              <Reveal key={r.key} delay={(i % 4) * 0.06} className="group relative bg-bg p-6 transition-colors duration-500 hover:bg-surface-2">
                <div className="pointer-events-none absolute inset-x-0 top-0 hairline-red opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="flex items-center justify-between">
                  <span className="flex size-10 items-center justify-center rounded-xl border border-line-strong bg-white/[0.03] text-accent transition-all duration-500 group-hover:border-accent/50 group-hover:shadow-[0_0_20px_-4px_rgb(255_42_42/.7)]">
                    <Icon className="size-[18px]" strokeWidth={1.6} />
                  </span>
                  <span className="font-mono text-[10px] text-faint">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-6 text-lg font-medium tracking-tight text-ink">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{r.body}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function J({ k, v, hot = false }: { k: string; v: string; hot?: boolean }) {
  return (
    <span className="block">
      <span className="text-accent-soft">&quot;{k}&quot;</span>
      <span className="text-faint">: </span>
      <span className={hot ? "text-accent glow-text" : "text-white/85"}>{v}</span>
    </span>
  );
}
