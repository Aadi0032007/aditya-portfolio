'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { summary } from '@/data/resume';
import { useUIStore } from '@/store/ui';
import { useEffect, useRef } from 'react';

export function Summary() {
  const setActiveSection = useUIStore((s) => s.setActiveSection);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActiveSection('summary')),
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [setActiveSection]);

  return (
    <section ref={ref} id="summary" className="section-shell relative overflow-hidden px-6 py-16 md:px-12 md:py-24">
      {/* Dynamic background element */}
      <motion.div
        style={{ y }}
        className="absolute -right-20 top-0 h-96 w-96 rounded-full bg-indigo-200/20 dark:bg-slate-800/30 blur-3xl"
      />

      <div className="relative z-10 mx-auto max-w-4xl space-y-8 rounded-3xl border border-indigo-200/50 dark:border-white/10 bg-white/90 dark:bg-slate-900/80 p-8 shadow-xl backdrop-blur-sm md:p-12">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">About Me</h2>
        </div>

        <div className="space-y-6 text-lg leading-relaxed text-slate-600 dark:text-slate-300 md:text-xl">
          {summary.map((paragraph, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
            >
              {paragraph}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}
