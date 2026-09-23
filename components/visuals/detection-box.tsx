"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

/** Bounding box with corner brackets and a label chip. Position is in % of the parent. */
export function DetectionBox({
  box,
  label,
  tone = "red",
  delay = 0,
  active = true,
  className,
}: {
  box: [number, number, number, number];
  label: string;
  tone?: "red" | "white";
  delay?: number;
  active?: boolean;
  className?: string;
}) {
  const [x, y, w, h] = box;
  const color = tone === "red" ? "border-accent" : "border-white/80";
  const corner = "absolute size-3 sm:size-3.5";
  return (
    <motion.div
      className={cn("pointer-events-none absolute", className)}
      style={{ left: `${x}%`, top: `${y}%`, width: `${w}%`, height: `${h}%` }}
      initial={{ opacity: 0, scale: 1.08 }}
      animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.08 }}
      transition={{ duration: 0.5, delay: active ? delay : 0, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className={cn(
          "absolute inset-0 border",
          tone === "red" ? "border-accent/35 bg-accent/[0.06]" : "border-white/20 bg-white/[0.03]",
        )}
      />
      <span className={cn(corner, color, "-left-px -top-px border-l-2 border-t-2")} />
      <span className={cn(corner, color, "-right-px -top-px border-r-2 border-t-2")} />
      <span className={cn(corner, color, "-bottom-px -left-px border-b-2 border-l-2")} />
      <span className={cn(corner, color, "-bottom-px -right-px border-b-2 border-r-2")} />
      <span
        className={cn(
          "absolute -top-px left-0 -translate-y-full whitespace-nowrap px-1.5 py-0.5 font-mono text-[9px] leading-none tracking-wide sm:text-[10px]",
          tone === "red" ? "bg-accent text-white" : "bg-white text-black",
        )}
      >
        {label}
      </span>
    </motion.div>
  );
}
