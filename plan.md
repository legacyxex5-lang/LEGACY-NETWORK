# Legacy Network Portfolio Refresh

## Direction

Transform the existing cinematic digital laboratory into a client-ready premium digital studio portfolio. Preserve the procedural 3D journey, but shift the visual language from neon sci-fi toward quiet luxury: architectural depth, dark mineral tones, warm brass accents, deliberate motion, and clearer editorial space.

## Outcomes

- Make the offer understandable within the first viewport.
- Position Legacy Network around business outcomes rather than a broad technology list.
- Keep the 3D experience as a signature layer, not the only story.
- Present concepts honestly while making them feel like credible case-study directions.
- Add a clear, low-friction path to start a project by email or WhatsApp.
- Improve crawler-visible copy, metadata, headings, and internal anchor structure.
- Preserve responsive behavior, reduced-motion support, and the existing Next.js/Three.js stack.

## Content architecture

- Arrival: clear positioning for ambitious businesses.
- Practice: concise explanation of the studio's point of view.
- Services: three outcome-led service divisions: Digital Presence, Business Systems, Intelligent Operations.
- Process: Discover, Shape, Build, Refine.
- Founder: human origin story with business relevance.
- Archive: honest concept and prototype directions.
- Contact: direct invitation with email and WhatsApp paths.

## Visual system

- Design movement: editorial digital architecture with quiet luxury.
- Core principles: restraint, material depth, human clarity, and purposeful motion.
- Palette: near-black mineral green foundation, parchment-white text, muted brass for premium emphasis, and restrained mint for system status.
- Layout: asymmetrical editorial composition with large type, long horizontal rules, and architectural captions instead of dense dashboard grids.
- Signature elements: brass hairlines, chapter numbering, and a slow-moving architectural 3D environment.
- Interaction: hover states feel tactile and calm; motion reveals hierarchy rather than performing for its own sake.
- Typography: Manrope for modern utility and a serif italic accent for legacy, craft, and emphasis.
- Brand essence: a founder-led digital studio that makes ambitious businesses look clearer, work smarter, and move with confidence.
- Voice: human, precise, quietly confident. Example lines: “Digital systems for businesses ready to move with more intention.” and “Good technology should leave people with more time, not more things to manage.”

## Technical approach

Reuse the existing client-side journey, React Three Fiber scene, GSAP/Lenis animation, and static metadata. Rewrite the home content and CSS as the primary change. Add contact alternatives without a backend, keep all public content in initial JSX, maintain reduced motion and mobile breakpoints, then run the production build and push the intended change to `main`.
