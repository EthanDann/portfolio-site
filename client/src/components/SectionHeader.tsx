import React from 'react';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ eyebrow, title, subtitle }) => {
  return (
    <header className="mb-6 space-y-2">
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-400">{eyebrow}</p>
      ) : null}
      <h2 className="text-xl font-semibold tracking-tight text-slate-50 sm:text-2xl">{title}</h2>
      {subtitle ? <p className="max-w-2xl text-sm text-slate-400">{subtitle}</p> : null}
    </header>
  );
};

