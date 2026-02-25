import { LegalLayout } from "@/components/legal-layout";

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="February 2026">
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-3">1. Introduction</h2>
        <p>
          Credat (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is an open-source AI agent identity and trust SDK
          created by Maxime Mansiet. This Privacy Policy explains how we collect, use, and protect information
          when you visit our website at{" "}
          <a href="https://credat.io" className="text-accent hover:underline">credat.io</a>.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-foreground mb-3">2. Information We Collect</h2>
        <p>
          We do not collect personal information directly. However, we use third-party services that
          may collect certain data automatically when you visit our website:
        </p>
        <ul className="list-disc pl-6 mt-3 space-y-2">
          <li>
            <strong className="text-foreground">Google Analytics</strong> — We use Google Analytics to understand
            how visitors interact with our website. This service collects anonymized usage data including pages
            visited, time spent on pages, referring websites, browser type, device type, and approximate geographic
            location. Google Analytics uses cookies (<code className="text-sm font-mono bg-background-alt px-1.5 py-0.5 rounded">_ga</code>,{" "}
            <code className="text-sm font-mono bg-background-alt px-1.5 py-0.5 rounded">_gid</code>) to distinguish unique visitors.
          </li>
          <li>
            <strong className="text-foreground">Vercel</strong> — Our website is hosted on Vercel. Vercel may collect
            standard server log data including IP addresses, browser user agents, and request timestamps as part of
            normal hosting operations.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-foreground mb-3">3. Cookies</h2>
        <p>
          Our website uses cookies solely through Google Analytics for traffic analysis purposes. These cookies do not
          identify you personally. You can opt out of Google Analytics by installing the{" "}
          <a
            href="https://tools.google.com/dlpage/gaoptout"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            Google Analytics Opt-out Browser Add-on
          </a>{" "}
          or by configuring your browser to block cookies.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-foreground mb-3">4. How We Use Information</h2>
        <p>The anonymized data collected through Google Analytics is used to:</p>
        <ul className="list-disc pl-6 mt-3 space-y-2">
          <li>Understand how visitors use our website</li>
          <li>Improve our website content and structure</li>
          <li>Monitor website performance and availability</li>
        </ul>
        <p className="mt-3">We do not sell, share, or transfer any data to third parties beyond the services described above.</p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-foreground mb-3">5. Data Retention</h2>
        <p>
          Google Analytics data is retained for 14 months. Vercel server logs are retained according to{" "}
          <a
            href="https://vercel.com/legal/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            Vercel&apos;s Privacy Policy
          </a>.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-foreground mb-3">6. Your Rights</h2>
        <p>
          Under the GDPR and applicable data protection laws, you have the right to:
        </p>
        <ul className="list-disc pl-6 mt-3 space-y-2">
          <li>Access information about how your data is processed</li>
          <li>Request deletion of any data associated with your visit</li>
          <li>Opt out of analytics tracking at any time</li>
          <li>Lodge a complaint with a supervisory authority (CNIL in France)</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-foreground mb-3">7. Third-Party Links</h2>
        <p>
          Our website contains links to external services including GitHub, npm, and our documentation site.
          These services have their own privacy policies and we are not responsible for their practices.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-foreground mb-3">8. Open Source</h2>
        <p>
          The Credat SDK is open-source software licensed under the{" "}
          <a
            href="https://github.com/credat/credat/blob/main/LICENSE"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            Apache-2.0 license
          </a>.
          This privacy policy applies only to the website at credat.io, not to the SDK itself.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-foreground mb-3">9. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Changes will be posted on this page
          with an updated revision date. Continued use of the website after changes constitutes
          acceptance of the updated policy.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-foreground mb-3">10. Contact</h2>
        <p>
          For any questions about this Privacy Policy, please contact us at{" "}
          <a href="mailto:maxime.mansiet@gmail.com" className="text-accent hover:underline">
            maxime.mansiet@gmail.com
          </a>.
        </p>
      </section>
    </LegalLayout>
  );
}
