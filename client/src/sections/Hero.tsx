import React, { useEffect, useState } from 'react';
import { Button } from '../components/Button';

type ActiveCta = 'projects' | 'contact' | null;

export const Hero: React.FC = () => {
  const [activeCta, setActiveCta] = useState<ActiveCta>(null);

  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setActiveCta('projects');
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setActiveCta('contact');
  };

  useEffect(() => {
    const projects = document.getElementById('projects');
    const contact = document.getElementById('contact');

    if (!projects && !contact) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        let next: ActiveCta = null;

        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const id = (entry.target as HTMLElement).id;
          if (id === 'contact') {
            next = 'contact';
            break;
          }
          if (id === 'projects' && next !== 'contact') {
            next = 'projects';
          }
        }

        if (next !== null) {
          setActiveCta(next);
        }
      },
      { threshold: 0.4 },
    );

    if (projects) observer.observe(projects);
    if (contact) observer.observe(contact);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section id="top" className="mb-24 pt-16 reveal">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-sky-400">
        Front-end Developer
      </p>
      <h1 className="mb-4 text-4xl font-semibold tracking-tight sm:text-5xl">
        Building clean, modern interfaces with{' '}
        <span className="border-b border-sky-500/70 pb-0.5 text-sky-400">React</span> &amp;{' '}
        <span className="border-b border-sky-500/70 pb-0.5 text-sky-400">TypeScript</span>.
      </h1>
      <p className="max-w-2xl text-sm text-slate-300 sm:text-base">
        I am a front-end developer with 1.5 years of professional experience and have been programming for over four
        years. I focus on clean, responsive UIs, solid HTML/CSS, and code that is easy to understand and extend.
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <Button variant={activeCta === 'projects' ? 'primary' : 'secondary'} onClick={scrollToProjects}>
          View projects
        </Button>
        <Button variant={activeCta === 'contact' ? 'primary' : 'ghost'} onClick={scrollToContact}>
          Contact me
        </Button>
      </div>
    </section>
  );
};

