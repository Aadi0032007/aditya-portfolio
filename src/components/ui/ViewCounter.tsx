'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function ViewCounter() {
    // Default to 0 so it always renders immediately
    const [views, setViews] = useState<number>(0);

    useEffect(() => {
        // Using CountAPI
        fetch('https://api.countapi.xyz/hit/adityaraj-portfolio-production/visits')
            .then((res) => {
                if (!res.ok) throw new Error('Network response was not ok');
                return res.json();
            })
            .then((data) => setViews(data.value))
            .catch((err) => {
                console.error('View counter failed:', err);
                // If API fails (e.g. adblocker), set to a fallback value (e.g. 1) or keep 0
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
