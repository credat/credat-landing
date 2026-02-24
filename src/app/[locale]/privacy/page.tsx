import { Link } from "@/i18n/navigation";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen pt-[120px] pb-20 px-6 lg:px-[10vw]">
      <div className="mx-auto max-w-3xl">
        <h1 className="headline-lg text-foreground mb-8">Privacy Policy</h1>
        <div className="body-lg space-y-6">
          <p>
            Credat is an open-source project. This website does not collect personal data,
            use cookies, or track visitors.
          </p>
          <p>
            The source code is available on{" "}
            <a
              href="https://github.com/credat/credat"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              GitHub
            </a>{" "}
            under the Apache-2.0 license.
          </p>
          <p>
            For questions, open an issue on GitHub or reach out via{" "}
            <a
              href="https://x.com/credat_io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              X/Twitter
            </a>.
          </p>
        </div>
        <Link href="/" className="inline-block mt-12 text-sm text-accent hover:underline">
          &larr; Back to home
        </Link>
      </div>
    </main>
  );
}
