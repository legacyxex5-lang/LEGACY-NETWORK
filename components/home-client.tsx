'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Scene = dynamic(() => import('./scene'), {
  ssr: false,
  loading: () => <div className="scene scene-fallback" />,
});

const services = [
  ['01', 'Digital presence', 'Websites and landing pages that make the value of a business clear, credible, and easy to act on.'],
  ['02', 'Business systems', 'Custom tools, forms, booking flows, and internal systems that remove friction from everyday work.'],
  ['03', 'Intelligent operations', 'AI receptionists, lead qualification, and follow-up workflows that help good inquiries move forward.'],
];

const process = [
  ['01', 'Discover', 'We learn what the business is trying to change, where attention is being lost, and what success should look like.'],
  ['02', 'Shape', 'We turn the opportunity into a focused direction, clear content, and a system the team can actually use.'],
  ['03', 'Build', 'We design and engineer the experience with care, from the visible interface to the quiet technical details underneath.'],
  ['04', 'Refine', 'We review what is working, improve the weak points, and leave the business with something made to last.'],
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
      sections.forEach((section) => observer?.observe(section));
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
          <a href="#practice">Practice</a>
          <a href="#capabilities">Services</a>
          <a href="#founder">Founder</a>
          <a href="#archive">Archive</a>
        </nav>
        <a className="nav-cta" href="#contact">Start a project <span>↗</span></a>
      </header>

      <aside className="journey-nav" aria-label="Journey navigation">
        {[
          ['arrival', 'Arrival'], ['practice', 'Practice'], ['capabilities', 'Services'],
          ['process', 'Process'], ['founder', 'Founder'], ['archive', 'Archive'], ['contact', 'Contact'],
        ].map(([id, label], i) => (
          <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''} aria-label={label}>
            <span>{String(i + 1).padStart(2, '0')}</span><i />
          </a>
        ))}
      </aside>

      <main id="top">
        <section className="chapter arrival" id="arrival" data-section="arrival">
          <div className="arrival-copy">
            <p className="eyebrow"><i /> LEGACY NETWORK / INDEPENDENT DIGITAL STUDIO</p>
            <p className="micro-label">NIGERIA / WORLDWIDE · DESIGN / ENGINEERING / SYSTEMS</p>
            <h1>Digital systems<br />for businesses<br /><em>with a long view.</em></h1>
            <p className="hero-sub">We design and build the websites, software, and intelligent workflows that help ambitious businesses look clearer, work smarter, and move with confidence.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#contact">Start a conversation <span>↘</span></a>
              <a className="text-link" href="#capabilities">See what we build <span>↗</span></a>
            </div>
          </div>
          <div className="chapter-index"><span>LN — 001 / ARRIVAL</span><span>SCROLL TO EXPLORE</span></div>
          <div className="scroll-line"><i /></div>
        </section>

        <section className="chapter practice-chapter" id="practice" data-section="practice">
          <div className="chapter-copy" data-reveal>
            <p className="eyebrow">01 / THE PRACTICE</p>
            <span className="section-kicker">CLARITY / CRAFT / CONTINUITY</span>
            <h2>Good technology should leave people with <em>more time.</em></h2>
            <p className="body-copy">Legacy Network is a founder-led digital studio for businesses that have outgrown improvised tools and forgettable online experiences. We bring strategy, design, and dependable engineering into one thoughtful process.</p>
          </div>
          <div className="practice-note"><span>THE LONG VIEW</span><i /><p>Build less noise. Create more signal. Leave something useful behind.</p></div>
          <div className="spatial-caption"><span>01.01</span><i /> PRACTICE / ONLINE</div>
        </section>

        <section className="chapter capabilities-chapter" id="capabilities" data-section="capabilities">
          <div className="chapter-copy" data-reveal>
            <p className="eyebrow">02 / SERVICES</p>
            <span className="section-kicker">OUTCOMES, NOT JUST OUTPUTS</span>
            <h2>Built around the work that <em>matters.</em></h2>
            <p className="body-copy">A focused set of services for businesses that want a stronger presence, smoother operations, and a more deliberate next step.</p>
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
          <div className="spatial-caption"><span>02.03</span><i /> SERVICE DIVISIONS / 03</div>
        </section>

        <section className="chapter process-chapter" id="process" data-section="process">
          <div className="chapter-copy" data-reveal>
            <p className="eyebrow">03 / THE METHOD</p>
            <span className="section-kicker">A CALM, CLEAR WAY TO BUILD</span>
            <h2>From first question to <em>finished system.</em></h2>
          </div>
          <div className="process-list" data-reveal>
            {process.map(([number, title, description]) => (
              <article className="process-step" key={number}>
                <span>{number}</span><div><h3>{title}</h3><p>{description}</p></div>
              </article>
            ))}
          </div>
          <div className="spatial-caption"><span>03.04</span><i /> METHOD / IN PRACTICE</div>
        </section>

        <section className="chapter founder-chapter" id="founder" data-section="founder">
          <div className="founder-portrait" data-reveal>
            <Image src="/images/yamagiri-portrait.webp" alt="Yamagiri, founder of Legacy Network" fill sizes="(max-width: 680px) 86vw, 430px" />
            <div className="portrait-frame" />
            <span className="portrait-tag">FOUNDER / BUILDER</span>
          </div>
          <div className="chapter-copy founder-copy" data-reveal>
            <p className="eyebrow">04 / THE HUMAN ELEMENT</p>
            <span className="section-kicker">FOUNDER PROFILE / YAMAGIRI</span>
            <h2>Independent by nature. <em>Builder by instinct.</em></h2>
            <p className="body-copy">My work began with building and managing connected game-server environments, where reliability, systems thinking, and problem-solving mattered every day. That foundation now informs the websites, automations, and digital systems I build for businesses.</p>
            <p className="body-copy">I care about the details people feel: a page that makes sense, a workflow that saves a team an hour, and a digital presence that feels worthy of the work behind it.</p>
            <a className="text-link" href="mailto:legacynetworkx@gmail.com?subject=Hello%20Legacy%20Network">Connect with the founder <span>↗</span></a>
          </div>
          <div className="spatial-caption"><span>04.01</span><i /> HUMAN INTERFACE / YAMAGIRI</div>
        </section>

        <section className="chapter archive-chapter" id="archive" data-section="archive">
          <div className="chapter-copy" data-reveal>
            <p className="eyebrow">05 / SELECTED DIRECTIONS</p>
            <span className="section-kicker">AN HONEST WORKING ARCHIVE</span>
            <h2>Ideas with somewhere <em>useful to go.</em></h2>
            <p className="body-copy">A growing collection of prototypes and concept directions. Each entry is labelled honestly: these are explorations that show how we think, not invented client results.</p>
          </div>
          <div className="archive-list" data-reveal>
            <article><span>CONCEPT / 001</span><div><h3>Service business response system</h3><p>After-hours call capture, qualification, booking, and follow-up for teams that cannot answer every inquiry themselves.</p></div><b>↗</b></article>
            <article><span>PROTOTYPE / 002</span><div><h3>School operations system</h3><p>Inventory, sales recording, and practical staff workflows designed around a busy school environment.</p></div><b>↗</b></article>
            <article><span>EXPERIMENT / 003</span><div><h3>Natural-language operations</h3><p>Exploring conversational interfaces that help people complete everyday digital tasks without learning another complex tool.</p></div><b>↗</b></article>
          </div>
          <div className="spatial-caption"><span>05.03</span><i /> ARCHIVE / EXPLORATIONS</div>
        </section>

        <section className="chapter contact-chapter" id="contact" data-section="contact">
          <div className="contact-content" data-reveal>
            <p className="eyebrow">06 / BEGIN HERE</p>
            <span className="section-kicker">A GOOD PROJECT STARTS WITH A GOOD QUESTION</span>
            <h2>Have something<br />worth <em>building?</em></h2>
            <p className="body-copy">Tell us what is changing in your business, where the friction is, or what you wish worked better. We will take it from there.</p>
            <div className="contact-actions"><a className="button button-primary" href="mailto:legacynetworkx@gmail.com?subject=Project%20enquiry">Start a conversation <span>↗</span></a><a className="text-link" href="mailto:legacynetworkx@gmail.com">Email directly <span>↗</span></a></div>
            <p className="contact-email">LEGACYNETWORKX@GMAIL.COM</p>
          </div>
          <footer><Link href="#arrival" className="wordmark">LEGACY<span>®</span></Link><p>Digital systems for businesses with a long view.</p><span>© 2026 LEGACY NETWORK · INDEPENDENT DIGITAL STUDIO</span></footer>
        </section>
      </main>
    </>
  );
}
