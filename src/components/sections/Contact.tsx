'use client';

import { extraLinks, profile } from '@/data/resume';
import { useUIStore } from '@/store/ui';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

export function Contact() {
  const setActiveSection = useUIStore((s) => s.setActiveSection);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActiveSection('contact')),
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [setActiveSection]);

  return (
    <section ref={ref} id="contact" className="section-shell px-8 py-10 md:px-12 md:py-12">
      <div className="grid items-start gap-6 md:grid-cols-2">
        <div className="space-y-3">
          <div className="code-badge">Let&apos;s collaborate</div>
          <h3 className="text-2xl font-semibold text-white">Build the next intelligent system together.</h3>
          <p className="text-slate-300">Grounded robotics, LLM-powered agents, and physics-inspired visuals ready for deployment.</p>
          <div className="flex flex-wrap gap-3">
            <a href={`mailto:${profile.email}`} className="btn-primary">Email</a>
            <a href={profile.linkedin} className="btn-secondary" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href={profile.github} className="btn-secondary" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>
        </div>
        <motion.div
          className="rounded-2xl border border-white/10 bg-gradient-to-br from-accent/20 via-neon/15 to-lime/15 p-6"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm uppercase tracking-[0.25em] text-slate-200">Coordinates</p>
          <div className="mt-3 space-y-2 text-lg">
            <p>{profile.location}</p>
            <p>{profile.phone}</p>
            <p>{profile.email}</p>
            <p>{profile.linkedin}</p>
          </div>
          <div className="mt-4 space-y-2 text-sm text-slate-200/90">
            {extraLinks.map((link) => (
              <a key={link.url} className="block underline-offset-4 hover:underline" href={link.url} target="_blank" rel="noreferrer">
                {link.label}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
