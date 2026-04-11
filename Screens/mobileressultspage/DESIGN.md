# Design System Strategy: The Digital Grimoire

## 1. Overview & Creative North Star: "The Digital Grimoire"
This design system is a transition from the physical to the metaphysical. Our Creative North Star, **The Digital Grimoire**, reimagines the ancient archive for a premium Gen-Z demographic. We are not building a standard utility app; we are crafting a digital artifact. 

To break the "template" look, this system rejects the rigid, symmetrical grids of corporate UI. Instead, we utilize:
*   **Intentional Asymmetry:** Off-center typography and staggered card layouts to mimic the hand-placed nature of rare manuscripts.
*   **Cinematic Depth:** Using deep blacks and ink blues to create an "infinite" canvas where content emerges from the shadows.
*   **Aspirational Friction:** Interactions that feel deliberate and weighty, moving away from "fast-casual" UI toward a curated, editorial experience.

## 2. Colors & Surface Philosophy
The palette is rooted in a midnight-dark aesthetic, accented by the warmth of aged parchment and the warning of ritual crimson.

### The "No-Line" Rule
Standard 1px solid borders are strictly prohibited for sectioning. They are the hallmark of generic design. Boundaries must be defined through:
*   **Tonal Shifts:** Place a section using `surface-container-low` (#1c1b1b) directly against the main `background` (#131313). 
*   **Atmospheric Transitions:** Use subtle vertical gradients to separate content blocks, moving from `surface` to `surface-container-highest` to create a natural, soft horizon line.

### Surface Hierarchy & Nesting
Treat the UI as physical layers of vellum and stone.
*   **The Base:** `surface` (#131313) is your table.
*   **The Document:** `surface-container-low` (#1c1b1b) acts as the primary "page" container.
*   **The Insight:** `surface-container-highest` (#353534) is used for nested elements that require immediate focus (e.g., a quote or a cipher).

### The Glass & Gradient Rule
To achieve a "modern occult" feel, use **Glassmorphism** for floating headers or navigation bars. 
*   **Token Application:** Use `surface-variant` at 60% opacity with a `20px` backdrop-blur. 
*   **Signature Textures:** Apply a subtle 2% grain overlay across the `background` to eliminate digital banding and provide a tactile, paper-like "soul." For primary CTAs, use a radial gradient from `primary` (#e9c176) to `primary-container` (#c5a059) to mimic the sheen of gold foil.

## 3. Typography: Editorial Authority
The typography is a dialogue between the ancient and the modern.

*   **Headlines (Newsreader):** Use the serif for all `display` and `headline` roles. It should feel expressive and literary. Tighten the letter-spacing (tracking) by -2% to give it a modern, high-fashion edge.
*   **Body & Labels (Manrope):** Use the sans-serif for functional reading. It provides the "clean" counter-balance to the expressive serif. 
*   **Hierarchy Tip:** Contrast is your primary tool. A `display-lg` headline should often be paired with a much smaller `label-md` in all-caps (tracked out +10%) to create an editorial, "magical" rhythm.

## 4. Elevation & Depth
In this system, light doesn't come from a "top-left" source; it glows from within the content.

*   **The Layering Principle:** Avoid drop shadows for cards. Instead, achieve lift by stacking `surface-container-lowest` (#0e0e0e) onto a `surface-bright` (#3a3939) background. 
*   **Ambient Shadows:** If an element must float (like a modal), use a high-spread, low-opacity shadow tinted with `secondary` (#b7c8de). 
    *   *Spec:* `0px 20px 40px rgba(183, 200, 222, 0.08)`
*   **The "Ghost Border":** If a container requires a boundary for accessibility, use the `outline-variant` (#4e4639) at **15% opacity**. It should be felt, not seen.
*   **Scroll-to-Ink Effect:** As users scroll, use a `surface-container-lowest` fill on the Top App Bar with a glassmorphic blur to make it feel like the archive is receding into the shadows.

## 5. Components

### Buttons (The Sigils)
*   **Primary:** A "Gold Foil" pill. Uses `primary` (#e9c176) background with `on-primary` (#412d00) text. No border. Apply a very subtle inner-shadow to give it a "stamped" appearance.
*   **Secondary:** An "Ink-Wash" variant. No fill. Uses a `Ghost Border` (outline-variant at 20%) with `primary` text.
*   **Tertiary:** Pure text in `primary`, but using `label-md` styling (All-caps, wide tracking).

### Cards & Discovery
*   **Rule:** Forbid divider lines. Use `1.5rem` or `2rem` of vertical space to separate content.
*   **Archive Cards:** Use `surface-container-low`. The card should have an asymmetrical padding (e.g., more padding at the bottom than the top) to feel like a hand-laid scrap of paper.

### Input Fields (The Scriptorium)
*   **Visual Style:** Do not use four-sided boxes. Use a single bottom border (`outline-variant` at 30%) or a subtle `surface-container-highest` background fill with a `sm` (0.125rem) corner radius.
*   **Interaction:** On focus, the bottom border should transition to `primary` (gold) and a soft glow should emanate from the base.

### Selection & Filtering (The Ciphers)
*   **Chips:** Use `full` roundedness. Unselected: `surface-container-high`. Selected: `tertiary-container` (#ff806d) with `on-tertiary-container` (#7d0000). This provides the "Deep Crimson" accent mentioned in the brief.

## 6. Do's and Don'ts

### Do:
*   **Embrace Negative Space:** Allow large "breathing rooms" of `#131313` black. This is where the mystery lives.
*   **Layer Text over Texture:** Place `Newsreader` headlines over subtle marble or grain textures to break the flat digital plane.
*   **Use Asymmetric Grids:** If you have three items, make one larger than the others.

### Don't:
*   **Don't use pure white (#FFFFFF):** It breaks the immersion. Use `on-surface` (#e5e2e1) or `primary-fixed` (#ffdea5).
*   **Don't use standard icons:** Use thin-stroke (1pt or 1.5pt) custom iconography that feels like a hand-drawn cipher.
*   **Don't use bouncy animations:** Transitions should be "Cinematic"—slow fades (`300ms+`) and elegant vertical slides that feel like a heavy stone door opening.