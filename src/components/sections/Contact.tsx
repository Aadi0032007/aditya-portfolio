'use client';

import { profile } from '@/data/resume';
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
    <section ref={ref} id="contact" className="section-shell px-6 py-10 md:px-12 md:py-24">
      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="relative space-y-6 rounded-3xl border border-indigo-200/50 dark:border-white/10 bg-white/90 dark:bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl md:p-12 overflow-hidden"
        >
          {/* Mirror Selfie - Polaroid Style */}
          <motion.div
            initial={{ rotate: -10, scale: 0.8, opacity: 0 }}
            whileInView={{ rotate: -6, scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="absolute -top-10 -right-10 hidden w-48 rounded-lg bg-white p-2 shadow-xl lg:block transform hover:rotate-0 transition-transform duration-500 z-10"
          >
            <div className="aspect-[3/4] overflow-hidden rounded">
              <img src="/images/me-mirror.jpg" alt="Vibe Check" className="h-full w-full object-cover" />
            </div>
            <p className="mt-2 text-center font-handwriting text-xs text-slate-900 font-bold tracking-widest">VIBE CHECK ✨</p>
          </motion.div>
          <div className="inline-flex items-center rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-sm font-medium text-indigo-600 dark:text-indigo-300">
            Let&apos;s Connect
          </div>

          <h2 className="text-4xl font-bold text-slate-900 dark:text-white md:text-5xl">Ready to collaborate?</h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-300">
            Always open to discussing AI, Robotics, and the future of Human-Machine interaction.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex min-w-[200px] items-center justify-center rounded-full bg-indigo-600 dark:bg-white px-8 py-4 font-bold text-white dark:text-slate-900 transition-transform hover:scale-105 shadow-lg shadow-indigo-500/30"
            >
              Email Me
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-w-[200px] items-center justify-center rounded-full bg-[#0077b5] hover:bg-[#006097] px-8 py-4 font-bold text-white transition-transform hover:scale-105 shadow-lg shadow-blue-500/30"
            >
              LinkedIn
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a
              href={`https://wa.me/917543037822`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-w-[200px] items-center justify-center rounded-full bg-green-500 hover:bg-green-600 px-8 py-4 font-bold text-white transition-transform hover:scale-105 shadow-lg shadow-green-500/30"
            >
              WhatsApp
            </a>
            <a
              href={`tel:${profile.phone}`}
              className="inline-flex min-w-[200px] items-center justify-center rounded-full bg-slate-800 hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 px-8 py-4 font-bold text-white transition-transform hover:scale-105 shadow-lg"
            >
              Call Me
            </a>
            <a
              href={`https://calendar.google.com/calendar/render?action=TEMPLATE&add=${profile.email}&text=Meeting+with+Aditya+Raj`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-w-[200px] items-center justify-center rounded-full bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#FBBC05] hover:from-[#3367D6] hover:via-[#D93025] hover:to-[#F9AB00] px-8 py-4 font-bold text-white transition-transform hover:scale-105 shadow-lg shadow-orange-500/30"
            >
              Schedule GMeet
            </a>
          </div>

          <div className="pt-12">
            <p className="text-xs text-slate-500" suppressHydrationWarning>
              {profile.location} | {profile.phone}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
