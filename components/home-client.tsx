'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const Scene = dynamic(() => import('./scene'), {
  ssr: false,
  loading: () => <div className="scene scene-fallback" />,
});

const services = [
  ['01', 'Web development', 'Distinctive, responsive websites engineered around real goals.'],
  ['02', 'Custom software', 'Practical digital systems that make everyday work simpler.'],
  ['03', 'AI automation', 'Useful intelligent workflows for repetitive digital tasks.'],
  ['04', 'Immersive experiences', 'Interactive 3D environments and memorable digital interfaces.'],
  ['05', 'Optimization & SEO', 'Faster experiences, clearer structure and better discoverability.'],
  ['06', 'Digital infrastructure', 'Connected platforms and technical foundations built to grow.'],
];

export default function HomeClient() {
  const [activeSection, setActiveSection] = useState('arrival');

  useEffect(() => {
    let lenis: { raf: (time: number) => void; destroy: () => void } | undefined;
    let frame = 0;
    let ctx: { revert: () => void } | undefined;
    let observer: IntersectionObserver | undefined;
    let alive = true;

    Promise.all([import('lenis'), import('gsap'), import('gsap/ScrollTrigger')]).then(([LenisModule, gsapModule, scrollModule]) => {
      if (!alive) return;
      const Lenis = LenisModule.default;
      const gsap = gsapModule.gsap;
      const ScrollTrigger = scrollModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);
      lenis = new Lenis({ smoothWheel: true, lerp: 0.075 });
      const raf = (time: number) => {
        lenis?.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);

      ctx = gsap.context(() => {
        gsap.fromTo('.arrival-copy > *', { y: 34, opacity: 0 }, {
          y: 0, opacity: 1, duration: 1.05, stagger: 0.13, ease: 'power3.out', delay: 0.2,
        });
        gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
          gsap.fromTo(el, { y: 38, opacity: 0 }, {
            y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 86%', once: true },
          });
        });
      });

      const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-section]'));
      observer = new IntersectionObserver((entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.getAttribute('data-section') || 'arrival');
      }, { threshold: [0.25, 0.5, 0.75] });
      sections.forEach((section) => observer.observe(section));

    });

    return () => {
      alive = false;
      cancelAnimationFrame(frame);
      lenis?.destroy();
      ctx?.revert();
      observer?.disconnect();
    };
  }, []);

  return (
    <>
      <div className="world-background"><Scene /></div>
      <div className="world-vignette" />
      <header className="nav">
        <Link href="#arrival" className="wordmark">LEGACY<span>®</span></Link>
        <nav aria-label="Main navigation">
          <a href="#capabilities">Capabilities</a>
          <a href="#founder">Founder</a>
          <a href="#archive">Archive</a>
        </nav>
        <a className="nav-cta" href="#contact">Start a project <span>↗</span></a>
      </header>

      <aside className="journey-nav" aria-label="Journey navigation">
        {[
          ['arrival', 'Arrival'], ['core', 'The core'], ['capabilities', 'Capabilities'],
          ['founder', 'Founder'], ['archive', 'Archive'], ['contact', 'Contact'],
        ].map(([id, label], i) => (
          <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''} aria-label={label}>
            <span>{String(i + 1).padStart(2, '0')}</span><i />
          </a>
        ))}
      </aside>

      <main id="top">
        <section className="chapter arrival" id="arrival" data-section="arrival">
          <div className="arrival-copy">
            <p className="eyebrow"><i /> LEGACY NETWORK / DIGITAL LABORATORY</p>
            <p className="micro-label">INDEPENDENT TECHNOLOGY STUDIO · NIGERIA / WORLDWIDE</p>
            <h1>Building<br /><em>beyond</em><br />the ordinary.</h1>
            <p className="hero-sub">We shape ideas into useful software, distinctive digital experiences and technology built for what comes next.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#core">Enter the laboratory <span>↘</span></a>
              <a className="text-link" href="#capabilities">Explore capabilities <span>↗</span></a>
            </div>
          </div>
          <div className="chapter-index"><span>LN — 001</span><span>SCROLL TO INITIATE JOURNEY</span></div>
          <div className="scroll-line"><i /></div>
        </section>

        <section className="chapter core-chapter" id="core" data-section="core">
          <div className="chapter-copy" data-reveal>
            <p className="eyebrow">01 / THE CORE</p>
            <span className="section-kicker">PURPOSE / ENGINEERING / POSSIBILITY</span>
            <h2>Technology should do more than <em>function.</em></h2>
            <p className="body-copy">It should create possibilities. Legacy Network is an independent digital studio founded by Yamagiri, bringing design, engineering and clear thinking together to build useful digital products.</p>
          </div>
          <div className="spatial-caption"><span>01.01</span><i /> CENTRAL SYSTEM / ONLINE</div>
        </section>

        <section className="chapter capabilities-chapter" id="capabilities" data-section="capabilities">
          <div className="chapter-copy" data-reveal>
            <p className="eyebrow">02 / CAPABILITIES DIVISION</p>
            <span className="section-kicker">SYSTEMS WE DESIGN AND BUILD</span>
            <h2>Ideas, engineered into <em>reality.</em></h2>
            <p className="body-copy">A focused set of digital capabilities, connected by one goal: making technology work better for people.</p>
          </div>
          <div className="capability-grid" data-reveal>
            {services.map(([number, title, description]) => (
              <article className="capability" key={number}>
                <span className="cap-number">{number}</span>
                <div><h3>{title}</h3><p>{description}</p></div>
                <span className="cap-arrow">↗</span>
              </article>
            ))}
          </div>
          <div className="spatial-caption"><span>02.06</span><i /> CAPABILITY NODES / 06 DETECTED</div>
        </section>

        <section className="chapter founder-chapter" id="founder" data-section="founder">
          <div className="founder-portrait" data-reveal>
            <img src="/images/yamagiri-portrait.webp" alt="Yamagiri, founder of Legacy Network" loading="lazy" decoding="async" />
            <div className="portrait-frame" />
            <span className="portrait-tag">FOUNDER / BUILDER</span>
          </div>
          <div className="chapter-copy founder-copy" data-reveal>
            <p className="eyebrow">03 / THE HUMAN ELEMENT</p>
            <span className="section-kicker">FOUNDER PROFILE / YAMAGIRI</span>
            <h2>Independent by nature. <em>Builder by instinct.</em></h2>
            <p className="body-copy">Yamagiri is the founder of Legacy Network, an independent developer with a background in Minecraft server development and a growing focus on modern web technologies, software engineering and intelligent digital systems.</p>
            <p className="body-copy">Building and managing connected server environments helped develop an interest in infrastructure, technical problem-solving and digital experiences. Today, that curiosity drives work across web development, custom software, automation and immersive experiences.</p>
            <a className="text-link" href="mailto:legacynetworkx@gmail.com?subject=Hello%20Legacy%20Network">Connect with the founder <span>↗</span></a>
          </div>
          <div className="spatial-caption"><span>03.01</span><i /> HUMAN INTERFACE / YAMAGIRI</div>
        </section>

        <section className="chapter vision-chapter" id="vision" data-section="vision">
          <div className="chapter-copy" data-reveal>
            <p className="eyebrow">04 / BEYOND THE LABORATORY</p>
            <span className="section-kicker">A LONG VIEW</span>
            <h2>We are building for <em>what comes next.</em></h2>
            <p className="body-copy">Our ambition is to grow into a technology studio known for thoughtful engineering, ambitious ideas and digital products that make a meaningful difference. We believe the future belongs to those willing to build it.</p>
          </div>
          <div className="spatial-caption"><span>04.01</span><i /> HORIZON / OPEN</div>
        </section>

        <section className="chapter archive-chapter" id="archive" data-section="archive">
          <div className="chapter-copy" data-reveal>
            <p className="eyebrow">05 / EXPERIMENTAL ARCHIVE</p>
            <span className="section-kicker">SELECTED EXPLORATIONS</span>
            <h2>Work in progress. <em>Ideas in motion.</em></h2>
            <p className="body-copy">An evolving collection of prototypes, technical experiments and concepts. Each entry is labelled honestly: these are explorations, not a claim of completed client deployments.</p>
          </div>
          <div className="archive-list" data-reveal>
            <article><span>CONCEPT / 001</span><div><h3>School operations system</h3><p>Inventory, sales recording and practical staff workflows for a school environment.</p></div><b>↗</b></article>
            <article><span>EXPERIMENT / 002</span><div><h3>Connected game infrastructure</h3><p>Server environments and player experiences across connected platforms.</p></div><b>↗</b></article>
            <article><span>PROTOTYPE / 003</span><div><h3>Natural-language operations</h3><p>Exploring conversational interfaces for everyday digital tasks.</p></div><b>↗</b></article>
          </div>
          <div className="spatial-caption"><span>05.03</span><i /> ARCHIVE / EXPLORATIONS</div>
        </section>

        <section className="chapter contact-chapter" id="contact" data-section="contact">
          <div className="contact-content" data-reveal>
            <p className="eyebrow">06 / FINAL DESTINATION</p>
            <span className="section-kicker">TRANSMISSION CHANNEL OPEN</span>
            <h2>Have something<br />worth <em>building?</em></h2>
            <p className="body-copy">Tell us what you have in mind. The next good thing can start with a conversation.</p>
            <a className="button button-primary" href="mailto:legacynetworkx@gmail.com?subject=Project%20enquiry">Start a conversation <span>↗</span></a>
            <p className="contact-email">LEGACYNETWORKX@GMAIL.COM</p>
          </div>
          <footer><Link href="#arrival" className="wordmark">LEGACY<span>®</span></Link><p>Building beyond the ordinary.</p><span>© 2026 LEGACY NETWORK · INDEPENDENT DIGITAL STUDIO</span></footer>
        </section>
      </main>
    </>
  );
}
