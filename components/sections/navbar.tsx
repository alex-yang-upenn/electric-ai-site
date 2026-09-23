"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { Drawer } from "vaul";
import { mailto, siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";

const links = [
  { href: "#approach", label: "Approach" },
  { href: "#pipeline", label: "Pipeline" },
  { href: "#vision", label: "Vision" },
  { href: "#results", label: "Results" },
  { href: "#team", label: "Team" },
];

export function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-3"
    >
      <nav
        className={cn(
          "flex w-full max-w-6xl items-center justify-between rounded-full border px-3 py-2 pl-4 transition-all duration-500",
          scrolled
            ? "border-line-strong bg-black/60 shadow-[0_10px_40px_-10px_rgb(0_0_0/.8)] backdrop-blur-xl"
            : "border-transparent bg-transparent",
        )}
      >
        <a href="#top" aria-label={`${siteConfig.name} home`}>
          <Logo />
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-full px-3.5 py-2 text-sm text-muted transition-colors hover:bg-white/[0.06] hover:text-ink"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ButtonLink href={mailto("Partnering with ElectricAI Labs")} className="hidden h-9 px-4 sm:inline-flex">
            Talk to us <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </ButtonLink>

          <Drawer.Root open={open} onOpenChange={setOpen}>
            <Drawer.Trigger
              aria-label="Open menu"
              className="flex size-10 items-center justify-center rounded-full border border-line-strong text-ink md:hidden"
            >
              <Menu className="size-5" />
            </Drawer.Trigger>
            <Drawer.Portal>
              <Drawer.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" />
              <Drawer.Content className="fixed inset-x-0 bottom-0 z-50 flex flex-col rounded-t-3xl border-t border-line-strong bg-surface px-6 pb-10 pt-4 outline-none">
                <div className="mx-auto mb-6 h-1.5 w-12 rounded-full bg-white/20" />
                <div className="mb-6 flex items-center justify-between">
                  <Drawer.Title asChild>
                    <span>
                      <Logo />
                    </span>
                  </Drawer.Title>
                  <Drawer.Close aria-label="Close menu" className="flex size-9 items-center justify-center rounded-full border border-line-strong">
                    <X className="size-4" />
                  </Drawer.Close>
                </div>
                <Drawer.Description className="sr-only">Site navigation</Drawer.Description>
                <ul className="flex flex-col">
                  {links.map((l) => (
                    <li key={l.href} className="border-b border-line">
                      <a
                        href={l.href}
                        onClick={() => setOpen(false)}
                        className="flex items-center justify-between py-4 text-2xl font-medium tracking-tight"
                      >
                        {l.label}
                        <ArrowUpRight className="size-5 text-faint" />
                      </a>
                    </li>
                  ))}
                </ul>
                <ButtonLink href={mailto("Partnering with ElectricAI Labs")} className="mt-8 h-12 text-base">
                  Talk to us
                </ButtonLink>
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>
        </div>
      </nav>
    </motion.header>
  );
}
