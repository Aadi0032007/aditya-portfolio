'use client';

import { skills } from '@/data/resume';
import { useUIStore } from '@/store/ui';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useRef } from 'react';

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

  const clusteredTech = useMemo(() => {
    const mid = Math.ceil(skills.technical.length / 2);
    return [skills.technical.slice(0, mid), skills.technical.slice(mid)];
  }, []);

  return (
    <section ref={ref} id="skills" className="section-shell px-8 py-10 md:px-12 md:py-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(125,211,252,0.12),transparent_30%),radial-gradient(circle_at_80%_30%,rgba(168,85,247,0.12),transparent_30%)]" />
      <div className="relative grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-4">
          <div className="code-badge">Skills · Matrix Cloud</div>
          <p className="text-slate-300">Hover to decode the constellation of tools powering Aditya's robotics and AI builds.</p>
          <motion.div className="space-y-3" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}>
            <h3 className="text-lg font-semibold text-white">Awards & Highlights</h3>
            <ul className="space-y-2 text-slate-200/90">
              {skills.awards.map((award) => (
                <li key={award} className="flex gap-2">
                  <span className="text-lime">◆</span>
                  <span>{award}</span>
                </li>
              ))}
            </ul>
            <div>
              <h4 className="text-sm uppercase tracking-[0.2em] text-slate-400">Core Competencies</h4>
              <div className="mt-2 flex flex-wrap gap-2">
                {skills.competencies.map((s) => (
                  <span key={s} className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200">{s}</span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm uppercase tracking-[0.2em] text-slate-400">Soft Skills</h4>
              <div className="mt-2 flex flex-wrap gap-2">
                {skills.soft.map((s) => (
                  <span key={s} className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200">{s}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
        <div className="relative rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-glass">
          <div className="mb-3 flex items-center justify-between text-sm text-slate-300">
            <span>Matrix Cloud</span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-accent">Interactive</span>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {clusteredTech.map((column, idx) => (
              <div key={idx} className="space-y-3">
                {column.map((tool) => (
                  <motion.div
                    key={tool}
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-slate-100 shadow-inner"
                    whileHover={{ scale: 1.02, borderColor: 'rgba(190,242,100,0.6)', x: 4 * (idx === 0 ? 1 : -1) }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                  >
                    <div className="text-sm font-semibold">{tool}</div>
                    <p className="text-xs text-slate-300">In-play across perception, agents, and deployment.</p>
                  </motion.div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
