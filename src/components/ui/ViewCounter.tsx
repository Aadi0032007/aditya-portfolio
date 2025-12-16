'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

export function ViewCounter() {
    const [views, setViews] = useState<number>(0);
    const hasFetched = useRef(false);

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        // API: counterapi.dev
        // Namespace: adityaraj-portfolio-v1
        // Key: views
        // Action: up (increments and returns new count)
        // This provides permanent storage on their servers.
        fetch('https://api.counterapi.dev/v1/adityaraj-portfolio-v1/views/up')
            .then((res) => {
                if (!res.ok) throw new Error('Network response was not ok');
                return res.json();
            })
            .then((data) => {
                // API returns { count: number }
                if (typeof data.count === 'number') {
                    setViews(data.count);
                }
            })
            .catch((err) => {
                console.error('View counter failed:', err);
                // Fallback to 1 if it fails, just so it's not 0 forever
                setViews((v) => (v === 0 ? 1 : v));
            });
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-4 flex justify-center"
        >
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-700/50 bg-slate-900/40 px-3 py-1 text-xs font-medium text-slate-400 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                </span>
                <span>{views.toLocaleString()} Views</span>
            </div>
        </motion.div>
    );
}
