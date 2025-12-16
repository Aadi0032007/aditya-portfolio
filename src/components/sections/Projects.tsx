'use client';

import { projects } from '@/data/resume';
import { useUIStore } from '@/store/ui';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

export function Projects() {
  const setActiveSection = useUIStore((s) => s.setActiveSection);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActiveSection('projects')),
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [setActiveSection]);

  return (
    <section ref={ref} id="projects" className="section-shell overflow-hidden px-6 py-10 md:px-12 md:py-16">
      <div className="relative space-y-8">
        <div className="flex items-center gap-3">
          <div className="code-badge">Featured Projects</div>
          <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              className="group relative flex flex-col justify-between rounded-3xl border border-indigo-200/50 dark:border-white/10 bg-white/95 dark:bg-slate-900/80 p-6 backdrop-blur-xl transition-all hover:border-indigo-500 hover:shadow-[0_0_25px_rgba(99,102,241,0.3)] dark:hover:border-indigo-400"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-500 dark:group-hover:text-indigo-300 transition-colors">
                    {project.title}
                  </h3>
                  {project.linkUrl && (
                    <a
                      href={project.linkUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="shrink-0 rounded-full bg-indigo-50 dark:bg-white/5 p-2 text-slate-500 dark:text-slate-400 transition-colors hover:bg-indigo-100 dark:hover:bg-white/10 hover:text-indigo-600 dark:hover:text-white"
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </div>

                <p className="text-slate-800 dark:text-slate-300 leading-relaxed font-light">
                  {project.description}
                </p>

                {project.details && (
                  <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-400">
                    {project.details.map((detail, i) => (
                      <li key={i} className="flex gap-2.5">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-indigo-500/80 dark:bg-indigo-400" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {project.tech && project.tech.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="rounded-md border border-indigo-200/50 dark:border-white/5 bg-indigo-50/50 dark:bg-white/5 px-2.5 py-1 text-xs font-medium text-slate-800 dark:text-slate-300">
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
