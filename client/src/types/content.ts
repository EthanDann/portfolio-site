export type SkillCategory = 'Core' | 'Frontend' | 'Styling' | 'Tooling';

export type SkillLevel = 'beginner' | 'intermediate' | 'advanced';

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  level?: SkillLevel;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  tech: string[];
  repoUrl?: string;
  liveUrl?: string;
  highlight?: boolean;
}

