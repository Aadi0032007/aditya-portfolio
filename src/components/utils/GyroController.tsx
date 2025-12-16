'use client';

import { useEffect } from 'react';
import { useUIStore } from '@/store/ui';

export function GyroController() {
    const setPointer = useUIStore((s) => s.setPointer);

    useEffect(() => {
        // Only active if DeviceOrientation is available
        if (typeof window === 'undefined' || !window.DeviceOrientationEvent) return;

        const handleOrientation = (e: DeviceOrientationEvent) => {
            // Beta: Front/Back tilt [-180, 180]
            // Gamma: Left/Right tilt [-90, 90]
            const beta = e.beta || 0;
            const gamma = e.gamma || 0;

            // Normalize to [-1, 1] range like pointer
            // We limit the interactive range to +/- 45 degrees for better control
            // X = Gamma (Left/Right)
            // Y = Beta (Front/Back) - calibrated to 45 degree holding angle

            const maxTilt = 45;

            // Map gamma (-45 to 45) to (-1 to 1)
            const x = Math.max(-1, Math.min(1, gamma / maxTilt));

            // Map beta (holding phone at ~45 deg is neutral)
            // 45 deg = 0 input
            // 0 deg (flat) = -1 input
            // 90 deg (vertical) = 1 input
            const calibratedBeta = beta - 45;
            const y = Math.max(-1, Math.min(1, calibratedBeta / maxTilt));

            // Update global pointer (only if significant movement to avoid jitter)
            // Or just raw update for smoothness
            setPointer(x, y);
        };

        window.addEventListener('deviceorientation', handleOrientation);
        return () => window.removeEventListener('deviceorientation', handleOrientation);
    }, [setPointer]);

    return null; // Logic-only component
}
