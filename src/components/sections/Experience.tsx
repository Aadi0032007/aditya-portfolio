'use client';

import { experience } from '@/data/resume';
import { useUIStore } from '@/store/ui';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

export function Experience() {
  const setActiveSection = useUIStore((s) => s.setActiveSection);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActiveSection('experience')),
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [setActiveSection]);

  return (
    <section ref={ref} id="experience" className="section-shell px-6 py-10 md:px-12 md:py-16">
      <div className="flex flex-col gap-12">
        <div className="flex items-center gap-3">
          <div className="code-badge">Experience</div>
          <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
        </div>

        <div className="grid gap-12 lg:grid-cols-1">
          {/* Experience List - Full Width */}
          <div className="relative border-l border-indigo-200/50 dark:border-white/10 pl-8 ml-4 md:ml-6 space-y-12">
            {experience.map((role, idx) => (
              <motion.div
                key={role.company + role.period}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="relative rounded-2xl border border-indigo-200/50 dark:border-white/10 bg-white/95 dark:bg-slate-900/80 p-6 backdrop-blur-sm transition-all hover:border-indigo-500 hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] dark:hover:border-indigo-400 dark:hover:shadow-[0_0_20px_rgba(129,140,248,0.2)]"
              >
                {/* Timeline dot */}
                <div className="absolute -left-[41px] top-1.5 h-5 w-5 rounded-full border-4 border-slate-50 dark:border-slate-900 bg-accent shadow-[0_0_10px_rgba(168,85,247,0.4)]" />

                <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{role.title}</h3>
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{role.period}</span>
                </div>

                <div className="mb-4 text-lg font-medium text-indigo-500 dark:text-indigo-300">
                  {role.company} <span className="text-slate-500">· {role.location}</span>
                  {role.company === 'Revobots' && (
                    <span className="ml-2 inline-flex items-center rounded-full bg-indigo-500/10 px-2 py-0.5 text-xs text-indigo-600 dark:text-indigo-400">
                      Current
                    </span>
                  )}
                </div>

                <p className="mb-4 text-slate-700 dark:text-slate-300/90 leading-relaxed italic border-l-2 border-indigo-500/20 dark:border-white/5 pl-4">
                  {role.focus}
                </p>

                <ul className="grid gap-3 text-slate-800 dark:text-slate-300">
                  {role.achievements.map((item, i) => (
                    <li key={i} className="flex gap-3 text-sm leading-relaxed">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-indigo-500/50 dark:bg-white/20" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
