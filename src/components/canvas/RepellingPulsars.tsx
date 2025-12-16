'use client';

import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { InstancedMesh, Object3D, Vector3 } from 'three';
import { useUIStore } from '@/store/ui';

export function RepellingPulsars() {
    const meshRef = useRef<InstancedMesh>(null);
    const count = 1200; // Increased count
    const dummy = useMemo(() => new Object3D(), []);

    // Initial state with original positions for elastic return
    const particles = useMemo(() => {
        return Array.from({ length: count }, () => {
            const pos = new Vector3(
                (Math.random() - 0.5) * 45,
                (Math.random() - 0.5) * 35,
                (Math.random() - 0.5) * 20 - 5
            );
            return {
                position: pos.clone(),
                originalPos: pos.clone(),
                velocity: new Vector3(0, 0, 0),
                phase: Math.random() * Math.PI * 2,
                colorBase: pos.y // Use Y pos for gradient base
            };
        });
    }, []);

    const pointer = useUIStore((s) => s.pointer);

    useFrame((state) => {
        if (!meshRef.current) return;

        // Smooth pointer data (optional, but raw is fine for instant reaction)
        const targetX = pointer.x * 14;
        const targetY = pointer.y * 9;
        const time = state.clock.elapsedTime;

        particles.forEach((p, i) => {
            // 1. Repulsion Logic
            const dx = p.position.x - targetX;
            const dy = p.position.y - targetY;
            const distSq = dx * dx + dy * dy;
            const dist = Math.sqrt(distSq);

            const radius = 6; // Larger interaction radius
            if (dist < radius) {
                // Shockwave effect: Force is stronger at the ring of the radius
                const force = Math.max(0, (radius - dist)) * 0.15; // Very strong kick
                const angle = Math.atan2(dy, dx);

                // Add "Explosion" velocity
                p.velocity.x += Math.cos(angle) * force;
                p.velocity.y += Math.sin(angle) * force;
                p.velocity.z += Math.random() * force * 0.5; // Z-axis scatter
            }

            // 2. Hyper-Elastic Return
            // Hooke's Law: F = -k * displacement
            const springK = 0.05; // Snappier return
            p.velocity.x += (p.originalPos.x - p.position.x) * springK;
            p.velocity.y += (p.originalPos.y - p.position.y) * springK;
            p.velocity.z += (p.originalPos.z - p.position.z) * springK;

            // 3. Physics Update
            p.velocity.multiplyScalar(0.85); // Critical damping to prevent endless wobble
            p.position.add(p.velocity);

            // 4. Visuals: Streaking & Energy Surge
            const speed = p.velocity.length();

            dummy.position.copy(p.position);

            // Orient towards velocity for streak
            if (speed > 0.01) {
                const angle = Math.atan2(p.velocity.y, p.velocity.x);
                dummy.rotation.z = angle;
                // Scale X based on speed (Streak), Scale Y shrinks
                dummy.scale.set(1 + speed * 8, Math.max(0.2, 1 - speed * 2), 1);
            } else {
                dummy.rotation.z = 0;
                // Idle Pulse
                const pulse = 1 + Math.sin(time * 2 + p.phase) * 0.3;
                dummy.scale.setScalar(pulse);
            }

            dummy.updateMatrix();
            meshRef.current!.setMatrixAt(i, dummy.matrix);

            // Dynamic Color (Hotter when fast)
            // We can't easily change per-instance color without attributes, 
            // but we can simulate it with scale or by accepting uniform color for now.
            // For true per-instance color change, we'd need setColorAt, which is expensive every frame.
            // Optimization: modulate scale/size effectively 'brightens' the pixel contribution.
        });
        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    const theme = useUIStore((s) => s.theme);
    const isDark = theme === 'dark';

    return (
        <instancedMesh ref={meshRef} args={[undefined as any, undefined as any, count]}>
            {/* Elongated Geometry for better streaking */}
            <boxGeometry args={[0.04, 0.04, 0.04]} />
            <meshStandardMaterial
                color={isDark ? "#a5b4fc" : "#4f46e5"}
                emissive={isDark ? "#818cf8" : "#4338ca"} // Indigo glow
                emissiveIntensity={isDark ? 3 : 1}
                transparent
                opacity={isDark ? 0.8 : 0.6}
                roughness={0.1}
                metalness={0.8}
            />
        </instancedMesh>
    );
}
