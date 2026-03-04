import type { Project } from '../types/content';

export const projects: Project[] = [
  {
    id: 'small-business-site',
    name: 'Small Business Website (planned)',
    description:
      'A future site for a small business with a hero section and CTA, services grid, testimonials carousel, and a contact form.',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Node', 'Express'],
  },
  {
    id: 'saas-landing-page',
    name: 'SaaS Landing Page (planned)',
    description:
      'A sleek one-pager for a SaaS tool with an eye-catching hero, pricing tiers, FAQ accordion, email signup form, and testimonials.',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    highlight: true,
  },
  {
    id: 'mindmap-notes',
    name: 'Notetaking Mindmap App (planned)',
    description:
      'An upcoming notetaking web app that visualizes notes and thoughts as an interactive mindmap for better idea exploration.',
    tech: ['React', 'TypeScript', 'Tailwind CSS'],
  },
  {
    id: 'ecommerce-frontend',
    name: 'E‑commerce Frontend (planned)',
    description:
      'A clean storefront for an apparel brand featuring product listing, filtering, and a mock cart and checkout experience.',
    tech: ['React', 'TypeScript', 'Tailwind CSS'],
  },
  {
    id: 'ui-library',
    name: 'Reusable UI Components',
    description:
      'A small library of composable, accessible React components demonstrating design systems thinking.',
    tech: ['React', 'TypeScript', 'Storybook'],
  },
];

