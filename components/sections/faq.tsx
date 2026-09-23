"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import { faqs } from "@/config/content";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

export function Faq() {
  return (
    <section className="relative mx-auto grid max-w-7xl gap-12 px-4 pb-28 sm:px-6 sm:pb-36 lg:grid-cols-[1fr_1.4fr]">
      <SectionHeading eyebrow="09 · FAQ" title="Questions we hear often." />
      <Reveal delay={0.1}>
        <Accordion.Root type="single" collapsible defaultValue="item-0" className="border-t border-line">
          {faqs.map((f, i) => (
            <Accordion.Item key={f.q} value={`item-${i}`} className="border-b border-line">
              <Accordion.Header>
                <Accordion.Trigger className="group flex w-full items-center justify-between gap-6 py-6 text-left text-lg font-medium tracking-tight text-ink outline-none transition-colors hover:text-white focus-visible:text-accent">
                  {f.q}
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-line-strong text-muted transition-all duration-300 group-hover:border-accent/60 group-data-[state=open]:rotate-45 group-data-[state=open]:border-accent group-data-[state=open]:bg-accent group-data-[state=open]:text-white">
                    <Plus className="size-4" />
                  </span>
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                <p className="max-w-2xl pb-6 pr-12 leading-relaxed text-muted">{f.a}</p>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </Reveal>
    </section>
  );
}
