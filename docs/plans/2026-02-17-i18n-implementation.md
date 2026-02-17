# i18n Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add multi-language support (EN, FR, DE, ES) to the Credat landing page using next-intl.

**Architecture:** Subpath routing with `[locale]` dynamic segment. English at `/` (no prefix), other languages at `/fr`, `/de`, `/es`. All translations in JSON files under `messages/`. Components use `useTranslations()` hook.

**Tech Stack:** next-intl, Next.js 16 App Router, TypeScript

---

### Task 1: Install next-intl and create i18n config files

**Files:**
- Modify: `package.json`
- Create: `src/i18n/routing.ts`
- Create: `src/i18n/navigation.ts`
- Create: `src/i18n/request.ts`
- Modify: `next.config.ts`

**Step 1: Install next-intl**

Run: `npm install next-intl`

**Step 2: Create routing config**

Create `src/i18n/routing.ts`:

```typescript
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "fr", "de", "es"],
  defaultLocale: "en",
  localePrefix: "as-needed",
});
```

**Step 3: Create navigation utilities**

Create `src/i18n/navigation.ts`:

```typescript
import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
```

**Step 4: Create request config**

Create `src/i18n/request.ts`:

```typescript
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as typeof routing.locales[number])) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
```

**Step 5: Update next.config.ts**

Add the next-intl plugin:

```typescript
import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {};

export default withNextIntl(nextConfig);
```

**Step 6: Commit**

```bash
git add package.json package-lock.json src/i18n/ next.config.ts
git commit -m "feat(i18n): install next-intl and create i18n config files"
```

---

### Task 2: Add middleware and restructure app directory

**Files:**
- Create: `src/middleware.ts`
- Move: `src/app/layout.tsx` → `src/app/[locale]/layout.tsx`
- Move: `src/app/page.tsx` → `src/app/[locale]/page.tsx`
- Keep: `src/app/globals.css`, `src/app/icon.png`, `src/app/robots.ts`, `src/app/sitemap.ts` stay at `src/app/`

**Step 1: Create middleware**

Create `src/middleware.ts`:

```typescript
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
```

**Step 2: Create the `[locale]` directory and move files**

Run:
```bash
mkdir -p src/app/\[locale\]
mv src/app/layout.tsx src/app/\[locale\]/layout.tsx
mv src/app/page.tsx src/app/\[locale\]/page.tsx
```

**Step 3: Update layout.tsx for locale support**

The layout at `src/app/[locale]/layout.tsx` needs these changes:
- Accept `params` with `locale`
- Add `NextIntlClientProvider` wrapper
- Set `lang` attribute dynamically
- Update CSS import path to `../globals.css`
- Convert static `metadata` to `generateMetadata` function (done in Task 10)

```typescript
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Script from "next/script";
import { Inter, JetBrains_Mono } from "next/font/google";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Navbar } from "@/components/navbar";
import { LoadingScreen } from "@/components/loading-screen";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

// Static JSON-LD — will be made locale-aware in Task 10
const JSON_LD = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Credat",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Cross-platform",
  description:
    "Open-source TypeScript SDK for issuing and verifying eIDAS 2.0 verifiable credentials. Supports SD-JWT VC, mDoc, OpenID4VCI, and OpenID4VP.",
  url: "https://credat.io",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  author: {
    "@type": "Organization",
    name: "Credat",
    url: "https://credat.io",
  },
});

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as typeof routing.locales[number])) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} ${jetbrains.variable}`}>
      <head>
        <Script
          id="json-ld"
          type="application/ld+json"
          strategy="beforeInteractive"
        >{JSON_LD}</Script>
      </head>
      <body className="bg-background text-foreground font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          <LoadingScreen />
          <Navbar />
          <SmoothScroll>{children}</SmoothScroll>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

**Step 4: Verify the app builds**

Run: `npm run build`
Expected: Build succeeds (will warn about missing messages files — that's fine, we create them next)

**Step 5: Commit**

```bash
git add src/middleware.ts src/app/\[locale\]/
git commit -m "feat(i18n): add middleware and restructure app under [locale]"
```

---

### Task 3: Create English translation file (en.json)

**Files:**
- Create: `messages/en.json`

**Step 1: Create the English messages file**

Create `messages/en.json` with all text extracted from every component. This is the source of truth — other languages will be translated from this.

```json
{
  "Metadata": {
    "title": "Credat — The Developer SDK for EU Digital Identity",
    "description": "Issue and verify eIDAS 2.0 verifiable credentials in 10 lines of TypeScript. SD-JWT VC & mDoc formats, OpenID4VC protocols, zero vendor lock-in. Open-source TypeScript SDK for eIDAS 2.0.",
    "ogDescription": "Issue and verify eIDAS 2.0 verifiable credentials in 10 lines of TypeScript. SD-JWT VC & mDoc formats, OpenID4VC protocols.",
    "twitterDescription": "Issue and verify eIDAS 2.0 verifiable credentials in 10 lines of TypeScript."
  },
  "Navbar": {
    "useCases": "Use Cases",
    "integrations": "Integrations",
    "howItWorks": "How it Works",
    "docs": "Docs",
    "github": "GitHub",
    "toggleMenu": "Toggle menu"
  },
  "Hero": {
    "badge": "Open Source SDK",
    "title": "The Developer SDK for EU Digital Identity",
    "description": "Issue and verify eIDAS 2.0 verifiable credentials in 10 lines of TypeScript. SD-JWT VC & mDoc formats, OpenID4VC protocols, zero vendor lock-in.",
    "ctaGithub": "View on GitHub",
    "ctaDocs": "Read the Docs"
  },
  "Showreel": {
    "demoLabel": "Product Demo Coming Soon",
    "badges": {
      "eidas": {
        "title": "eIDAS 2.0 Ready",
        "description": "Full compliance with the EU Digital Identity framework"
      },
      "typescript": {
        "title": "TypeScript SDK",
        "description": "Type-safe APIs with complete IntelliSense support"
      },
      "sdjwt": {
        "title": "SD-JWT VC",
        "description": "Selective disclosure for privacy-preserving credentials"
      },
      "openid": {
        "title": "OpenID4VC",
        "description": "Standard-compliant credential issuance and verification"
      }
    }
  },
  "Dx": {
    "badge": "Developer Experience",
    "title": "Your Credential Powerhouse",
    "description": "From credential schema design to issuance, verification, and selective disclosure — everything you need in a single, composable SDK.",
    "cta": "Get Started"
  },
  "UseCases": {
    "badge": "Use Cases",
    "title": "What You Can Build",
    "scrollLeft": "Scroll left",
    "scrollRight": "Scroll right",
    "items": {
      "nationalId": {
        "title": "National ID Wallet",
        "description": "Issue government-backed digital identity credentials compliant with the EU Digital Identity Wallet architecture. Support selective disclosure so citizens share only what's needed."
      },
      "diploma": {
        "title": "Digital Diploma",
        "description": "Universities and training providers can issue tamper-proof educational credentials. Employers verify qualifications instantly without contacting the institution."
      },
      "banking": {
        "title": "Banking KYC",
        "description": "Streamline customer onboarding with reusable identity credentials. Reduce KYC costs while maintaining regulatory compliance across jurisdictions."
      },
      "healthcare": {
        "title": "Healthcare Credentials",
        "description": "Issue and verify professional medical licenses, vaccination records, and patient consent credentials with privacy-preserving selective disclosure."
      },
      "travel": {
        "title": "Travel Documents",
        "description": "Enable seamless border crossing with mobile driving licenses and travel credentials based on ISO 18013-5 and mDoc formats."
      }
    }
  },
  "Integrations": {
    "badge": "Standards",
    "title": "Built On Open Standards",
    "credentialFormats": {
      "title": "Credential Formats",
      "description": "First-class support for both EU-mandated credential formats, ready for the EUDIW ecosystem.",
      "sdjwt": "SD-JWT VC",
      "sdjwtSub": "Selective Disclosure",
      "mdoc": "mDoc",
      "mdocSub": "ISO 18013-5"
    },
    "protocols": {
      "title": "Protocols",
      "openid4vci": {
        "name": "OpenID4VCI",
        "description": "Issue credentials using the OpenID for Verifiable Credential Issuance protocol."
      },
      "openid4vp": {
        "name": "OpenID4VP",
        "description": "Request and verify credential presentations with OpenID for Verifiable Presentations."
      },
      "didcomm": {
        "name": "DIDComm v2",
        "description": "Secure, peer-to-peer messaging for credential exchange between agents."
      }
    },
    "devTools": {
      "title": "Developer Tools",
      "install": {
        "label": "npm install credat",
        "sub": "Zero-config setup"
      },
      "typescript": {
        "label": "100% TypeScript",
        "sub": "Full type safety"
      },
      "bundle": {
        "label": "< 50kb gzipped",
        "sub": "Tree-shakeable"
      }
    }
  },
  "Testimonials": {
    "badge": "Testimonials",
    "title": "Trusted by Developers",
    "joinCommunity": "Join the Community",
    "starOnGithub": "Star on GitHub",
    "items": {
      "sophie": {
        "quote": "Credat made our eIDAS 2.0 integration effortless. We went from zero to issuing credentials in a single sprint.",
        "name": "Sophie L.",
        "role": "CTO"
      },
      "marcus": {
        "quote": "The SD-JWT VC implementation is rock-solid. Selective disclosure just works out of the box with clean APIs.",
        "name": "Marcus W.",
        "role": "Lead Engineer"
      },
      "elena": {
        "quote": "Finally an SDK that takes both credential formats seriously. The mDoc support saved us months of development.",
        "name": "Elena R.",
        "role": "Head of Digital ID"
      },
      "james": {
        "quote": "TypeScript-first with incredible DX. The type safety across credential schemas caught bugs we would have shipped.",
        "name": "James C.",
        "role": "Senior Developer"
      },
      "anna": {
        "quote": "We evaluated three SSI SDKs. Credat was the only one that handled OpenID4VC protocols correctly and at scale.",
        "name": "Anna K.",
        "role": "VP Engineering"
      },
      "pierre": {
        "quote": "Open source, spec-compliant, and maintained by people who understand the European identity landscape. Highly recommended.",
        "name": "Pierre D.",
        "role": "Founder"
      }
    }
  },
  "Kpi": {
    "items": {
      "eidas": {
        "number": "eIDAS 2.0",
        "label": "Full Compliance",
        "description": "Built from the ground up for the EU Digital Identity framework. Every API maps to a regulation requirement."
      },
      "bundle": {
        "number": "< 50kb",
        "label": "Gzipped Bundle",
        "description": "Tree-shakeable ESM architecture. Import only what you need — credential issuance, verification, or both."
      },
      "formats": {
        "number": "2 Formats",
        "label": "SD-JWT VC & mDoc",
        "description": "First-class support for both EU-mandated credential formats. Switch between them with a single config change."
      }
    }
  },
  "CodeScroll": {
    "badge": "How It Works",
    "steps": {
      "import": {
        "step": "Step 1",
        "title": "Import the SDK",
        "description": "A single import gives you everything — issuance, verification, and credential management."
      },
      "create": {
        "step": "Step 2",
        "title": "Create a Client",
        "description": "Configure your credential format and issuer identity. Supports SD-JWT VC and mDoc out of the box."
      },
      "issue": {
        "step": "Step 3",
        "title": "Issue a Credential",
        "description": "Define the credential type and claims. The SDK handles schema validation, signing, and encoding."
      },
      "verify": {
        "step": "Step 4",
        "title": "Verify Instantly",
        "description": "One-line verification with full status checking, signature validation, and revocation support."
      }
    }
  },
  "Cta": {
    "badge": "Open Source",
    "title": "Build the Future of Digital Identity",
    "description": "Credat is open source and built for the community. Start issuing eIDAS 2.0 credentials in minutes — or contribute to shape the standard.",
    "ctaGithub": "View on GitHub",
    "ctaDocs": "Read the Docs"
  },
  "Footer": {
    "brand": "The open-source TypeScript SDK for eIDAS 2.0 verifiable credentials. Issue, verify, and manage digital identity — in 10 lines of code.",
    "copyright": "© {year} Credat. Open source under Apache-2.0.",
    "builtWith": "Built with",
    "columns": {
      "product": {
        "title": "Product",
        "github": "GitHub",
        "documentation": "Documentation",
        "npmPackage": "npm Package",
        "changelog": "Changelog"
      },
      "resources": {
        "title": "Resources",
        "gettingStarted": "Getting Started",
        "apiReference": "API Reference",
        "examples": "Examples"
      },
      "legal": {
        "title": "Legal",
        "privacyPolicy": "Privacy Policy",
        "termsOfService": "Terms of Service",
        "license": "Apache-2.0 License"
      }
    }
  },
  "HeroFlow": {
    "ariaLabel": "Verifiable Credentials flow: Issuer issues credential to Holder, who presents it to Verifier",
    "issuer": "Issuer",
    "issuerDesc": "Issues credentials",
    "holder": "Holder",
    "holderDesc": "Stores in wallet",
    "verifier": "Verifier",
    "verifierDesc": "Checks validity",
    "presentation": "Presentation",
    "trustChain": "Trust Chain"
  },
  "LocaleSwitcher": {
    "label": "Language",
    "en": "EN",
    "fr": "FR",
    "de": "DE",
    "es": "ES"
  }
}
```

**Step 2: Commit**

```bash
git add messages/en.json
git commit -m "feat(i18n): add English translation file"
```

---

### Task 4: Create FR, DE, ES translation files

**Files:**
- Create: `messages/fr.json`
- Create: `messages/de.json`
- Create: `messages/es.json`

**Step 1: Generate translations**

Use AI to translate `messages/en.json` into French, German, and Spanish. Keep technical terms untranslated (eIDAS, SD-JWT VC, mDoc, OpenID4VCI, OpenID4VP, DIDComm, TypeScript, npm, ESM, EUDIW, ISO 18013-5, Apache-2.0). Keep proper names untranslated (Credat, Sophie L., Marcus W., etc.). Keep code-like strings untranslated (`npm install credat`, `100% TypeScript`, `< 50kb gzipped`).

Create all three files with the same JSON structure as `en.json` but with translated values.

**Step 2: Commit**

```bash
git add messages/fr.json messages/de.json messages/es.json
git commit -m "feat(i18n): add French, German, and Spanish translations"
```

---

### Task 5: Update Navbar with useTranslations and locale switcher

**Files:**
- Modify: `src/components/navbar.tsx`

**Step 1: Update navbar.tsx**

Changes needed:
1. Import `useTranslations` from `next-intl`
2. Import `Link` from `@/i18n/navigation` (replaces `next/link`)
3. Import `useRouter`, `usePathname` from `@/i18n/navigation`
4. Import `useLocale` from `next-intl`
5. Add `const t = useTranslations("Navbar")`
6. Replace all hardcoded nav text with `t("key")`
7. Add locale switcher dropdown after the GitHub button (before mobile menu toggle)

The locale switcher is a `<select>` element styled to match the nav design:
```tsx
const locale = useLocale();
const router = useRouter();
const pathname = usePathname();

function onLocaleChange(newLocale: string) {
  router.replace(pathname, { locale: newLocale });
}
```

Replace these hardcoded strings:
- "Use Cases" → `t("useCases")`
- "Integrations" → `t("integrations")`
- "How it Works" → `t("howItWorks")`
- "Docs" → `t("docs")`
- "GitHub" → `t("github")`
- "Toggle menu" aria-label → `t("toggleMenu")`

The `Link` from next/link used for the logo (`<Link href="/">`) should be replaced with `Link` from `@/i18n/navigation`.

**Step 2: Verify the dev server works**

Run: `npm run dev`
Navigate to `/` and `/fr` — navbar text should change.

**Step 3: Commit**

```bash
git add src/components/navbar.tsx
git commit -m "feat(i18n): internationalize navbar and add locale switcher"
```

---

### Task 6: Update Hero section

**Files:**
- Modify: `src/components/sections/section-hero.tsx`

**Step 1: Update section-hero.tsx**

1. Import `useTranslations` from `next-intl`
2. Add `const t = useTranslations("Hero")`
3. Replace hardcoded strings:
   - "Open Source SDK" → `t("badge")`
   - "The Developer SDK for EU Digital Identity" → `t("title")`
   - The description paragraph → `t("description")`
   - "View on GitHub" (both spans) → `t("ctaGithub")`
   - "Read the Docs" (both spans) → `t("ctaDocs")`

Note: The `MARQUEE_ITEMS` array contains technical terms (eIDAS 2.0, SD-JWT VC, etc.) that stay in English across all locales — no translation needed for these.

**Step 2: Commit**

```bash
git add src/components/sections/section-hero.tsx
git commit -m "feat(i18n): internationalize hero section"
```

---

### Task 7: Update Showreel, DX, and KPI sections

**Files:**
- Modify: `src/components/sections/section-showreel.tsx`
- Modify: `src/components/sections/section-dx.tsx`
- Modify: `src/components/sections/section-kpi.tsx`

**Step 1: Update section-showreel.tsx**

1. Import `useTranslations`
2. Add `const t = useTranslations("Showreel")`
3. Replace "Product Demo Coming Soon" → `t("demoLabel")`
4. Replace the `BADGES` array with translation-driven rendering:
   ```tsx
   const BADGE_KEYS = ["eidas", "typescript", "sdjwt", "openid"] as const;
   // In JSX:
   {BADGE_KEYS.map((key) => (
     <div key={key} className="badge-card glass-card p-5">
       <div className="grid-overlay" />
       <div className="relative z-10">
         <h3 className="text-sm font-semibold text-foreground mb-1">{t(`badges.${key}.title`)}</h3>
         <p className="text-xs text-foreground-secondary leading-relaxed">{t(`badges.${key}.description`)}</p>
       </div>
     </div>
   ))}
   ```

**Step 2: Update section-dx.tsx**

1. Import `useTranslations`
2. Add `const t = useTranslations("Dx")`
3. Replace:
   - "Developer Experience" → `t("badge")`
   - "Your Credential Powerhouse" → `t("title")`
   - Description paragraph → `t("description")`
   - "Get Started" (both spans) → `t("cta")`
4. Code block stays hardcoded — no changes needed

**Step 3: Update section-kpi.tsx**

1. Import `useTranslations`
2. Add `const t = useTranslations("Kpi")`
3. Replace `KPI_DATA` with translation-driven rendering:
   ```tsx
   const KPI_KEYS = ["eidas", "bundle", "formats"] as const;
   // In JSX:
   {KPI_KEYS.map((key) => (
     <div key={key} className="kpi-card glass-card p-8 flex flex-col min-h-[260px]">
       ...
       <div className="gradient-text headline-xl">{t(`items.${key}.number`)}</div>
       <h3 ...>{t(`items.${key}.label`)}</h3>
       <p ...>{t(`items.${key}.description`)}</p>
     </div>
   ))}
   ```

**Step 4: Commit**

```bash
git add src/components/sections/section-showreel.tsx src/components/sections/section-dx.tsx src/components/sections/section-kpi.tsx
git commit -m "feat(i18n): internationalize showreel, dx, and kpi sections"
```

---

### Task 8: Update Use Cases and Integrations sections

**Files:**
- Modify: `src/components/sections/section-use-cases.tsx`
- Modify: `src/components/sections/section-integrations.tsx`

**Step 1: Update section-use-cases.tsx**

1. Import `useTranslations`
2. Add `const t = useTranslations("UseCases")`
3. The `USE_CASES` array keeps non-translatable data (color, icon) but titles/descriptions come from translations:
   ```tsx
   const USE_CASE_KEYS = ["nationalId", "diploma", "banking", "healthcare", "travel"] as const;
   const USE_CASE_META = [
     { key: "nationalId", color: "#2563EB", icon: ShieldCheck },
     { key: "diploma", color: "#7C3AED", icon: GraduationCap },
     { key: "banking", color: "#059669", icon: Landmark },
     { key: "healthcare", color: "#DC2626", icon: HeartPulse },
     { key: "travel", color: "#D97706", icon: Plane },
   ] as const;
   ```
4. Replace:
   - "Use Cases" badge → `t("badge")`
   - "What You Can Build" → `t("title")`
   - "Scroll left"/"Scroll right" aria-labels → `t("scrollLeft")`, `t("scrollRight")`
   - Each card title → `t(\`items.${uc.key}.title\`)`
   - Each card description → `t(\`items.${uc.key}.description\`)`

**Step 2: Update section-integrations.tsx**

1. Import `useTranslations`
2. Add `const t = useTranslations("Integrations")`
3. Replace:
   - "Standards" badge → `t("badge")`
   - "Built On Open Standards" → `t("title")`
   - "Credential Formats" heading → `t("credentialFormats.title")`
   - Format descriptions → use `t("credentialFormats.description")` etc.
   - Protocols: use `t("protocols.openid4vci.name")`, `t("protocols.openid4vci.description")` etc.
   - Developer Tools: `t("devTools.title")`, `t("devTools.install.label")`, etc.
4. The `PROTOCOLS` and `STACK_CARDS` arrays become key-driven like the use cases

**Step 3: Commit**

```bash
git add src/components/sections/section-use-cases.tsx src/components/sections/section-integrations.tsx
git commit -m "feat(i18n): internationalize use cases and integrations sections"
```

---

### Task 9: Update Testimonials, Code Scroll, CTA, and Footer sections

**Files:**
- Modify: `src/components/sections/section-testimonials.tsx`
- Modify: `src/components/sections/section-code-scroll.tsx`
- Modify: `src/components/sections/section-cta.tsx`
- Modify: `src/components/sections/section-footer.tsx`

**Step 1: Update section-testimonials.tsx**

1. Import `useTranslations`
2. Add `const t = useTranslations("Testimonials")`
3. Replace:
   - "Testimonials" badge → `t("badge")`
   - "Trusted by Developers" → `t("title")`
   - "Join the Community" → `t("joinCommunity")`
   - "Star on GitHub" → `t("starOnGithub")`
4. Testimonials become key-driven:
   ```tsx
   const TESTIMONIAL_KEYS = ["sophie", "marcus", "elena", "james", "anna", "pierre"] as const;
   const TESTIMONIAL_AVATARS: Record<string, string> = {
     sophie: "https://i.pravatar.cc/80?img=5",
     marcus: "https://i.pravatar.cc/80?img=12",
     // ...
   };
   ```

**Step 2: Update section-code-scroll.tsx**

1. Import `useTranslations`
2. Add `const t = useTranslations("CodeScroll")`
3. Replace:
   - "How It Works" badge → `t("badge")`
   - Step titles/descriptions use translations:
     ```tsx
     const STEP_KEYS = ["import", "create", "issue", "verify"] as const;
     ```
   - "Step {i+1}" → `t(\`steps.${key}.step\`)`
   - Step title → `t(\`steps.${key}.title\`)`
   - Step desc → `t(\`steps.${key}.description\`)`
4. `CODE_LINES` array stays hardcoded in English — no changes
5. The `STEPS` array keeps `start`/`end` indices but titles/desc come from translations:
   ```tsx
   const STEP_RANGES = [
     { key: "import", start: 0, end: 1 },
     { key: "create", start: 2, end: 7 },
     { key: "issue", start: 8, end: 17 },
     { key: "verify", start: 18, end: 21 },
   ] as const;
   ```

**Step 3: Update section-cta.tsx**

1. Import `useTranslations`
2. Add `const t = useTranslations("Cta")`
3. Replace:
   - "Open Source" badge → `t("badge")`
   - "Build the Future of Digital Identity" → `t("title")`
   - Description → `t("description")`
   - "View on GitHub" → `t("ctaGithub")`
   - "Read the Docs" → `t("ctaDocs")`

**Step 4: Update section-footer.tsx**

1. Import `useTranslations`
2. Add `const t = useTranslations("Footer")`
3. Replace:
   - Brand description → `t("brand")`
   - Copyright → `t("copyright", { year: new Date().getFullYear() })`
   - "Built with" → `t("builtWith")`
   - Column titles and link labels use translations:
     ```tsx
     // Product column
     t("columns.product.title")
     t("columns.product.github")
     // etc.
     ```
4. The `NAV_COLUMNS` array becomes a rendering structure with keys that map to translations:
   ```tsx
   const FOOTER_COLUMNS = [
     {
       key: "product",
       links: [
         { key: "github", href: "https://github.com/credat/credat", external: true },
         { key: "documentation", href: "https://docs.credat.io", external: true },
         { key: "npmPackage", href: "https://www.npmjs.com/package/credat", external: true },
         { key: "changelog", href: "https://github.com/credat/credat/releases", external: true },
       ],
     },
     // ... resources, legal
   ];
   ```

**Step 5: Commit**

```bash
git add src/components/sections/section-testimonials.tsx src/components/sections/section-code-scroll.tsx src/components/sections/section-cta.tsx src/components/sections/section-footer.tsx
git commit -m "feat(i18n): internationalize testimonials, code scroll, CTA, and footer"
```

---

### Task 10: Update HeroFlow SVG and metadata/SEO

**Files:**
- Modify: `src/components/hero-flow.tsx`
- Modify: `src/app/[locale]/layout.tsx`
- Modify: `src/app/sitemap.ts`

**Step 1: Update hero-flow.tsx**

1. Import `useTranslations`
2. Add `const t = useTranslations("HeroFlow")`
3. Replace SVG text elements:
   - "Issuer" → `t("issuer")`
   - "Issues credentials" → `t("issuerDesc")`
   - "Holder" → `t("holder")`
   - "Stores in wallet" → `t("holderDesc")`
   - "Verifier" → `t("verifier")`
   - "Checks validity" → `t("verifierDesc")`
   - "Presentation" → `t("presentation")`
   - "Trust Chain" → `t("trustChain")`
   - `aria-label` → `t("ariaLabel")`

**Step 2: Add generateMetadata to layout.tsx**

Replace the static `metadata` export with a dynamic `generateMetadata` function:

```typescript
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  const localeMap: Record<string, string> = {
    en: "en_US",
    fr: "fr_FR",
    de: "de_DE",
    es: "es_ES",
  };

  return {
    title: t("title"),
    description: t("description"),
    keywords: [
      "eIDAS 2.0", "verifiable credentials", "SD-JWT VC", "mDoc",
      "OpenID4VCI", "OpenID4VP", "digital identity", "SSI",
      "self-sovereign identity", "TypeScript SDK", "EUDIW",
      "EU Digital Identity Wallet", "DIDComm",
      "credential issuance", "credential verification",
    ],
    metadataBase: new URL("https://credat.io"),
    openGraph: {
      title: t("title"),
      description: t("ogDescription"),
      url: "https://credat.io",
      siteName: "Credat",
      type: "website",
      locale: localeMap[locale] ?? "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("twitterDescription"),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      languages: {
        en: "/",
        fr: "/fr",
        de: "/de",
        es: "/es",
      },
    },
    other: {
      "theme-color": "#FFFFFF",
    },
  };
}
```

Also make the JSON-LD locale-aware by using `getTranslations` in the layout component and setting `inLanguage`.

**Step 3: Update sitemap.ts**

```typescript
import type { MetadataRoute } from "next";

const locales = ["en", "fr", "de", "es"];
const baseUrl = "https://credat.io";

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url: locale === "en" ? baseUrl : `${baseUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 1,
    alternates: {
      languages: Object.fromEntries(
        locales.map((l) => [l, l === "en" ? baseUrl : `${baseUrl}/${l}`])
      ),
    },
  }));
}
```

**Step 4: Commit**

```bash
git add src/components/hero-flow.tsx src/app/\[locale\]/layout.tsx src/app/sitemap.ts
git commit -m "feat(i18n): internationalize hero flow SVG, metadata, and sitemap"
```

---

### Task 11: Build verification and polish

**Step 1: Run build**

Run: `npm run build`
Expected: Clean build with no errors

**Step 2: Run dev server and test all locales**

Run: `npm run dev`

Test manually:
- `/` — English (default)
- `/fr` — French
- `/de` — German
- `/es` — Spanish
- Locale switcher works correctly
- All sections show translated text
- Code blocks stay in English
- GSAP animations work on all locales
- Navbar locale switcher switches correctly
- SEO tags are locale-aware (inspect `<head>`)

**Step 3: Run lint**

Run: `npm run lint`
Expected: No lint errors

**Step 4: Final commit if any fixes needed**

```bash
git add -A
git commit -m "fix(i18n): polish and fix any issues found during testing"
```
