import { Link } from "@/i18n/navigation";

export default function TermsPage() {
  return (
    <main className="min-h-screen pt-[120px] pb-20 px-6 lg:px-[10vw]">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm text-foreground-secondary mb-4">Last updated: February 2026</p>
        <h1 className="headline-lg text-foreground mb-8">Terms of Service</h1>

        <div className="body-lg space-y-8 text-foreground-secondary leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">1. Introduction</h2>
            <p>
              These Terms of Service (&ldquo;Terms&rdquo;) govern your use of the Credat website at{" "}
              <a href="https://credat.io" className="text-accent hover:underline">credat.io</a>{" "}
              (&ldquo;Website&rdquo;) and the Credat SDK (&ldquo;Software&rdquo;), created by Maxime Mansiet.
              By accessing the Website or using the Software, you agree to these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">2. The Software</h2>
            <p>
              Credat is an open-source AI agent identity and trust SDK. The Software is distributed under the{" "}
              <a
                href="https://github.com/credat/credat/blob/main/LICENSE"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                Apache License, Version 2.0
              </a>{" "}
              (&ldquo;Apache-2.0&rdquo;). Your use of the Software is governed by the terms of that license.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">3. Website Use</h2>
            <p>The Website is provided for informational purposes. You agree to:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Use the Website in compliance with applicable laws</li>
              <li>Not attempt to disrupt or compromise the Website&apos;s infrastructure</li>
              <li>Not scrape, crawl, or harvest content from the Website in an automated manner beyond what is permitted by our robots.txt</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">4. Intellectual Property</h2>
            <p>
              The Credat SDK source code is licensed under Apache-2.0 and may be used, modified, and distributed
              in accordance with that license.
            </p>
            <p className="mt-3">
              The Website content — including text, design, graphics, and the Credat name and logo — is the
              property of Credat and its creator. You may not reproduce, distribute, or create derivative works
              from the Website content without prior written permission, except as permitted by applicable law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">5. Documentation</h2>
            <p>
              SDK documentation is available at{" "}
              <a
                href="https://docs.credat.io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                docs.credat.io
              </a>.
              While we strive to keep documentation accurate and up to date, it is provided for reference only
              and may not reflect the latest state of the Software.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">6. Disclaimer of Warranties</h2>
            <p>
              THE SOFTWARE AND WEBSITE ARE PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo;,
              WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
              OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NONINFRINGEMENT.
            </p>
            <p className="mt-3">
              We do not warrant that the Software will be error-free, secure, or uninterrupted, or that
              it will meet your specific requirements.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">7. Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, CREDAT AND ITS CREATOR SHALL NOT BE LIABLE FOR ANY
              INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS
              OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, ARISING FROM YOUR USE OF THE SOFTWARE
              OR WEBSITE.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">8. Contributions</h2>
            <p>
              Contributions to the Credat SDK are welcome and governed by the Apache-2.0 license.
              By submitting a contribution (pull request, issue, or other), you agree that your contribution
              will be licensed under the same Apache-2.0 license.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">9. Changes to These Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. Changes will be posted on this page
              with an updated revision date. Continued use of the Website or Software after changes constitutes
              acceptance of the updated Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">10. Governing Law</h2>
            <p>
              These Terms are governed by and construed in accordance with the laws of France.
              Any disputes arising from these Terms shall be subject to the exclusive jurisdiction
              of the courts of Bordeaux, France.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-3">11. Contact</h2>
            <p>
              For any questions about these Terms, please contact us at{" "}
              <a href="mailto:maxime.mansiet@gmail.com" className="text-accent hover:underline">
                maxime.mansiet@gmail.com
              </a>.
            </p>
          </section>
        </div>

        <Link href="/" className="inline-block mt-12 text-sm text-accent hover:underline">
          &larr; Back to home
        </Link>
      </div>
    </main>
  );
}
