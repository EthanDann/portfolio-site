import React from 'react';
import type { Skill } from '../types/content';

interface SkillPillProps {
  skill: Skill;
}

export const SkillPill: React.FC<SkillPillProps> = ({ skill }) => {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 px-3 py-1 text-xs font-medium text-slate-100">
      {skill.name}
      {skill.level ? (
        <span className="text-[0.65rem] uppercase tracking-wide text-slate-400">{skill.level}</span>
      ) : null}
    </span>
  );
};

