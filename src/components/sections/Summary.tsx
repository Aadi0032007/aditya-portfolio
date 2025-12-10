'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { summary } from '@/data/resume';
import { useUIStore } from '@/store/ui';
import { useEffect, useRef } from 'react';

export function Summary() {
  const setActiveSection = useUIStore((s) => s.setActiveSection);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start center', 'end start'] });
  const glowX = useTransform(scrollYProgress, [0, 1], ['-30%', '40%']);
  const glowOpacity = useTransform(scrollYProgress, [0, 1], [0.12, 0.32]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActiveSection('summary')),
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [setActiveSection]);

  return (
    <section ref={ref} id="summary" className="section-shell section-grid fade-border overflow-hidden px-8 py-10 md:px-12 md:py-12">
      <motion.div
        className="pointer-events-none absolute inset-0 blur-3xl"
        style={{ background: 'radial-gradient(circle at 30% 20%, rgba(56,189,248,0.18), transparent 40%)', x: glowX, opacity: glowOpacity }}
        aria-hidden
      />
      <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }} className="relative z-10 space-y-4">
        <div className="code-badge mb-2">Professional Summary</div>
        <div className="space-y-3 text-lg leading-relaxed text-slate-200/90">
          {summary.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
