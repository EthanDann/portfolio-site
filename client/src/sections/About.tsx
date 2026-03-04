import React from 'react';
import { SectionHeader } from '../components/SectionHeader';

export const About: React.FC = () => {
  return (
    <section id="about" className="mb-20 scroll-mt-24 reveal reveal-delay-2">
      <SectionHeader
        eyebrow="About"
        title="A bit about how I work"
        subtitle="I focus on front-end work with React and TypeScript, and on keeping interfaces straightforward for both users and developers."
      />
      <div className="space-y-3 text-sm text-slate-300">
        <p>
          I currently work as a full-stack developer, but my main focus – and what I enjoy most – is front-end work with
          React and TypeScript.
        </p>
        <p>
          I care about clear structure, predictable state, and avoiding unnecessary complexity. I like building
          interfaces that feel straightforward to users and easy for other developers to work on.
        </p>
        <p>
          Right now I’m steadily growing my portfolio with projects that push my front-end skills: better layouts,
          smoother interactions, and more polished user experiences.
        </p>
      </div>
    </section>
  );
};

