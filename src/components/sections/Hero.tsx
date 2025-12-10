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
  const springX = useSpring(mouseX, { stiffness: 120, damping: 18 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 18 });
  const glowX = useTransform(springX, (v) => `${v * 18}px`);
  const glowY = useTransform(springY, (v) => `${v * 18}px`);

  useEffect(() => setActiveSection('hero'), [setActiveSection]);

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
      { label: 'Email', href: `mailto:${profile.email}` }
    ],
    []
  );

  return (
    <section
      id="hero"
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 px-8 py-14 shadow-glass lg:px-16"
      onPointerMove={handlePointerMove}
    >
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(circle at 50% 40%, rgba(59,130,246,0.16), transparent 40%)', x: glowX, y: glowY }}
        aria-hidden
      />
      <div className="absolute inset-0 opacity-50" style={{ backgroundImage: 'linear-gradient(120deg, rgba(125,211,252,0.15), transparent 40%), linear-gradient(300deg, rgba(168,85,247,0.15), transparent 45%)' }} />
      <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm uppercase tracking-[0.25em] text-slate-200">
            The Computational Universe
          </div>
          <div className="space-y-2">
            <p className="text-sm text-slate-300">{profile.location} · {profile.email}</p>
            <h1 className="font-display text-4xl font-semibold text-white md:text-6xl neon-text">{profile.name}</h1>
            <p className="text-xl text-slate-300">{profile.title}</p>
            <p className="max-w-xl text-lg text-slate-200/90">{profile.tagline}</p>
            <p className="text-sm text-slate-400">Mobile: {profile.phone}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {contactButtons.map((item) => (
              <a key={item.label} className="btn-primary" href={item.href} target="_blank" rel="noreferrer">
                {item.label}
              </a>
            ))}
            <motion.span
              className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm"
              animate={{ y: [0, -6, 0], x: [0, 4, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              Neural Constellation · IK Arm · Chaos Theory
            </motion.span>
          </div>
        </div>
        <div className="relative z-10 grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between text-sm text-slate-300">
            <span>Robotics · AI · Physics</span>
            <span className="rounded-full bg-accent/20 px-3 py-1 text-accent">Live</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-white/5 bg-gradient-to-br from-white/5 to-transparent p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Operating Envelope</p>
              <p className="text-xl font-semibold text-white">Autonomous Agents</p>
              <p className="text-sm text-slate-300">LangChain · Transformers · VLMs</p>
            </div>
            <div className="rounded-xl border border-white/5 bg-gradient-to-br from-white/5 to-transparent p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Realtime Stack</p>
              <p className="text-xl font-semibold text-white">GPU Orchestration</p>
              <p className="text-sm text-slate-300">CUDA · Azure · Docker · AKS</p>
            </div>
            <div className="rounded-xl border border-white/5 bg-gradient-to-br from-white/5 to-transparent p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Research Grade</p>
              <p className="text-xl font-semibold text-white">Chaos-Inspired Control</p>
              <p className="text-sm text-slate-300">Lorenz attractors · IK · feedback loops</p>
            </div>
            <div className="rounded-xl border border-white/5 bg-gradient-to-br from-white/5 to-transparent p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Field Focus</p>
              <p className="text-xl font-semibold text-white">Healthcare &amp; Robotics</p>
              <p className="text-sm text-slate-300">Multimodal perception · assistive flows</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
