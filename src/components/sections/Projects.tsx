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
      { threshold: 0.35 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [setActiveSection]);

  return (
    <section ref={ref} id="projects" className="section-shell overflow-hidden px-8 py-10 md:px-12 md:py-12">
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent" />
      <div className="relative space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <div className="code-badge">Projects · Lorenz Attractor</div>
          <p className="text-sm text-slate-300">Chaotic trajectories trace the data manifolds behind every build.</p>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {projects.map((project) => (
            <motion.div
              key={project.title}
              className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-lg"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              whileHover={{ scale: 1.01, borderColor: 'rgba(125,211,252,0.6)', backgroundColor: 'rgba(15,23,42,0.85)' }}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                  <p className="text-slate-300">{project.description}</p>
                </div>
                {project.linkLabel && project.linkUrl && (
                  <a
                    className="rounded-full border border-white/20 px-3 py-1 text-xs text-accent underline-offset-4 hover:underline"
                    href={project.linkUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {project.linkLabel}
                  </a>
                )}
              </div>
              {project.details && (
                <ul className="mt-3 space-y-1 text-slate-200/90">
                  {project.details.map((detail) => (
                    <li key={detail} className="flex gap-2">
                      <span className="text-accent">▹</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              )}
              {project.tech && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span key={t} className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-200">
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
