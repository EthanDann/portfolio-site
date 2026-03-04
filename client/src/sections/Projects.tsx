import React from 'react';
import { SectionHeader } from '../components/SectionHeader';
import { ProjectCard } from '../components/ProjectCard';
import { projects } from '../data/projects';

export const Projects: React.FC = () => {
  return (
    <section id="projects" className="mb-20 scroll-mt-24 reveal reveal-delay-1">
      <SectionHeader
        eyebrow="Projects"
        title="Selected work"
        subtitle="Planned and in-progress front-end projects that I’m using to sharpen my React and TypeScript skills."
      />
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};

