'use client';

import { skills } from '@/data/resume';
import { useUIStore } from '@/store/ui';
import { SkillCloud } from '../canvas/SkillCloud';
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

  return (
    <section ref={ref} id="skills" className="section-shell px-8 py-10 md:px-12 md:py-12">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="code-badge">Skills · Matrix Cloud</div>
          <p className="text-slate-300">Rigid body icosahedrons float and collide, revealing decoded titles on click.</p>
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
              <h4 className="text-sm uppercase tracking-[0.2em] text-slate-400">Soft Skills</h4>
              <div className="mt-2 flex flex-wrap gap-2">
                {skills.soft.map((s) => (
                  <span key={s} className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
        <SkillCloud skills={skills.technical} />
      </div>
    </section>
  );
}
