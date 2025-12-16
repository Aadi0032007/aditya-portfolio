'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useEffect } from 'react';

export function Logo() {
    const ref = useRef<HTMLDivElement>(null);

    // Motion values for position
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Derived rotations for "Tilt" effect
    // When it moves left (negative X), it rotates Y positive (looking right/away)
    const rotateX = useTransform(y, [-200, 200], [45, -45]);
    const rotateY = useTransform(x, [-200, 200], [-45, 45]);

    // Spring physics for smooth return and movement
    // Stiffer spring for sharper reaction
    const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    useEffect(() => {
        const handleGlobalMouseMove = (e: MouseEvent) => {
            // Fixed position of the icon (Left: 24px + 24px radius = 48px center)
            const iconCenterX = 48;
            const iconCenterY = 48;
            const iconRadius = 24;

            const dx = e.clientX - iconCenterX;
            const dy = e.clientY - iconCenterY;

            const distance = Math.sqrt(dx * dx + dy * dy);
            const detectionRadius = 250;

            if (distance < detectionRadius) {
                // Exponential force for stronger close-range reaction
                const force = Math.pow((detectionRadius - distance) / detectionRadius, 2);
                const maxDisplacement = 400; // Can move up to 400px away
                const moveDistance = maxDisplacement * force;

                // Direction vector (normalized)
                const angle = Math.atan2(dy, dx);

                // Move OPPOSITE to cursor
                let moveX = -(Math.cos(angle) * moveDistance);
                let moveY = -(Math.sin(angle) * moveDistance);

                // Boundary checks (Icon fixed at 24,24)
                const margin = 30; // Safety margin
                const currentX = 24;
                const currentY = 24;

                const targetX = currentX + moveX;
                const targetY = currentY + moveY;

                // Hard clamp with "squish" potential (future)
                // For now, simple clamp to ensure visibility
                if (targetX < margin) moveX = margin - currentX;
                if (targetX > window.innerWidth - margin - iconRadius * 2) moveX = window.innerWidth - margin - iconRadius * 2 - currentX;

                if (targetY < margin) moveY = margin - currentY;
                if (targetY > window.innerHeight - margin - iconRadius * 2) moveY = window.innerHeight - margin - iconRadius * 2 - currentY;

                x.set(moveX);
                y.set(moveY);
            } else {
                x.set(0);
                y.set(0);
            }
        };

        window.addEventListener('mousemove', handleGlobalMouseMove);
        return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
    }, [x, y]);

    return (
        <motion.div
            ref={ref}
            style={{
                x: springX,
                y: springY,
                rotateX: rotateX,
                rotateY: rotateY,
                perspective: 1000
            }}
            className="fixed left-6 top-6 z-50 h-10 w-10 md:h-12 md:w-12 overflow-hidden rounded-full border-2 border-white/20 shadow-xl backdrop-blur-sm cursor-default select-none pointer-events-none"
        >
            <img
                src="/images/avatar-icon.jpg"
                alt="Aditya Icon"
                className="h-full w-full object-cover"
                draggable="false"
            />
        </motion.div>
    );
}
