'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { profile } from '@/data/resume';

interface EmailButtonProps {
    email: string;
    className?: string;
    label?: string;
}

export function EmailButton({ email, className, label = 'Email' }: EmailButtonProps) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleAction = (platform: 'gmail' | 'outlook' | 'default' | 'copy') => {
        // 1. Copy to clipboard
        navigator.clipboard.writeText(email).then(() => {
            console.log('Email copied to clipboard');
        }).catch(err => console.error('Failed to copy:', err));

        // 2. Open Platform
        let url = '';
        switch (platform) {
            case 'gmail':
                url = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`;
                break;
            case 'outlook':
                url = `https://outlook.live.com/default.aspx?rru=compose&to=${email}`;
                break;
            case 'default':
                url = `mailto:${email}`;
                break;
            case 'copy':
                // Already copied, just close
                setIsOpen(false);
                return;
        }

        if (url) {
            window.open(url, '_blank', 'noopener,noreferrer');
        }
        setIsOpen(false);
    };

    return (
        <div className="relative inline-block" ref={containerRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={className}
                type="button"
            >
                <span className="relative z-10">{label}</span>
                <div className="absolute inset-0 -z-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 transition-opacity group-hover:opacity-100" />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 mt-2 w-48 origin-top-left overflow-hidden rounded-xl border border-slate-200 bg-white/95 p-1 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/95 z-50 ring-1 ring-black/5"
                    >
                        <div className="flex flex-col gap-1">
                            <button
                                onClick={() => handleAction('gmail')}
                                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                            >
                                <img src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg" alt="Gmail" className="h-5 w-5" />
                                Gmail
                            </button>

                            <button
                                onClick={() => handleAction('outlook')}
                                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                            >
                                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 17L1 7L13 1L23 5V19L13 23L1 17Z" fill="#0078D4" />
                                    <path d="M1 7L13 11V23L1 17V7Z" fill="#28A8EA" />
                                    <path d="M13 1L1 7V9.76404L13 4.63404V1Z" fill="#1490DF" />
                                    <path d="M23 10V19L13 23V11L23 6.99999V10Z" fill="#0078D4" />
                                    <path d="M13.8 21.05L21.45 18.05V9.40002L13.8 12.8V21.05Z" fill="#28A8EA" />
                                    <rect x="8" y="10" width="3" height="6" fill="white" />
                                    <rect x="14" y="10.8" width="3" height="5" fill="white" />
                                    <path d="M9.5 10C8.67157 10 8 10.6716 8 11.5V14.5C8 15.3284 8.67157 16 9.5 16C10.3284 16 11 15.3284 11 14.5V11.5C11 10.6716 10.3284 10 9.5 10Z" fill="white" />
                                </svg>
                                Outlook
                            </button>

                            <button
                                onClick={() => handleAction('default')}
                                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                            >
                                <svg className="h-5 w-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                Default App
                            </button>

                            <div className="my-1 h-px bg-slate-200 dark:bg-slate-700" />

                            <button
                                onClick={() => handleAction('copy')}
                                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                            >
                                <svg className="h-5 w-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                                Copy ID
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
