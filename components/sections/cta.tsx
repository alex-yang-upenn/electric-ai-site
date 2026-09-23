import Image from "next/image";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { mailto, siteConfig } from "@/config/site";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/section-heading";
import ctaImg from "@/public/images/cta-soldering.jpg";

export function Cta() {
  const { email, phone, phoneHref } = siteConfig.contact;
  return (
    <section id="contact" className="relative px-4 pb-10 sm:px-6">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-accent/30 grain">
        <Image src={ctaImg} alt="" fill placeholder="blur" sizes="100vw" className="object-cover photo-grade opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/80 to-bg/40" />
        <div className="absolute inset-0 bg-accent/10 mix-blend-color" />
        <div className="absolute inset-0 bg-grid opacity-40 mask-radial" />
        <div className="absolute left-1/2 top-full h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(255_42_42/.45),transparent)] blur-2xl" />

        <Reveal className="relative flex flex-col items-center px-6 py-24 text-center sm:py-32">
          <Eyebrow>Human expertise → Data → Intelligence → Robots</Eyebrow>
          <h2 className="mt-8 max-w-4xl text-balance text-4xl font-medium leading-[1.02] tracking-[-0.045em] sm:text-6xl md:text-7xl">
            The physical world is the next{" "}
            <span className="font-serif font-normal italic text-accent glow-text">training corpus.</span>
          </h2>
          <p className="mt-6 max-w-xl text-pretty text-lg text-muted">
            We&apos;re partnering with robotics teams, data contributors and investors who want to build the foundation
            model for physical work.
          </p>
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
            <ButtonLink href={mailto("Partnering with ElectricAI Labs")} className="h-12 px-6 text-[15px]">
              Talk to the founders
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </ButtonLink>
            <ButtonLink href={`tel:${phoneHref}`} variant="ghost" className="h-12 px-6 text-[15px]">
              <Phone className="size-4" /> {phone}
            </ButtonLink>
          </div>
          <a
            href={`mailto:${email}`}
            className="mt-6 inline-flex items-center gap-2 font-mono text-sm text-muted transition-colors hover:text-ink"
          >
            <Mail className="size-4 text-accent" /> {email}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
