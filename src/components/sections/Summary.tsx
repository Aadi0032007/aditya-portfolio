'use client';

import { motion } from 'framer-motion';
import { summary } from '@/data/resume';
import { useUIStore } from '@/store/ui';
import { useEffect, useRef } from 'react';

export function Summary() {
  const setActiveSection = useUIStore((s) => s.setActiveSection);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActiveSection('summary')),
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [setActiveSection]);

  return (
    <section ref={ref} id="summary" className="section-shell section-grid fade-border px-8 py-10 md:px-12 md:py-12">
      <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}>
        <div className="code-badge mb-4">Professional Summary</div>
        <p className="text-lg leading-relaxed text-slate-200/90">{summary}</p>
      </motion.div>
    </section>
  );
}
