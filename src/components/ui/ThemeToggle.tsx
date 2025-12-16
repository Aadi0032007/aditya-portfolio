'use client';

import { useUIStore } from '@/store/ui';
import { motion } from 'framer-motion';

export function ThemeToggle() {
    const theme = useUIStore((s) => s.theme);
    const toggleTheme = useUIStore((s) => s.toggleTheme);

    return (
        <motion.button
            onClick={toggleTheme}
            className="fixed right-6 top-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white/50 text-slate-900 shadow-lg backdrop-blur-md transition-colors hover:bg-white/80 dark:border-white/10 dark:bg-slate-900/50 dark:text-yellow-400 dark:hover:bg-slate-900/80"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            {theme === 'dark' ? (
                // Moon Icon
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                </svg>
            ) : (
                // Sun Icon
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2" />
                    <path d="M12 20v2" />
                    <path d="m4.93 4.93 1.41 1.41" />
                    <path d="m17.66 17.66 1.41 1.41" />
                    <path d="M2 12h2" />
                    <path d="M20 12h2" />
                    <path d="m6.34 17.66-1.41 1.41" />
                    <path d="m19.07 4.93-1.41 1.41" />
                </svg>
            )}
        </motion.button>
    );
}
