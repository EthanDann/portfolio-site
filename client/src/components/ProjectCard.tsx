import React from 'react';
import type { Project } from '../types/content';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <article className="group flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-sm shadow-slate-950/40 transition-all duration-300 hover:-translate-y-1 hover:border-sky-500/60 hover:shadow-lg hover:shadow-sky-500/20">
      <div className="space-y-3">
        <h3 className="text-base font-semibold tracking-tight text-slate-50">{project.name}</h3>
        <p className="text-sm text-slate-300">{project.description}</p>
        <ul className="flex flex-wrap gap-2 text-[0.7rem] text-slate-300">
          {project.tech.map((tech) => (
            <li
              key={tech}
              className="rounded-full bg-slate-800/80 px-2 py-1 text-[0.7rem] font-medium text-slate-200"
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4 flex gap-3 text-xs font-medium text-sky-400">
        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 hover:text-sky-300"
          >
            Live demo
            <span aria-hidden>↗</span>
          </a>
        ) : null}
        {project.repoUrl ? (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 hover:text-sky-300"
          >
            Source
            <span aria-hidden>↗</span>
          </a>
        ) : null}
      </div>
    </article>
  );
};

