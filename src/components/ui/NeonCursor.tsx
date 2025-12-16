'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useUIStore } from '@/store/ui';

export function NeonCursor() {
    const theme = useUIStore((s) => s.theme);
    const isDark = theme === 'dark';
    const [clicked, setClicked] = useState(false);

    // High Contrast Colors
    // Dark Mode: Electric Cyan (pops against deep blue)
    // Light Mode: Hot Fuchsia (pops against white)
    const cursorColor = isDark ? '#00f3ff' : '#c026d3';

    // Mouse state
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // Smooth springs for the ring (delayed follow)
    const springConfig = { damping: 25, stiffness: 150 };
    const ringX = useSpring(mouseX, springConfig);
    const ringY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const moveHandler = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        const downHandler = () => setClicked(true);
        const upHandler = () => setClicked(false);

        window.addEventListener('mousemove', moveHandler);
        window.addEventListener('mousedown', downHandler);
        window.addEventListener('mouseup', upHandler);

        return () => {
            window.removeEventListener('mousemove', moveHandler);
            window.removeEventListener('mousedown', downHandler);
            window.removeEventListener('mouseup', upHandler);
        };
    }, [mouseX, mouseY]);

    return (
        <>
            {/* Main Dot (Instant Follow) */}
            <motion.div
                className="pointer-events-none fixed left-0 top-0 z-[9999] h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{
                    x: mouseX,
                    y: mouseY,
                    backgroundColor: cursorColor,
                    boxShadow: `0 0 15px ${cursorColor}, 0 0 30px ${cursorColor}`
                }}
            />

            {/* Trailing Ring (Smooth Follow) */}
            <motion.div
                className="pointer-events-none fixed left-0 top-0 z-[9998] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
                style={{
                    x: ringX,
                    y: ringY,
                    borderColor: cursorColor,
                    opacity: 0.6,
                    scale: clicked ? 0.8 : 1
                }}
                animate={{
                    scale: clicked ? 0.5 : 1,
                }}
                transition={{ duration: 0.1 }}
            />
        </>
    );
}
