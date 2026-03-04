import React from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { SkillPill } from '../components/SkillPill';
import { skills } from '../data/skills';
import type { SkillCategory } from '../types/content';

const categories: { id: SkillCategory; label: string }[] = [
  { id: 'Core', label: 'Core language & platform' },
  { id: 'Frontend', label: 'Frontend frameworks & UX' },
  { id: 'Styling', label: 'Styling & design systems' },
  { id: 'Tooling', label: 'Tooling & ecosystem' },
];

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="mb-20 scroll-mt-24 reveal reveal-delay-1">
      <SectionHeader
        eyebrow="Skills"
        title="What I work with"
        subtitle="A focused front-end toolkit built around React, TypeScript, modern HTML, and CSS."
      />
      <div className="grid gap-6 md:grid-cols-2">
        {categories.map((category) => {
          const categorySkills = skills.filter((skill) => skill.category === category.id);
          if (categorySkills.length === 0) {
            return null;
          }

          return (
            <div
              key={category.id}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-sky-500/60 hover:shadow-lg hover:shadow-sky-500/15"
            >
              <h3 className="mb-2 text-sm font-semibold text-slate-100">{category.label}</h3>
              <div className="flex flex-wrap gap-2">
                {categorySkills.map((skill) => (
                  <SkillPill key={skill.id} skill={skill} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

