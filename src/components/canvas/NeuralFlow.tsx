'use client';

import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { InstancedMesh, MathUtils, Object3D, Vector3 } from 'three';
import { useUIStore } from '@/store/ui';

export function NeuralFlow() {
    const meshRef = useRef<InstancedMesh>(null);
    const count = 2000; // Increased density
    const dummy = useMemo(() => new Object3D(), []);

    // Initialize particles with random positions and velocities
    const particles = useMemo(() => {
        return Array.from({ length: count }, () => ({
            position: new Vector3(
                (Math.random() - 0.5) * 25, // Wider spread
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 12
            ),
            velocity: new Vector3(0, 0, 0),
            speed: Math.random() * 0.02 + 0.01,
            offset: Math.random() * 100 // randomize flow phase
        }));
    }, []);

    const pointer = useUIStore((s) => s.pointer);

    useFrame((state) => {
        if (!meshRef.current) return;
        const time = state.clock.getElapsedTime();

        particles.forEach((particle, i) => {
            // Flow field logic (Perlin-like noise simulation)
            const { position } = particle;

            // Calculate flow vector based on position (Slower time evolution)
            const angle = (position.x * 0.5) + (position.y * 0.5) + time * 0.12; // 0.12 was 0.2

            // Add flow velocity
            particle.velocity.x += Math.cos(angle) * 0.001;
            particle.velocity.y += Math.sin(angle) * 0.001;
            particle.velocity.z += Math.sin(angle * 0.5) * 0.001;

            // Mouse interaction (Stronger Repel)
            // Pointer is normalized -1 to 1, scale to world coords roughly
            const targetX = pointer.x * 12;
            const targetY = pointer.y * 8;

            const dx = position.x - targetX;
            const dy = position.y - targetY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // Much larger interaction radius
            if (dist < 8) {
                const force = (8 - dist) * 0.04; // Stronger force
                particle.velocity.x += (dx / dist) * force;
                particle.velocity.y += (dy / dist) * force;
                particle.velocity.z += Math.random() * force * 0.5; // Add some Z chaos
            }

            // Apply velocity
            position.add(particle.velocity);

            // Dampen velocity (drag)
            particle.velocity.multiplyScalar(0.95);

            // Reset if out of bounds to create endless loop
            if (position.x > 15) position.x = -15;
            if (position.x < -15) position.x = 15;
            if (position.y > 10) position.y = -10;
            if (position.y < -10) position.y = 10;
            if (position.z > 5) position.z = -5;
            if (position.z < -5) position.z = 5;

            // Update instance matrix
            dummy.position.copy(position);

            // Scale based on speed for "streak" effect
            const speed = particle.velocity.length();
            dummy.scale.set(1 + speed * 20, 1 - speed * 5, 1);
            dummy.rotation.z = Math.atan2(particle.velocity.y, particle.velocity.x);

            dummy.updateMatrix();
            meshRef.current!.setMatrixAt(i, dummy.matrix);
        });

        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    const theme = useUIStore((s) => s.theme);
    const isDark = theme === 'dark';

    return (
        <instancedMesh ref={meshRef} args={[undefined as any, undefined as any, count]}>
            <boxGeometry args={[0.05, 0.02, 0.02]} /> {/* Tiny streaks */}
            <meshBasicMaterial
                color={isDark ? "#60a5fa" : "#3b82f6"} // Blue streaks
                transparent
                opacity={isDark ? 0.6 : 0.4}
            />
        </instancedMesh>
    );
}
