'use client';

import { Hero } from '@/components/sections/Hero';
import { Summary } from '@/components/sections/Summary';
import { Experience } from '@/components/sections/Experience';
import { Projects } from '@/components/sections/Projects';
import { Skills } from '@/components/sections/Skills';
import { Contact } from '@/components/sections/Contact';
import { useUIStore } from '@/store/ui';
import { useEffect } from 'react';

export default function Page() {
  const setPointer = useUIStore((s) => s.setPointer);

  useEffect(() => {
    const handler = (e: PointerEvent) => {
      const normalizedX = (e.clientX / window.innerWidth) * 2 - 1;
      const normalizedY = (e.clientY / window.innerHeight) * 2 - 1;
      setPointer(normalizedX, normalizedY);
    };
    window.addEventListener('pointermove', handler);
    return () => window.removeEventListener('pointermove', handler);
  }, [setPointer]);

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10 md:px-6">
      <Hero />
      <Summary />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
    </main>
  );
}
