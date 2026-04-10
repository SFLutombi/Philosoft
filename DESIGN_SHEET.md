# Philosift Design Sheet

Last updated: 2026-04-10

## 1) Product Voice
- Brand name: Philosift
- Concept name: Archive (used as destination/section language)
- Tone: dark-academic, premium, precise, ritual-like
- Copy style: concise, meaningful, never playful or meme-like

## 2) Typography
- Display/Headlines: Newsreader
- Body/UI labels: Inter
- Headline style: italic serif for hero statements, normal serif for module titles
- Tracking:
  - Kicker/labels: 0.2em to 0.5em
  - Body: normal
- Text hierarchy:
  - Hero headline: 34px-68px responsive range
  - Section title: 28px-48px
  - Body: 14px-20px
  - Labels: 9px-11px uppercase

## 3) Color Tokens
- Primary gold: #e9c176
- Primary dark text: #412d00
- Surface: #131313
- Surface low: #1c1b1b
- Surface high: #2a2a2a
- Outline variant: #444748
- On-surface text: #e5e2e1
- Muted text: #c4c7c7

## 4) Spacing Scale
- 4px micro: icon/text nudges
- 8px tight: compact stacks
- 12px close: card internals
- 16px base: section internals
- 24px medium: block separation
- 32px strong: major block separation
- 48px+ cinematic: hero breathing room

## 5) Layout Rules
- Landing page must fit one viewport on desktop and mobile with no clipping.
- Fixed top bar must be visually light (compact height).
- Keep clear safe area under fixed header and above bottom ornaments.
- No accidental page scroll caused by hero content overflow.
- On mobile:
  - Collapse image grids to one column
  - Reduce decorative-only elements first
  - Preserve core text hierarchy and CTA visibility

## 6) Component Rules
- Buttons:
  - Primary: gold background, dark text, uppercase label
  - Secondary: text/ghost style
- Cards: hard corners (0 radius)
- Divider style: subtle lines or tonal surfaces, never heavy borders
- Icons: Material Symbols outlined (fill only when intentionally active)

## 7) Motion Rules
- Keep motion subtle and slow enough to feel premium.
- Avoid bouncy or playful transitions.
- Use fades/slight transforms only for emphasis.

## 8) Responsiveness Checklist
- 360x800: no clipped heading, full CTA visibility
- 390x844: no overlap with fixed top bar
- 768x1024: balanced spacing, no huge dead zones
- 1366x768: no bottom clipping, no forced scroll
- 1920x1080: maintain composition without over-stretching

## 9) Content and Naming Rules
- Keep landing secondary CTA text: "Go to the Archive".
- Dashboard is the Archive destination.
- Use "Philosift" for product branding in top-level labels.

## 10) QA Before Merge
- Run build: npm run build
- Verify no console errors in dev
- Check landing for clipping at top/bottom on desktop and mobile
- Confirm copy and CTA text match spec exactly
