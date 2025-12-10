'use client';

import { projects } from '@/data/resume';
import { useUIStore } from '@/store/ui';
import { LorenzAttractor } from '../canvas/LorenzAttractor';
import { Canvas } from '@react-three/fiber';
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
      <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <div className="code-badge">Projects · Lorenz Attractor</div>
          <p className="text-slate-300">Chaotic trajectories trace the data manifolds behind every build.</p>
          <div className="space-y-4">
            {projects.map((project) => (
              <motion.div
                key={project.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-5"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                    <p className="text-slate-300">{project.description}</p>
                  </div>
                  {project.linkLabel && <span className="rounded-full border border-white/20 px-3 py-1 text-xs text-accent">{project.linkLabel}</span>}
                </div>
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
        <div className="relative h-[520px] rounded-3xl border border-white/10 bg-slate-900/40">
          <Canvas camera={{ position: [0, 0, 7], fov: 60 }}>
            <ambientLight intensity={0.6} />
            <pointLight position={[4, 4, 4]} intensity={1.1} />
            <LorenzAttractor />
          </Canvas>
          <div className="absolute inset-0 bg-gradient-to-t from-deep via-transparent to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
