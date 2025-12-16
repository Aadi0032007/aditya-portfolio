'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function ViewCounter() {
    const [views, setViews] = useState<number | null>(null);

    useEffect(() => {
        // Using CountAPI (free, no auth)
        // Namespace: adityaraj-portfolio-production
        // Key: visits
        // "hit" endpoint increments and returns the new value
        fetch('https://api.countapi.xyz/hit/adityaraj-portfolio-production/visits')
            .then((res) => res.json())
            .then((data) => setViews(data.value))
            .catch((err) => console.error('Error fetching views:', err));
    }, []);

    if (views === null) return null;

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
