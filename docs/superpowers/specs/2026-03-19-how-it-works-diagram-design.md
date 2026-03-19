# How It Works — Visual Protocol Diagram Section

**Issue**: #5 — Add "How it Works" technical diagram section
**Date**: 2026-03-19
**Status**: Approved

---

## Summary

Add a scroll-animated visual diagram section that illustrates the 5-step Credat trust protocol flow between three parties (Owner, Agent, Service). Placed immediately before the existing CodeScroll section, the two form a cohesive "How it Works" block: visual overview first, code implementation second.

## Placement

**Position in page flow**: Between SectionUseCases (4) and SectionCodeScroll (5).

```
1. SectionHero
2. SectionShowreel (Problem)
3. SectionDx (Developer Experience)
4. SectionUseCases
5. **SectionHowItWorks** ← NEW
6. SectionCodeScroll (How It Works — code)
7. SectionIntegrations
8. SectionKpi
9. SectionTestimonials
10. SectionCta
11. SectionFooter
```

**Inter-section spacing**: Use `section-spacer-sm` (not full `section-spacer`) between SectionHowItWorks and SectionCodeScroll to keep the two sections feeling like a cohesive block. Standard `section-spacer` above and below the pair.

## File Structure

- `src/components/sections/section-how-it-works.tsx` — Main component
- `messages/{en,fr,de,es}.json` — New `HowItWorks` translation key in each locale

## Anchor / ID Strategy

- `SectionHowItWorks` gets `id="how-it-works"` (the navbar anchor lands here now, since the visual overview comes first)
- `SectionCodeScroll` gets `id="how-it-works-code"` (renamed from `how-it-works`)
- Navbar `href="#how-it-works"` continues to work without changes

## Design

### Section Header

- **Badge**: "The Protocol" (differentiates from CodeScroll's "How It Works" badge)
- **Title**: "From Identity to Trust in 5 Steps" (or similar — localized)
- Standard `pill-badge` + `section-textbox` + `headline-lg` pattern

### Three Party Nodes

Aligned horizontally on desktop. Each is a rounded glass-card element with:
- Icon (reusing HeroFlow icon style)
- Label (Owner / Agent / Service)
- Sublabel (role description)

Color scheme matches HeroFlow:
- **Owner**: Blue (#2563EB)
- **Agent**: Purple (#7C3AED)
- **Service**: Green (#059669)

### Five Protocol Steps

Messages/arrows flow between the three party nodes:

| Step | From | To | Direction | Label | Description |
|------|------|----|-----------|-------|-------------|
| 1 | Owner | Agent | left → center | Create Identity | Owner creates a DID for the agent |
| 2 | Owner | Agent | left → center | Delegate Permissions | Owner issues a scoped VC to the agent |
| 3 | Service | Agent | right → center (reverse) | Challenge | Service sends a verification challenge |
| 4 | Agent | Service | center → right | Present Credentials | Agent responds with delegation proof |
| 5 | Service | — | n/a (node effect) | Verify & Grant | Service verifies and grants access |

**Step 3 arrow direction**: This is intentionally right-to-left (Service challenging the Agent). Visually distinguished with a different arrow color tint and reversed arrowhead.

**Step 5 visual**: No arrow — instead, a green checkmark badge animates onto the Service node (scale + back.out ease, same as HeroFlow's `.flow-check`), and a subtle green pulse/glow radiates from the Service node to indicate verification complete.

**Note on step count**: This section has 5 steps while CodeScroll has 4. This is intentional — the visual diagram separates "Challenge" and "Present" into distinct steps for clarity, while the code section combines them since they happen in the same function call. The two sections are complementary, not 1:1 mirrors.

### Desktop Layout (≥1024px)

- SVG-based diagram for clean scaling
- `viewBox="0 0 900 320"` — wide aspect ratio (~2.8:1) to fit 3 horizontal nodes with arrows between them
- SVG is `width: 100%` with `max-width: 900px`, centered in the section
- Three nodes positioned horizontally: Owner (x~150), Agent (x~450), Service (x~750)
- Protocol messages are labeled arrows between nodes, stacked vertically below the nodes
- Section uses `min-height: 250vh` for scroll room (shorter than CodeScroll's 300vh since steps need less detail)
- Combined scroll distance for both sections: ~550vh — acceptable given the content density
- GSAP ScrollTrigger scrub drives step progression:
  - Each step: arrow draws in (stroke-dashoffset animation), label blurs in, description text appears
  - Active step at full opacity; previous steps dim to ~30%
  - Party nodes entrance: scale + blur-in on first viewport entry
- Step descriptions appear as HTML text beside the SVG (not inside SVG), positioned via flexbox — this ensures proper text rendering and i18n support

### Mobile Layout (<1024px)

- Vertical timeline with numbered step cards
- Three party nodes shown as a compact horizontal legend at the top (small circles + labels)
- No scroll-linked animation — stagger entrance on viewport entry (consistent with CodeScroll mobile pattern)
- Each step is a card with: step number, colored dot matching the "from" party, title, description, and from→to indicator
- Uses standard Tailwind layout (no SVG on mobile)

### Responsive Switch

The existing `desktop-only` class forces `display: grid !important`, which is fine for the desktop two-column layout (SVG on left/center, step descriptions on right — or full-width SVG with descriptions below). The mobile layout uses `mobile-only` which forces `display: flex !important` — suitable for the vertical timeline. No new responsive utility classes needed.

### Animation Details (Desktop)

Pattern matches existing codebase conventions:
- `gsap.context()` with ref, cleanup via `ctx.revert()`
- ScrollTrigger with scrub for step progression
- Blur-in entrance (filter: blur(8px) → 0, opacity: 0 → 1)
- Arrow draw: `strokeDashoffset` animation (same as HeroFlow paths)
- Step descriptions: char-by-char reveal via SplitText (same as CodeScroll)
- `useState` for `activeStep` driven by ScrollTrigger `onUpdate`
- **Step 5 checkmark**: scale from 0 with `back.out(2)` ease (same as HeroFlow `.flow-check`)

### `prefers-reduced-motion` Behavior

When reduced motion is active:
- Section collapses to standard viewport height (no `min-height: 250vh`)
- All arrows, labels, and descriptions render immediately at full opacity (static diagram)
- No ScrollTrigger scrub — the complete diagram is visible on load
- Checkmark on Service node visible from the start
- Detect via `useSyncExternalStore` pattern (same as HeroFlow)

### Styling

Reuses existing CSS classes:
- `glass-card` / `glass-card-accent` for node containers
- `pill-badge` for section badge
- `section-textbox` for header
- `ambient-glow-soft` for background accent
- `desktop-only` / `mobile-only` for responsive switch
- Dashed lines with gradient strokes (same as HeroFlow `flow-path`)

New CSS additions in `globals.css`:
- `.how-it-works-section` — min-height for scroll room (desktop only, disabled under `prefers-reduced-motion`)
- `.protocol-step` — step label/description styling with opacity transition
- `.protocol-arrow` — arrow base styling

### i18n

New `HowItWorks` key in all 4 locale files (`messages/{en,fr,de,es}.json`).

Party labels are intentionally duplicated from `HeroFlow` (e.g., `HowItWorks.owner` vs `HeroFlow.owner`) since the descriptions differ ("Controls permissions" vs "Delegates permissions") and may diverge further. No shared key needed.

```json
{
  "HowItWorks": {
    "badge": "The Protocol",
    "title": "From Identity to Trust in 5 Steps",
    "owner": "Owner",
    "ownerDesc": "Controls permissions",
    "agent": "Agent",
    "agentDesc": "Proves identity",
    "service": "Service",
    "serviceDesc": "Verifies trust",
    "steps": {
      "createIdentity": {
        "step": "Step 1",
        "title": "Create Identity",
        "description": "The owner creates a decentralized identity (DID) for their AI agent, tied to their domain."
      },
      "delegate": {
        "step": "Step 2",
        "title": "Delegate Permissions",
        "description": "The owner issues a Verifiable Credential granting the agent scoped permissions — what it can do and its limits."
      },
      "challenge": {
        "step": "Step 3",
        "title": "Challenge",
        "description": "When the agent arrives at a service, the service issues a cryptographic challenge to verify its identity."
      },
      "present": {
        "step": "Step 4",
        "title": "Present Credentials",
        "description": "The agent responds with its delegation proof — its identity, the owner's credential, and the allowed scopes."
      },
      "verify": {
        "step": "Step 5",
        "title": "Verify & Grant Access",
        "description": "The service verifies the full chain: agent identity, owner delegation, and scopes. Trust established."
      }
    }
  }
}
```

Translations for fr, de, es will follow the same structure with localized content.

## Accessibility

- SVG diagram has `role="img"` and descriptive `aria-label`
- Step descriptions are semantic HTML (not SVG-only text)
- `prefers-reduced-motion`: full static diagram shown, scroll room removed (see section above)
- Mobile timeline is fully accessible without animation dependency

## Out of Scope

- No interactivity beyond scroll animation (no click/hover states on steps)
- No dark mode considerations (consistent with rest of site)
