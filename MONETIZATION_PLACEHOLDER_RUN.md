# Monetization Placeholder Run Notes

Date: 2026-04-13

## Completed In This Run
- Kept ontological traits and their explanation free on the results experience.
- Added placeholder premium sections in this order:
  1. Personal Growth
  2. Career Path
  3. Relationships
- Added domain-level "Influential Traits" teaser chips for each premium section.
- Added locked placeholder insight cards and a unified "Unlock Full Results" CTA per section.
- Extended archetype result payloads with placeholder domain previews:
  - personalGrowthPreview
  - careerPreview
  - relationshipPreview
- Added compatibility logic so older stored profiles without domain previews are recomputed.

## Still Placeholder (To Be Converted)
- Unlock CTA does not enforce access yet.
- Locked cards are illustrative placeholder content.
- No entitlement checks or subscription state.

## Next Implementation Phase (Real Monetization)
- Auth: Clerk
- Database: Supabase
- Payments: LemonSqueezy

### Conversion Checklist
1. Add Clerk authentication and user identity binding for results.
2. Persist full result payloads in Supabase with user ownership.
3. Create entitlement table and subscription status sync from LemonSqueezy.
4. Replace placeholder lock states with real entitlement-based gating.
5. Replace placeholder cards with final generated/curated premium content.
6. Add analytics events for unlock click, checkout start, checkout success, and section view depth.
