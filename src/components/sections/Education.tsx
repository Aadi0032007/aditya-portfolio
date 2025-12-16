'use client';

import { education } from '@/data/resume';
import { useUIStore } from '@/store/ui';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

export function Education() {
    const setActiveSection = useUIStore((s) => s.setActiveSection);
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => entries.forEach((entry) => entry.isIntersecting && setActiveSection('education')),
            { threshold: 0.5 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [setActiveSection]);

    return (
        <section ref={ref} id="education" className="section-shell px-6 py-10 md:px-12 md:py-16">
            <div className="flex flex-col gap-8">
                <div className="flex items-center gap-3">
                    <div className="code-badge">Education</div>
                    <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    <div className="space-y-6 lg:col-span-2">
                        <div className="grid gap-6 md:grid-cols-2">
                            {education.map((edu, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="group relative overflow-hidden rounded-2xl border border-indigo-200/50 dark:border-white/10 bg-white/95 dark:bg-slate-900/80 p-6 backdrop-blur-sm transition-all hover:border-indigo-500 hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] dark:hover:border-indigo-400"
                                >
                                    <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-accent/5 blur-2xl transition-all group-hover:bg-accent/10" />

                                    <h3 className="relative z-10 text-lg font-semibold text-slate-900 dark:text-white">{edu.institution}</h3>
                                    <div className="mt-2 flex items-center justify-between text-sm">
                                        <span className="text-indigo-600 dark:text-accent">{edu.degree}</span>
                                        <span className="text-slate-600 dark:text-slate-400">{edu.period}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Graduation Image Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="relative hidden overflow-hidden rounded-2xl border border-indigo-200/50 dark:border-white/10 bg-white/90 dark:bg-slate-900/80 p-2 lg:block md:h-full"
                    >
                        <div className="relative h-full w-full overflow-hidden rounded-xl">
                            <img
                                src="/images/graduation.jpg"
                                alt="Graduation"
                                className="h-full w-full object-cover transition-transform duration-700 scale-110 hover:scale-125"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                                <p className="text-white font-medium">Convocation Day 🎓</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
