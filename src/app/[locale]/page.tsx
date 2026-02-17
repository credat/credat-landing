import { SectionHero } from "@/components/sections/section-hero";
import { SectionShowreel } from "@/components/sections/section-showreel";
import { SectionDx } from "@/components/sections/section-dx";
import { SectionUseCases } from "@/components/sections/section-use-cases";
import { SectionIntegrations } from "@/components/sections/section-integrations";
import { SectionTestimonials } from "@/components/sections/section-testimonials";
import { SectionKpi } from "@/components/sections/section-kpi";
import { SectionCodeScroll } from "@/components/sections/section-code-scroll";
import { SectionCta } from "@/components/sections/section-cta";
import { SectionFooter } from "@/components/sections/section-footer";

export default function Home() {
  return (
    <main>
      <SectionHero />
      <div className="section-spacer" />
      <SectionShowreel />
      <div className="section-spacer" />
      <div className="section-divider" />
      <div className="section-spacer" />
      <SectionDx />
      <div className="section-spacer" />
      <SectionUseCases />
      <div className="section-spacer" />
      <SectionIntegrations />
      <div className="section-spacer" />
      <SectionTestimonials />
      <div className="section-spacer" />
      <SectionKpi />
      <div className="section-spacer" />
      <SectionCodeScroll />
      <SectionCta />
      <div className="section-spacer" />
      <SectionFooter />
    </main>
  );
}
