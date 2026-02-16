import { Hero } from "@/components/sections/hero";
import { Problem } from "@/components/sections/problem";
import { Features } from "@/components/sections/features";
import { CodePreview } from "@/components/sections/code-preview";

export default function Home() {
  return (
    <main>
      <Hero />
      <Problem />
      <Features />
      <CodePreview />
      <section id="stats" className="min-h-screen" />
      <section id="how-it-works" className="min-h-screen" />
      <section id="cta" className="min-h-screen" />
      <footer id="footer" />
    </main>
  );
}
