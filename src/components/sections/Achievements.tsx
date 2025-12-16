'use client';

import { achievements } from '@/data/resume';
import { useUIStore } from '@/store/ui';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

export function Achievements() {
    const setActiveSection = useUIStore((s) => s.setActiveSection);
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => entries.forEach((entry) => entry.isIntersecting && setActiveSection('achievements')),
            { threshold: 0.5 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [setActiveSection]);

    return (
        <section ref={ref} id="achievements" className="section-shell px-6 py-10 md:px-12 md:py-16">
            <div className="space-y-8">
                <div className="flex items-center gap-3">
                    <div className="code-badge">Achievements</div>
                    <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                </div>

                <div className="grid gap-4">
                    {achievements.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex items-start gap-4 rounded-xl border border-indigo-200/50 dark:border-white/5 bg-white/90 dark:bg-slate-900/80 p-5 hover:border-accent/20"
                        >
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-500/10 dark:bg-accent/10 text-indigo-600 dark:text-accent">
                                ★
                            </span>
                            <div className="flex flex-col">
                                <p className="text-slate-700 dark:text-slate-200 leading-relaxed">{item.text}</p>
                                {item.url && (
                                    <a
                                        href={item.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="mt-2 text-sm text-indigo-600 dark:text-accent hover:underline decoration-indigo-300 dark:decoration-accent/50 underline-offset-4 w-fit"
                                    >
                                        View details &rarr;
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
