"use client";

import { motion } from "motion/react";

export type Pt = [number, number];

/** MediaPipe-style 21-keypoint hand topology. */
const BONES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4],
  [0, 5], [5, 6], [6, 7], [7, 8],
  [5, 9], [9, 10], [10, 11], [11, 12],
  [9, 13], [13, 14], [14, 15], [15, 16],
  [13, 17], [0, 17], [17, 18], [18, 19], [19, 20],
];

const TIPS = new Set([4, 8, 12, 16, 20]);

/**
 * Renders inside a parent <svg>. Coordinates are in the parent's viewBox units.
 * Bones draw themselves in, then joints pop in.
 */
export function HandSkeleton({
  points,
  delay = 0,
  jointRadius = 0.55,
  boneWidth = 0.22,
  active = true,
}: {
  points: Pt[];
  delay?: number;
  jointRadius?: number;
  /** In viewBox units — pathLength animation breaks with non-scaling strokes. */
  boneWidth?: number;
  active?: boolean;
}) {
  return (
    <g>
      {BONES.map(([a, b], i) => (
        <motion.line
          key={`b${i}`}
          x1={points[a][0]}
          y1={points[a][1]}
          x2={points[b][0]}
          y2={points[b][1]}
          stroke="#fff"
          strokeOpacity={0.85}
          strokeWidth={boneWidth}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={active ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: 0.5, delay: active ? delay + i * 0.025 : 0, ease: "easeOut" }}
        />
      ))}
      {points.map(([x, y], i) => (
        <motion.circle
          key={`j${i}`}
          cx={x}
          cy={y}
          r={TIPS.has(i) ? jointRadius * 1.25 : jointRadius}
          fill={TIPS.has(i) ? "#ff2a2a" : "#fff"}
          stroke={TIPS.has(i) ? "#fff" : "#ff2a2a"}
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
          initial={{ scale: 0, opacity: 0 }}
          animate={active ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.35, delay: active ? delay + 0.35 + i * 0.02 : 0, ease: "backOut" }}
        />
      ))}
    </g>
  );
}

/** Build 21 points from compact percentage coordinates, scaled into a viewBox. */
export function scalePts(pct: Pt[], w: number, h: number): Pt[] {
  return pct.map(([x, y]) => [(x / 100) * w, (y / 100) * h]);
}
