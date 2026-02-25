import { Link } from "@/i18n/navigation";

export function LegalLayout({
  title,
  lastUpdated,
  children,
}: {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen pt-[120px] pb-20 px-6 lg:px-[10vw]">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm text-foreground-secondary mb-4">Last updated: {lastUpdated}</p>
        <h1 className="headline-lg text-foreground mb-8">{title}</h1>
        <div className="body-lg space-y-8 text-foreground-secondary leading-relaxed">
          {children}
        </div>
        <Link href="/" className="inline-block mt-12 text-sm text-accent hover:underline">
          &larr; Back to home
        </Link>
      </div>
    </main>
  );
}
