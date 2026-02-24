import { Link } from "@/i18n/navigation";

export default function TermsPage() {
  return (
    <main className="min-h-screen pt-[120px] pb-20 px-6 lg:px-[10vw]">
      <div className="mx-auto max-w-3xl">
        <h1 className="headline-lg text-foreground mb-8">Terms of Service</h1>
        <div className="body-lg space-y-6">
          <p>
            Credat is provided as open-source software under the{" "}
            <a
              href="https://github.com/credat/credat/blob/main/LICENSE"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              Apache-2.0 license
            </a>.
          </p>
          <p>
            The software is provided &ldquo;as is&rdquo;, without warranty of any kind.
            See the license for the full terms and conditions.
          </p>
          <p>
            This website is for informational purposes. For the SDK documentation, visit{" "}
            <a
              href="https://docs.credat.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              docs.credat.io
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
