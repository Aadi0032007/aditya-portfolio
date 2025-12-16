'use client';

import { useUIStore } from '@/store/ui';
import { profile } from '@/data/resume';
import { useEffect, useMemo } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export function Hero() {
  const setPointer = useUIStore((s) => s.setPointer);
  const setActiveSection = useUIStore((s) => s.setActiveSection);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  // Parallax effect for the card
  const rotateX = useTransform(springY, [-1, 1], [5, -5]);
  const rotateY = useTransform(springX, [-1, 1], [-5, 5]);

  useEffect(() => {
    setActiveSection('hero');
  }, [setActiveSection]);

  const handlePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const normalizedX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const normalizedY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    setPointer(normalizedX, normalizedY);
    mouseX.set(normalizedX);
    mouseY.set(normalizedY);
  };

  const contactButtons = useMemo(
    () => [
      { label: 'LinkedIn', href: profile.linkedin },
      { label: 'GitHub', href: profile.github },
      { label: 'Email', href: `mailto:${profile.email}` },
      { label: 'WhatsApp', href: 'https://wa.me/917543037822' }
    ],
    []
  );

  return (
    <section
      id="hero"
      className="perspective-1000 relative flex min-h-[85vh] flex-col justify-center px-4 py-20 md:px-0"
      onPointerMove={handlePointerMove}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative mx-auto w-full max-w-5xl rounded-[2rem] border border-white/10 dark:bg-slate-900/80 bg-white/90 p-8 shadow-2xl backdrop-blur-xl md:p-16 transition-colors"
      >
        {/* Decorative elements */}
        <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-purple-500/20 blur-3xl" />

        <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-shrink-0 order-first md:mr-12"
          >
            <div className="relative h-48 w-48 overflow-hidden rounded-full border-4 border-white/10 shadow-2xl md:h-72 md:w-72">
              <img
                src={profile.imageUrl}
                alt={profile.name}
                className="h-full w-full object-cover scale-125 object-[center_20%]"
              />
              <div className="absolute inset-0" />
            </div>
          </motion.div>

          <div className="space-y-6 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-indigo-500 dark:text-indigo-300 mx-auto md:mx-0"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-500"></span>
              </span>
              Available for Collaboration
            </motion.div>

            <div className="space-y-2">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-display text-5xl font-bold tracking-tight text-slate-900 dark:text-white md:text-7xl lg:text-8xl"
              >
                {profile.name}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-200 dark:to-purple-200 bg-clip-text text-xl font-light text-transparent md:text-2xl"
              >
                {profile.title}
              </motion.p>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-300/90 mx-auto md:mx-0"
            >
              {profile.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4 pt-4 justify-center md:justify-start"
            >
              {contactButtons.map((btn) => (
                <a
                  key={btn.label}
                  href={btn.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative overflow-hidden rounded-full border border-slate-200 dark:border-white/20 bg-white/5 px-6 py-2.5 text-sm font-medium text-slate-700 dark:text-white transition-all hover:bg-white/10 hover:border-indigo-400/50"
                >
                  <span className="relative z-10">{btn.label}</span>
                  <div className="absolute inset-0 -z-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 transition-opacity group-hover:opacity-100" />
                </a>
              ))}
              <a
                href={`tel:${profile.phone}`}
                className="group relative overflow-hidden rounded-full border border-slate-200 dark:border-white/20 bg-white/5 px-6 py-2.5 text-sm font-medium text-slate-700 dark:text-white transition-all hover:bg-white/10 hover:border-indigo-400/50"
              >
                <span className="relative z-10">{profile.phone}</span>
                <div className="absolute inset-0 -z-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 transition-opacity group-hover:opacity-100" />
              </a>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
