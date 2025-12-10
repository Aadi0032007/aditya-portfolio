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
    <section ref={ref} id="experience" className="section-shell px-8 py-10 md:px-12 md:py-12">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <div className="code-badge">Timeline</div>
          <p className="text-slate-300">Inverse kinematics arm points to the current section as you scroll.</p>
        </div>
        <div className="space-y-6">
          {experience.map((role) => (
            <motion.div
              key={role.title + role.company}
              className="rounded-2xl border border-white/10 bg-white/5 p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-sm text-slate-400">{role.period} · {role.location}</p>
                  <h3 className="text-xl font-semibold text-white">{role.title} · {role.company}</h3>
                  <p className="text-slate-300">{role.focus}</p>
                </div>
                <span className="rounded-full border border-accent/30 px-3 py-1 text-xs uppercase tracking-[0.2em] text-accent">
                  Robotics · AI
                </span>
              </div>
              <ul className="mt-4 space-y-2 text-slate-200/90">
                {role.achievements.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-accent">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
