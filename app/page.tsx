import { Cta } from "@/components/sections/cta";
import { DataLayer } from "@/components/sections/data-layer";
import { Domains } from "@/components/sections/domains";
import { Experts } from "@/components/sections/experts";
import { Faq } from "@/components/sections/faq";
import { Footer } from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
import { Navbar } from "@/components/sections/navbar";
import { Pipeline } from "@/components/sections/pipeline";
import { RawToStructured } from "@/components/sections/raw-to-structured";
import { Results } from "@/components/sections/results";
import { Skills } from "@/components/sections/skills";
import { Team } from "@/components/sections/team";
import { WorldModel } from "@/components/sections/world-model";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Domains />
        <Experts />
        <RawToStructured />
        <Pipeline />
        <DataLayer />
        <Skills />
        <WorldModel />
        <Results />
        <Team />
        <Faq />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
