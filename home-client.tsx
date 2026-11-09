'use client';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import Link from 'next/link';
const Scene = dynamic(() => import('./scene'), { ssr: false, loading: () => <div className="scene scene-fallback" /> });

export default function HomeClient() {
  useEffect(() => {
    let lenis: { raf: (time: number) => void; destroy: () => void } | undefined;
    let frame = 0;
    let ctx: { revert: () => void } | undefined;
    let alive = true;
    Promise.all([import('lenis'), import('gsap'), import('gsap/ScrollTrigger')]).then(([LenisModule, gsapModule, scrollModule]) => {
      if (!alive) return;
      const Lenis = LenisModule.default;
      const gsap = gsapModule.gsap;
      const ScrollTrigger = scrollModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);
      lenis = new Lenis({ smoothWheel: true, lerp: 0.075 });
      const raf = (time: number) => { lenis?.raf(time); frame = requestAnimationFrame(raf); };
      frame = requestAnimationFrame(raf);
      ctx = gsap.context(() => {
        gsap.fromTo('.hero-copy > *', { y: 32, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: 'power3.out', delay: 0.2 });
        gsap.to('.hero-orb', { yPercent: 18, scale: 0.88, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
        gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => gsap.fromTo(el, { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 88%' } }));
      });
    });
    return () => { alive = false; cancelAnimationFrame(frame); lenis?.destroy(); ctx?.revert(); };
  }, []);
  return <>
    <header className="nav"><Link href="#top" className="wordmark">LEGACY<span>.</span></Link><nav><a href="#work">Work</a><a href="#services">Services</a><a href="#about">About</a></nav><a className="nav-cta" href="#contact">Start a project <span>↗</span></a></header>
    <main id="top">
      <section className="hero">
        <div className="hero-grid" />
        <div className="hero-orb"><Scene /></div>
        <div className="hero-copy">
          <p className="eyebrow"><i /> INDEPENDENT DIGITAL STUDIO · NIGERIA / WORLDWIDE</p>
          <h1>We make<br /><em>digital</em> matter.</h1>
          <p className="hero-sub">Thoughtful websites, useful software and immersive digital experiences for people building what comes next.</p>
          <div className="hero-actions"><a className="button button-primary" href="#work">Explore our work <span>↘</span></a><a className="text-link" href="#contact">Have a project in mind? <span>↗</span></a></div>
        </div>
        <div className="hero-bottom"><span>SCROLL TO EXPLORE</span><span>01 — 04</span><span>DESIGN WITH INTENTION</span></div>
        <div className="hero-index">LN®<br />2026</div>
      </section>
      <section className="intro section-pad" data-reveal><p className="eyebrow">01 / THE STUDIO</p><div><h2>Good technology should feel <em>effortless.</em></h2><p className="body-copy">Legacy Network is an independent digital studio founded by Yamagiri. We bring design, engineering and clear thinking together to create digital products that solve real problems.</p></div></section>
      <section className="work section-pad" id="work"><div className="section-heading" data-reveal><p className="eyebrow">02 / SELECTED WORK</p><h2>Built to be <em>useful.</em></h2><p className="body-copy">A selection of experiments and products from the studio. Each project is presented with its real scope and contribution.</p></div>
        <div className="project-grid">
          <article className="project project-large" data-reveal><div className="project-art art-inventory"><div className="ui-window"><div className="ui-top"><b>LEGACY / INVENTORY</b><span>● LIVE CONCEPT</span></div><div className="ui-stats"><div><small>ITEMS TRACKED</small><strong>048</strong></div><div><small>SALES TODAY</small><strong>₦—</strong></div><div><small>ACTIVITY</small><strong>↗</strong></div></div><div className="ui-bars"><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></div></div></div><div className="project-meta"><div><p className="eyebrow">01 — BUSINESS SOFTWARE</p><h3>School Inventory System</h3><p>Inventory, sales recording and staff workflows for a school environment.</p></div><span className="project-arrow">↗</span></div></article>
          <article className="project" data-reveal><div className="project-art art-network"><div className="planet"><span>LEGACY<br/>NETWORK</span></div><div className="orbit orbit-a"/><div className="orbit orbit-b"/></div><div className="project-meta"><div><p className="eyebrow">02 — DIGITAL INFRASTRUCTURE</p><h3>Gaming Network Systems</h3><p>Server infrastructure and connected player experiences.</p></div><span className="project-arrow">↗</span></div></article>
          <article className="project" data-reveal><div className="project-art art-ai"><div className="ai-core">LN<span>✳</span></div><div className="ai-line line-a"/><div className="ai-line line-b"/><div className="ai-line line-c"/></div><div className="project-meta"><div><p className="eyebrow">03 — AI & AUTOMATION</p><h3>Intelligent Workflows</h3><p>Exploring natural-language interfaces for everyday operations.</p></div><span className="project-arrow">↗</span></div></article>
        </div><p className="disclaimer">Project visuals are concept representations. Case studies will distinguish shipped features, prototypes and work in progress.</p>
      </section>
      <section className="services section-pad" id="services"><div data-reveal><p className="eyebrow">03 / WHAT WE DO</p><h2>From first idea<br />to <em>real-world use.</em></h2></div><div className="service-list" data-reveal><div><span>01</span><h3>Web design & development</h3><p>Distinctive, responsive websites built around your goals.</p><b>↗</b></div><div><span>02</span><h3>Business software</h3><p>Practical tools that simplify operations and workflows.</p><b>↗</b></div><div><span>03</span><h3>3D & interactive experiences</h3><p>Immersive interfaces that make digital products memorable.</p><b>↗</b></div><div><span>04</span><h3>AI-powered workflows</h3><p>Thoughtful automation for repetitive digital tasks.</p><b>↗</b></div></div></section>
      <section className="about section-pad" id="about"><div className="about-mark" data-reveal><span>Y.</span><i>FOUNDER / BUILDER</i></div><div data-reveal><p className="eyebrow">04 / THE PERSON BEHIND THE WORK</p><h2>Independent thinking.<br /><em>Collective ambition.</em></h2><p className="body-copy">I'm Yamagiri, the founder of Legacy Network. I work across design and development, turning complex ideas into clear, useful digital experiences. The studio is built on curiosity, craft and a commitment to doing the work properly.</p><a className="text-link" href="#contact">Let's build something meaningful <span>↗</span></a></div></section>
      <section className="contact section-pad" id="contact" data-reveal><p className="eyebrow">05 / HAVE SOMETHING IN MIND?</p><h2>Let's make the<br /><em>next thing matter.</em></h2><a className="button button-primary" href="mailto:hello@legacynets.xyz?subject=Project%20enquiry">Start a conversation <span>↗</span></a><p className="contact-note">Replace this email with your verified business contact before launch.</p></section>
    </main>
    <footer><Link href="#top" className="wordmark">LEGACY<span>.</span></Link><p>Independent by nature. Intentional by design.</p><span>© 2026 LEGACY NETWORK</span></footer>
  </>;
}
