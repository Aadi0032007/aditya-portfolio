'use client';

import { skills } from '@/data/resume';
import { useUIStore } from '@/store/ui';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

export function Skills() {
  const setActiveSection = useUIStore((s) => s.setActiveSection);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActiveSection('skills')),
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [setActiveSection]);

  const categories = [
    { name: 'Technical Skills', items: skills.technical, color: 'text-indigo-400' },
    { name: 'Core Competencies', items: skills.competencies, color: 'text-purple-400' },
    { name: 'Soft Skills', items: skills.soft, color: 'text-pink-400' }
  ];

  return (
    <section ref={ref} id="skills" className="section-shell px-6 py-10 md:px-12 md:py-16">
      <div className="space-y-12">
        <div className="flex items-center gap-3">
          <div className="code-badge">Expertise</div>
          <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="rounded-2xl border border-indigo-200/50 dark:border-white/5 bg-white/90 dark:bg-slate-900/80 p-6 backdrop-blur-sm"
            >
              <h3 className={`mb-4 text-lg font-semibold ${cat.color}`}>{cat.name}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((skill) => (
                  <span
                    key={skill}
                    className="cursor-default rounded-md bg-indigo-50 dark:bg-white/5 px-3 py-1.5 text-sm text-slate-600 dark:text-slate-300 transition-colors hover:bg-indigo-100 dark:hover:bg-white/10 hover:text-indigo-700 dark:hover:text-white"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
