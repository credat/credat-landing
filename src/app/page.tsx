import { Hero } from "@/components/sections/hero";
import { Problem } from "@/components/sections/problem";
import { Features } from "@/components/sections/features";
import { CodePreview } from "@/components/sections/code-preview";
import { Stats } from "@/components/sections/stats";
import { HowItWorks } from "@/components/sections/how-it-works";
import { OpenSourceCta } from "@/components/sections/open-source-cta";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Problem />
      <Features />
      <CodePreview />
      <Stats />
      <HowItWorks />
      <OpenSourceCta />
      <Footer />
    </main>
  );
}
