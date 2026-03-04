import React, { useEffect, useRef, useState } from 'react';
import { Button } from './Button';

const sections = [
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const manualActiveRef = useRef<{ id: string; until: number } | null>(null);

  const handleJump = (id: string) => {
    const now = Date.now();
    manualActiveRef.current = { id, until: now + 800 };
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
    }
    setIsOpen(false);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const now = Date.now();
        if (manualActiveRef.current && now < manualActiveRef.current.until) {
          return;
        }

        let mostVisibleId: string | null = null;
        let maxRatio = 0;

        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          if (entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio;
            mostVisibleId = (entry.target as HTMLElement).id;
          }
        });

        if (mostVisibleId) {
          setActiveSection(mostVisibleId);
        }
      },
      { threshold: 0.25 },
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <button
          type="button"
          onClick={() => handleJump('top')}
          className="cursor-pointer text-lg font-semibold tracking-tight text-slate-50"
        >
          <span className="text-sky-400">&lt;/&gt;</span> Ethan Dann
        </button>

        <button
          type="button"
          className="inline-flex cursor-pointer items-center justify-center rounded-full border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-100 shadow-sm shadow-slate-950/40 transition hover:border-sky-500 hover:text-sky-300 sm:hidden"
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
        >
          Menu
        </button>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-300 sm:flex">
          {sections.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => handleJump(section.id)}
              className={`cursor-pointer rounded-full px-3 py-1.5 transition-colors ${
                activeSection === section.id
                  ? 'bg-slate-800 text-sky-400'
                  : 'text-slate-300 hover:bg-slate-900 hover:text-sky-400'
              }`}
            >
              {section.label}
            </button>
          ))}
        </nav>
      </div>
      {isOpen ? (
        <nav className="border-t border-slate-800 bg-slate-950/95 px-4 py-3 text-sm font-medium text-slate-300 sm:hidden">
          <div className="mx-auto flex max-w-5xl flex-col gap-2">
            {sections.map((section) => (
              <button
                key={section.id}
                type="button"
                onClick={() => handleJump(section.id)}
                className={`w-full cursor-pointer rounded-md px-2 py-1.5 text-left transition-colors ${
                  activeSection === section.id
                    ? 'bg-slate-800 text-sky-400'
                    : 'hover:bg-slate-900 hover:text-sky-400'
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
};

