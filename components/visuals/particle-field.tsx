"use client";

import { Particles, ParticlesProvider } from "@tsparticles/react";
import type { Engine, ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { useReducedMotion } from "motion/react";
import { useMemo } from "react";

// Must be stable across the app lifecycle (ParticlesProvider requirement).
const init = async (engine: Engine) => {
  await loadSlim(engine);
};

export function ParticleField({ id = "hero-particles", className }: { id?: string; className?: string }) {
  const reduce = useReducedMotion();

  const options = useMemo<ISourceOptions>(
    () => ({
      fullScreen: { enable: false },
      background: { color: { value: "transparent" } },
      fpsLimit: 60,
      detectRetina: true,
      pauseOnOutsideViewport: true,
      particles: {
        number: { value: 70, density: { enable: true, width: 1400, height: 900 } },
        paint: { color: { value: ["#ff2a2a", "#ff2a2a", "#ffffff"] } },
        shape: { type: "circle" },
        opacity: { value: { min: 0.15, max: 0.7 } },
        size: { value: { min: 0.6, max: 1.8 } },
        links: {
          enable: true,
          distance: 150,
          color: "#ff2a2a",
          opacity: 0.18,
          width: 1,
        },
        move: {
          enable: !reduce,
          speed: 0.35,
          direction: "none",
          outModes: { default: "out" },
        },
      },
      interactivity: {
        detectsOn: "window",
        events: { onHover: { enable: !reduce, mode: "grab" } },
        modes: { grab: { distance: 170, links: { opacity: 0.55, color: "#ff5a4f" } } },
      },
    }),
    [reduce],
  );

  return (
    <ParticlesProvider init={init}>
      <Particles id={id} options={options} className={className} />
    </ParticlesProvider>
  );
}
