import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { Skills } from './sections/Skills';
import { Projects } from './sections/Projects';
import { About } from './sections/About';
import { Contact } from './sections/Contact';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-10">
        <Hero />
        <Skills />
        <Projects />
        <About />
        <Contact />
      </main>
      <footer className="border-t border-slate-800 bg-slate-950/95">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} Ethan Dann. Built with React, TypeScript, Tailwind CSS, and Node/Express.
          </p>
        </div>
      </footer>
    </div>
  );
};


