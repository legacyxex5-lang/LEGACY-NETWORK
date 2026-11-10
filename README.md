# Legacy Network — Digital Laboratory

A cinematic, scroll-driven digital studio experience for `legacynets.xyz`.

## Stack
- Next.js 15 / React 19 / TypeScript
- Three.js / React Three Fiber / Drei
- GSAP + ScrollTrigger and Lenis
- Cloudflare Workers through OpenNext

## Experience
- A procedural 3D laboratory built from native Three.js geometry
- Scroll-driven camera journey through the laboratory
- Responsive capability, founder, vision, archive and contact chapters
- Founder portrait served as optimized WebP
- Reduced-motion CSS support and responsive layouts
- No paid 3D assets or external 3D model downloads required

## Run locally
Requires Node.js 20.9+.

```bash
npm install
npm run dev
```

## Cloudflare
Build:
```bash
npx @opennextjs/cloudflare build
```

Deploy:
```bash
npx @opennextjs/cloudflare deploy
```

## Before publishing
1. Confirm the custom domain points to the Cloudflare Worker.
2. Create a real `/og-cover.jpg` image (1200x630) and favicon.
3. Add the domain to Google Search Console and submit `/sitemap.xml`.
4. Add business/legal disclosures and any additional contact channels when available.
5. Test the 3D journey on target phones and desktop GPUs. The renderer uses adaptive device pixel ratio limits; visual composition remains consistent across screen sizes.
6. Keep archive entries labelled as concepts, experiments or prototypes until there is genuine completed work to present.

The current scene is procedural and does not depend on paid 3D assets. Tune lighting, geometry and rendering after real-device testing rather than assuming every device has identical GPU capacity.


## Production notes

- This is a portfolio and lead-generation website. It has no database, authentication, admin dashboard, or paid backend services.
- Project enquiries use the founder's email link (`legacynetworkx@gmail.com`).
- The 3D laboratory is rendered in the browser with React Three Fiber. If WebGL is unavailable, the page retains its content and dark visual fallback.
- The founder portrait is served as an optimized WebP from `public/images/yamagiri-portrait.webp`.
- Open Graph preview artwork is stored at `public/og-cover.jpg`.

## Cloudflare deployment

Keep the existing Cloudflare Worker settings and repository connection. The configured build command is:

```bash
npx @opennextjs/cloudflare build
```

The deploy command is:

```bash
npx @opennextjs/cloudflare deploy
```

Do not commit `.open-next/`, `.wrangler/`, `.next/`, or `node_modules/`; these are generated during the build.
