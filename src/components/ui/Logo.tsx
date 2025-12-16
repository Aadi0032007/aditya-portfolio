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
        // 1. Mouse Interaction Logic
        const handleGlobalMouseMove = (e: MouseEvent) => {
            const iconCenterX = 48;
            const iconCenterY = 48;
            const iconRadius = 24;
            const dx = e.clientX - iconCenterX;
            const dy = e.clientY - iconCenterY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const detectionRadius = 250;

            if (distance < detectionRadius) {
                const force = Math.pow((detectionRadius - distance) / detectionRadius, 2);
                const maxDisplacement = 400;
                const moveDistance = maxDisplacement * force;
                const angle = Math.atan2(dy, dx);

                let moveX = -(Math.cos(angle) * moveDistance);
                let moveY = -(Math.sin(angle) * moveDistance);

                // Clamp logic...
                const margin = 30;
                const currentX = 24; const currentY = 24;
                const targetX = currentX + moveX;
                const targetY = currentY + moveY;
                if (targetX < margin) moveX = margin - currentX;
                if (targetX > window.innerWidth - margin - iconRadius * 2) moveX = window.innerWidth - margin - iconRadius * 2 - currentX;
                if (targetY < margin) moveY = margin - currentY;
                if (targetY > window.innerHeight - margin - iconRadius * 2) moveY = window.innerHeight - margin - iconRadius * 2 - currentY;

                x.set(moveX);
                y.set(moveY);
            } else {
                // Only reset if NO Gyro active (simple check, or we let Gyro take over if mouse is far)
                // For hybrid, we might want to sum them, but for now reset is fine as mouse overrides tilt
                x.set(0);
                y.set(0);
            }
        };

        // 2. Gyro Interaction Logic (Anti-Gravity)
        const handleOrientation = (e: DeviceOrientationEvent) => {
            // If mouse is INTERACTING (distance < radius), ignore gyro? 
            // Or cleaner: Gyro applies a constant "wind" force.

            // Let's implement simple "Gravity Slide"
            // Tilt Right (Gamma > 0) -> Slides Right
            // Tilt Down (Beta > 0) -> Slides Down

            const gamma = e.gamma || 0; // Left/Right -90 to 90
            const beta = e.beta || 0; // Front/Back -180 to 180

            // Calibration: 45deg holding angle
            const xTilt = gamma;
            const yTilt = beta - 45;

            // Slide factor
            const factor = 2;

            // This is a subtle effect, not full screen travel
            // Just shifting center of mass
            // We set the 'spring target' to this offset

            // NOTE: We only update if we are NOT in mouse interaction mode.
            // Needs state? For simplicity, we'll let mouse event override this via high frequency updates,
            // but since deviceorientation fires separately, they might fight.
            // Ideally: MotionValue = MouseEffect + GyroEffect.

            // For now, let's just create a ref to track if mouse is active?
            // Actually, easiest way is to apply this only if mouse is undefined or far.
            // But since this runs on mobile, 'mousemove' won't happen often.

            // Map tilt to position
            const newX = xTilt * factor;
            const newY = yTilt * factor;

            // Check if within clamp
            // (Simplified for brevity as standard use is mostly center)
            x.set(newX);
            y.set(newY);
        };

        // Detect touch device roughly
        const isTouch = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

        if (isTouch) {
            window.addEventListener('deviceorientation', handleOrientation);
        } else {
            window.addEventListener('mousemove', handleGlobalMouseMove);
        }

        return () => {
            window.removeEventListener('mousemove', handleGlobalMouseMove);
            window.removeEventListener('deviceorientation', handleOrientation);
        };
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
