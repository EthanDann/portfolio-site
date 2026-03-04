import React from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { ContactForm } from '../components/ContactForm';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="mb-20 scroll-mt-24 reveal reveal-delay-3">
      <SectionHeader
        eyebrow="Contact"
        title="Let’s work together"
        subtitle="If you’d like to chat about front-end roles, projects, or collaboration, send a message and I’ll get back to you soon."
      />
      <div className="grid gap-8 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <div>
          <ContactForm />
        </div>
        <div className="space-y-3 text-sm text-slate-300">
          <p>
            I’m especially interested in projects involving modern frontends, design systems, or refining existing
            products to feel faster and more intuitive.
          </p>
          <p>
            If you prefer not to use the form, you can also reach out via{' '}
            <a
              href="https://www.linkedin.com/in/ethan-dann-b516a9193/"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-sky-400 hover:text-sky-300"
            >
              LinkedIn
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
};

