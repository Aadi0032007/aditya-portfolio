'use client';

import { Canvas } from '@react-three/fiber';
import { TensorField } from '../canvas/TensorField';
import { RoboticArm } from '../canvas/RoboticArm';
import { useUIStore } from '@/store/ui';
import { profile } from '@/data/resume';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

export function Hero() {
  const setPointer = useUIStore((s) => s.setPointer);
  const setActiveSection = useUIStore((s) => s.setActiveSection);

  useEffect(() => setActiveSection('hero'), [setActiveSection]);

  return (
    <section
      id="hero"
      className="relative overflow-hidden rounded-3xl border border-white/5 bg-slate-900/40 px-8 py-16 lg:px-16"
      onMouseMove={(e) => setPointer(e.clientX, e.clientY)}
    >
      <div className="grid gap-10 lg:grid-cols-2 items-center">
        <div className="relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm uppercase tracking-[0.25em] text-slate-200">
            The Computational Universe
          </div>
          <div className="space-y-2">
            <p className="text-sm text-slate-300">{profile.location} · {profile.email}</p>
            <h1 className="text-4xl md:text-6xl font-semibold font-display neon-text">{profile.name}</h1>
            <p className="text-xl text-slate-300">{profile.title}</p>
            <p className="max-w-xl text-lg text-slate-200/90">{profile.tagline}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a className="btn-primary" href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a className="btn-secondary" href={profile.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <motion.span
              className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              Neural Constellation · IK Arm · Chaos Theory
            </motion.span>
          </div>
        </div>
        <div className="relative h-[520px] rounded-3xl border border-white/5 bg-gradient-to-b from-slate-900 to-slate-950">
          <div className="absolute inset-0">
            <Canvas camera={{ position: [0, 0, 6], fov: 60 }}>
              <ambientLight intensity={0.6} />
              <pointLight position={[5, 5, 5]} intensity={1.5} />
              <TensorField />
              <RoboticArm />
            </Canvas>
          </div>
          <div className="absolute inset-0 grid-overlay" />
        </div>
      </div>
    </section>
  );
}
