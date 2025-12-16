'use client';

import { useFrame } from '@react-three/fiber';
import { Float, Icosahedron, Octahedron, Sphere, Stars, Torus, Box, Cylinder, Cone } from '@react-three/drei';
import { useRef } from 'react';
import { Group, MathUtils, Mesh } from 'three';
import { useUIStore } from '@/store/ui';

function NeuralCore({ position, scale = 1, color = '#6366f1' }: { position: [number, number, number], scale?: number, color?: string }) {
    const group = useRef<Group>(null);
    const ring1 = useRef<Group>(null);
    const ring2 = useRef<Group>(null);
    const ring3 = useRef<Group>(null);

    useFrame((state) => {
        if (!group.current || !ring1.current || !ring2.current || !ring3.current) return;
        const t = state.clock.elapsedTime;

        // Gyroscopic rotation
        ring1.current.rotation.x = t * 0.4;
        ring2.current.rotation.y = t * 0.3;
        ring2.current.rotation.z = t * 0.1;
        ring3.current.rotation.x = t * 0.2;
        ring3.current.rotation.y = t * 0.2;

        // Pulse core
        const scalePulse = 1 + Math.sin(t * 3) * 0.1;
        group.current.scale.setScalar(scale * scalePulse);
    });

    return (
        <group ref={group} position={position}>
            {/* Glowing Core */}
            <Sphere args={[0.6, 32, 32]}>
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} toneMapped={false} />
            </Sphere>

            {/* Gyro Rings */}
            <group ref={ring1}>
                <Torus args={[1.0, 0.05, 16, 64]}>
                    <meshStandardMaterial color={color} metalness={1} roughness={0} />
                </Torus>
            </group>
            <group ref={ring2}>
                <Torus args={[1.4, 0.03, 16, 64]} rotation={[Math.PI / 2, 0, 0]}>
                    <meshStandardMaterial color={color} metalness={1} roughness={0} />
                </Torus>
            </group>
            <group ref={ring3}>
                <Torus args={[1.8, 0.02, 16, 64]} rotation={[0, Math.PI / 2, 0]}>
                    <meshStandardMaterial color={color} metalness={1} roughness={0} />
                </Torus>
            </group>
        </group>
    );
}

function OrbitalRelay({ position, color, scale }: { position: [number, number, number], color: string, scale: number }) {
    const ref = useRef<Group>(null);
    useFrame((state) => {
        if (ref.current) {
            // Smooth float & rotate
            ref.current.rotation.y = state.clock.elapsedTime * 0.1;
            ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
        }
    });

    return (
        <group ref={ref} position={position} scale={scale}>
            {/* Main Sphere Hub */}
            <Sphere args={[0.5, 32, 32]}>
                <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
            </Sphere>

            {/* Inner Glow Core */}
            <Sphere args={[0.3, 32, 32]}>
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
            </Sphere>

            {/* Floating Rings */}
            <Torus args={[1.2, 0.02, 16, 64]} rotation={[Math.PI / 3, 0, 0]}>
                <meshStandardMaterial color={color} metalness={1} roughness={0} />
            </Torus>
            <Torus args={[0.9, 0.03, 16, 64]} rotation={[-Math.PI / 3, 0, 0]}>
                <meshStandardMaterial color={color} metalness={1} roughness={0} />
            </Torus>

            {/* Antennas (Cylinders, no Boxes) */}
            <Cylinder args={[0.02, 0.02, 2.5]} rotation={[0, 0, Math.PI / 2]}>
                <meshStandardMaterial color={color} metalness={0.8} />
            </Cylinder>
        </group>
    );
}

function RingedPlanet({ position, scale = 1 }: { position: [number, number, number], scale?: number }) {
    const group = useRef<Group>(null);
    useFrame((state) => {
        if (!group.current) return;
        group.current.rotation.y = state.clock.elapsedTime * 0.05;
    });

    return (
        <group ref={group} position={position} scale={scale}>
            <Sphere args={[1.5, 32, 32]}>
                <meshStandardMaterial color="#c084fc" metalness={0.4} roughness={0.7} />
            </Sphere>
            <Torus args={[2.2, 0.4, 2, 64]} rotation={[Math.PI / 2.5, 0, 0]}>
                <meshStandardMaterial color="#e879f9" metalness={0.8} roughness={0.2} transparent opacity={0.8} />
            </Torus>
            <Torus args={[2.8, 0.1, 2, 64]} rotation={[Math.PI / 2.5, 0, 0]}>
                <meshStandardMaterial color="#f0abfc" metalness={0.9} roughness={0.1} />
            </Torus>
        </group>
    );
}

function SolarCore({ position, scale = 1 }: { position: [number, number, number], scale?: number }) {
    const ref = useRef<Mesh>(null);
    useFrame((state) => {
        if (!ref.current) return;
        // Pulse
        const s = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
        ref.current.scale.setScalar(scale * s);
    });

    return (
        <Sphere ref={ref} args={[1, 32, 32]} position={position} scale={scale}>
            <meshStandardMaterial
                color="#f59e0b" // Amber
                emissive="#fbbf24" // Bright Amber
                emissiveIntensity={3}
                toneMapped={false}
            />
        </Sphere>
    );
}

function AsteroidBelt({ position, scale = 1 }: { position: [number, number, number], scale?: number }) {
    const group = useRef<Group>(null);
    useFrame((state) => {
        if (!group.current) return;
        group.current.rotation.y = state.clock.elapsedTime * 0.1;
    });

    return (
        <group ref={group} position={position} scale={scale}>
            {/* Main Rock */}
            <Icosahedron args={[0.8, 0]}>
                <meshStandardMaterial color="#94a3b8" roughness={0.9} flatShading />
            </Icosahedron>
            {/* Floating Debris */}
            {[...Array(5)].map((_, i) => (
                <Icosahedron key={i} args={[0.2, 0]} position={[Math.random() * 3 - 1.5, Math.random() * 3 - 1.5, Math.random() * 3 - 1.5]}>
                    <meshStandardMaterial color="#64748b" roughness={1} flatShading />
                </Icosahedron>
            ))}
        </group>
    );
}

function DataCluster({ position, color, scale }: { position: [number, number, number], color: string, scale: number }) {
    const ref = useRef<Group>(null);
    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.y = state.clock.elapsedTime * 0.2;
        }
    });

    return (
        <group ref={ref} position={position} scale={scale}>
            <Icosahedron args={[0.8, 0]}>
                <meshStandardMaterial color={color} wireframe transparent opacity={0.3} />
            </Icosahedron>
            {/* Orbiting bits */}
            {[...Array(4)].map((_, i) => (
                <Box key={i} args={[0.15, 0.15, 0.15]} position={[Math.cos(i * Math.PI / 2) * 1.2, Math.sin(i * Math.PI / 2) * 1.2, 0]} rotation={[i, i, i]}>
                    <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} />
                </Box>
            ))}
        </group>
    );
}

function RetroRocket({ position, scale = 1 }: { position: [number, number, number], scale?: number }) {
    const group = useRef<Group>(null);
    const flame = useRef<Mesh>(null);

    useFrame((state) => {
        if (!group.current || !flame.current) return;
        const t = state.clock.elapsedTime;

        // Gentle hover rotation
        group.current.rotation.z = Math.sin(t * 0.5) * 0.1;

        // Flame Flicker
        const flicker = 1 + Math.sin(t * 15) * 0.2 + Math.cos(t * 20) * 0.1;
        flame.current.scale.y = flicker;
        flame.current.position.y = -1.2 - (flicker * 0.4); // Adjust position based on scale to keep attached
    });

    return (
        <group ref={group} position={position} scale={scale} rotation={[0, 0, -Math.PI / 4]}>
            {/* Body */}
            <Cylinder args={[0.4, 0.5, 2, 16]}>
                <meshStandardMaterial color="#ffffff" metalness={0.4} roughness={0.5} />
            </Cylinder>

            {/* Window */}
            <Sphere args={[0.25]} position={[0, 0.3, 0.35]}>
                <meshStandardMaterial color="#3b82f6" metalness={0.8} roughness={0.1} />
            </Sphere>

            {/* Nose Cone */}
            <Cone args={[0.51, 1, 16]} position={[0, 1.5, 0]}>
                <meshStandardMaterial color="#ef4444" metalness={0.4} roughness={0.5} />
            </Cone>

            {/* Fins */}
            {[0, 1, 2, 3].map((i) => (
                <group key={i} rotation={[0, i * (Math.PI / 2), 0]}>
                    <Box args={[0.2, 0.8, 0.8]} position={[0.4, -0.8, 0]}>
                        <meshStandardMaterial color="#ef4444" />
                    </Box>
                </group>
            ))}

            {/* Thruster Engine */}
            <Cylinder args={[0.3, 0.4, 0.5, 16]} position={[0, -1.1, 0]}>
                <meshStandardMaterial color="#334155" />
            </Cylinder>

            {/* Flame */}
            <Cone ref={flame} args={[0.3, 2, 16]} position={[0, -2, 0]} rotation={[Math.PI, 0, 0]}>
                <meshStandardMaterial
                    color="#f59e0b" // Amber
                    emissive="#ef4444" // Red emissive
                    emissiveIntensity={2}
                    transparent
                    opacity={0.8}
                />
            </Cone>
            {/* Inner Flame */}
            <Cone args={[0.15, 1.5, 16]} position={[0, -2, 0]} rotation={[Math.PI, 0, 0]}>
                <meshStandardMaterial
                    color="#fef3c7"
                    emissive="#fbbf24"
                    emissiveIntensity={3}
                />
            </Cone>
        </group>
    );
}

function UFO({ position, scale = 1 }: { position: [number, number, number], scale?: number }) {
    const group = useRef<Group>(null);
    useFrame((state) => {
        if (!group.current) return;
        const t = state.clock.elapsedTime;
        // Hover
        group.current.rotation.y = t * 2;
        group.current.rotation.z = Math.sin(t * 3) * 0.2;
    });

    return (
        <group ref={group} position={position} scale={scale}>
            {/* Dome */}
            <Sphere args={[0.35, 32, 16]} position={[0, 0.2, 0]} scale={[1, 0.8, 1]}>
                <meshStandardMaterial color="#38bdf8" metalness={0.9} roughness={0.1} transparent opacity={0.8} />
            </Sphere>
            {/* Disk Body */}
            <Cylinder args={[1, 0.8, 0.2, 32]}>
                <meshStandardMaterial color="#cbd5e1" metalness={0.8} roughness={0.3} />
            </Cylinder>
            {/* Lights Ring */}
            {[...Array(8)].map((_, i) => (
                <Sphere key={i} args={[0.08]} position={[Math.cos(i * Math.PI / 4) * 0.9, 0, Math.sin(i * Math.PI / 4) * 0.9]}>
                    <meshStandardMaterial color="#4ade80" emissive="#22c55e" emissiveIntensity={3} />
                </Sphere>
            ))}
        </group>
    );
}

function Astronaut({ position, scale = 1 }: { position: [number, number, number], scale?: number }) {
    const group = useRef<Group>(null);
    useFrame((state) => {
        if (!group.current) return;
        const t = state.clock.elapsedTime;
        // Slow tumble
        group.current.rotation.x = t * 0.05;
        group.current.rotation.y = t * 0.05;
        group.current.rotation.z = -t * 0.02;
    });

    return (
        <group ref={group} position={position} scale={scale}>
            {/* Backpack */}
            <Box args={[0.6, 0.8, 0.45]} position={[0, 0, -0.35]}>
                <meshStandardMaterial color="#ffffff" roughness={0.9} />
            </Box>
            {/* Body */}
            <Cylinder args={[0.35, 0.35, 0.75]} position={[0, -0.1, 0]}>
                <meshStandardMaterial color="#ffffff" roughness={0.8} />
            </Cylinder>
            {/* Head */}
            <Sphere args={[0.4]} position={[0, 0.5, 0]}>
                <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.1} />
            </Sphere>
            {/* Visor */}
            <Sphere args={[0.28]} position={[0, 0.52, 0.18]} scale={[1, 0.8, 0.6]}>
                <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.1} />
            </Sphere>
            {/* Arms (Thicker) */}
            <Cylinder args={[0.1, 0.1, 0.6]} position={[0.45, 0, 0]} rotation={[0, 0, -0.4]}>
                <meshStandardMaterial color="#ffffff" roughness={0.8} />
            </Cylinder>
            <Cylinder args={[0.1, 0.1, 0.6]} position={[-0.45, 0.1, 0.2]} rotation={[0.4, 0, 0.4]}>
                <meshStandardMaterial color="#ffffff" roughness={0.8} />
            </Cylinder>
            {/* Legs (Thicker) */}
            <Cylinder args={[0.12, 0.12, 0.75]} position={[0.18, -0.65, 0]} rotation={[0.1, 0, 0]}>
                <meshStandardMaterial color="#ffffff" roughness={0.8} />
            </Cylinder>
            <Cylinder args={[0.12, 0.12, 0.75]} position={[-0.18, -0.75, 0.1]} rotation={[0.3, 0, 0]}>
                <meshStandardMaterial color="#ffffff" roughness={0.8} />
            </Cylinder>
        </group>
    );
}

function RoboticClaw({ position, scale = 1 }: { position: [number, number, number], scale?: number }) {
    const group = useRef<Group>(null);
    const arm1 = useRef<Group>(null);
    const arm2 = useRef<Group>(null);
    const claw = useRef<Group>(null);

    useFrame((state) => {
        if (!group.current || !arm1.current || !arm2.current || !claw.current) return;
        const t = state.clock.elapsedTime;

        // Base Rotation
        group.current.rotation.y = Math.sin(t * 0.5) * 0.3;

        // Articulation
        arm1.current.rotation.z = Math.sin(t * 0.3) * 0.2;
        arm2.current.rotation.z = Math.sin(t * 0.4 + 1) * 0.3;

        // Claw pinch
        const pinch = 0.5 + Math.sin(t * 2) * 0.2;
        claw.current.scale.setScalar(1);
        claw.current.rotation.x = pinch * 0.2;
    });

    return (
        <group ref={group} position={position} scale={scale}>
            {/* Base Joint */}
            <Sphere args={[0.5]} position={[0, 0, 0]}>
                <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.2} />
            </Sphere>

            {/* Arm Segment 1 */}
            <group ref={arm1}>
                <Cylinder args={[0.15, 0.2, 1.5]} position={[0, 0.75, 0]}>
                    <meshStandardMaterial color="#94a3b8" metalness={0.6} />
                </Cylinder>
                <Sphere args={[0.25]} position={[0, 1.5, 0]}>
                    <meshStandardMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={0.5} />
                </Sphere>

                {/* Arm Segment 2 */}
                <group ref={arm2} position={[0, 1.5, 0]}>
                    <Cylinder args={[0.12, 0.15, 1.2]} position={[0, 0.6, 0]} rotation={[0, 0, 0.2]}>
                        <meshStandardMaterial color="#cbd5e1" metalness={0.6} />
                    </Cylinder>

                    {/* End Effector / Claw */}
                    <group ref={claw} position={[0.2, 1.2, 0]} rotation={[0, 0, 0.2]}>
                        <Box args={[0.4, 0.4, 0.4]}>
                            <meshStandardMaterial color="#475569" />
                        </Box>
                        {/* Fingers */}
                        <Box args={[0.05, 0.5, 0.1]} position={[0.15, 0.4, 0]} rotation={[0, 0, -0.2]}>
                            <meshStandardMaterial color="#ef4444" />
                        </Box>
                        <Box args={[0.05, 0.5, 0.1]} position={[-0.15, 0.4, 0]} rotation={[0, 0, 0.2]}>
                            <meshStandardMaterial color="#ef4444" />
                        </Box>
                    </group>
                </group>
            </group>
        </group>
    );
}

export function CosmologySystem() {
    const groupRef = useRef<Group>(null);
    const theme = useUIStore((s) => s.theme);
    const isDark = theme === 'dark';

    // Scroll state
    const scrollCurrent = useRef(0);

    useFrame((state) => {
        if (!groupRef.current) return;

        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const currentScroll = window.scrollY;
        const target = totalHeight > 0 ? currentScroll / totalHeight : 0;

        // Smoother dampening
        scrollCurrent.current = MathUtils.damp(scrollCurrent.current, target, 2, state.clock.getDelta());

        const scroll = scrollCurrent.current;

        // Scroll Velocity / Warp Effect
        // Interaction Idea: "Warp Stretch"
        // Calculate velocity based on difference between target (raw scroll) and current (dampened)
        // Or simply derivative of scrollCurrent.
        // Let's use the difference for a "lag" based velocity effect.
        const scrollVelocity = (target - scroll) * 20; // Amplifier

        // Dynamic Camera Fly-through effect
        groupRef.current.position.y = scroll * 15;

        // WARP: Tilt on Z axis based on velocity (banking turn)
        groupRef.current.rotation.z = -scrollVelocity * 0.1;

        // WARP: Stretch FOV illusion (push Z slightly)
        // When moving fast, push the world away slightly to simulate "tunnel vision"
        groupRef.current.position.z = -10 + (scroll * 5) - Math.abs(scrollVelocity) * 2;

        groupRef.current.rotation.x = scroll * Math.PI * 0.3; // Tilt
        groupRef.current.rotation.y = state.clock.elapsedTime * 0.03 + (scroll * Math.PI);

    });

    return (
        <group ref={groupRef} position={[0, -5, -10]}>
            {/* Central Neural Gyroscope */}
            <Float floatIntensity={0.5} rotationIntensity={0.2}>
                <NeuralCore
                    position={[0, 5, 0]}
                    scale={1.5}
                    color={isDark ? "#8b5cf6" : "#7c3aed"}
                />
            </Float>

            {/* Detailed Satellite Station */}
            <Float floatIntensity={1} rotationIntensity={0.5} speed={1.5}>
                <OrbitalRelay
                    position={[-7, 2, 4]}
                    color={isDark ? "#3b82f6" : "#2563eb"}
                    scale={0.8}
                />
            </Float>

            {/* Data Cluster */}
            <Float floatIntensity={0.8} rotationIntensity={0.4} speed={1.2}>
                <DataCluster
                    position={[7, 4, -2]}
                    color={isDark ? "#ec4899" : "#db2777"}
                    scale={1.0}
                />
            </Float>

            {/* Distant Station */}
            <Float floatIntensity={1.2} rotationIntensity={0.6} speed={1.8}>
                <OrbitalRelay
                    position={[5, -6, 2]}
                    color={isDark ? "#06b6d4" : "#0891b2"}
                    scale={0.6}
                />
            </Float>

            {/* Distant Cluster */}
            <Float floatIntensity={0.9} rotationIntensity={0.3} speed={1}>
                <DataCluster
                    position={[-4, -3, -5]}
                    color={isDark ? "#10b981" : "#059669"}
                    scale={0.8}
                />
            </Float>

            {/* Ringed Planet (Far Left) */}
            <Float floatIntensity={0.5} rotationIntensity={0.1}>
                <RingedPlanet
                    position={[-15, 6, -5]}
                    scale={1.5}
                />
            </Float>

            {/* Pulsing Sun (Far Right) */}
            <Float floatIntensity={0.2} rotationIntensity={0}>
                <SolarCore
                    position={[15, -4, -8]}
                    scale={2}
                />
            </Float>

            {/* Asteroid Belt (Deep Center) */}
            <Float floatIntensity={1} rotationIntensity={0.5} speed={0.5}>
                <AsteroidBelt
                    position={[0, 10, -5]}
                    scale={1.2}
                />
            </Float>

            {/* Retro Rocket (Moves with Scroll) */}
            <Float floatIntensity={2} rotationIntensity={1} speed={3}>
                <RetroRocket
                    position={[8, 8, -2]} // High right, flies across
                    scale={0.8}
                />
            </Float>

            {/* UFO: Erratic Hover */}
            <Float floatIntensity={4} rotationIntensity={2} speed={5}>
                <UFO
                    position={[-8, 12, -4]}
                    scale={1.2}
                />
            </Float>

            {/* Drifting Astronaut (Larger & Whiter) */}
            <Float floatIntensity={0.5} rotationIntensity={0.5} speed={0.5}>
                <Astronaut
                    position={[-6, -8, 2]}
                    scale={1.5} // Bigger
                />
            </Float>

            {/* Robotic Arm End Effector */}
            <Float floatIntensity={0.2} rotationIntensity={0.2} speed={0.5}>
                <RoboticClaw
                    position={[10, -5, -3]}
                    scale={1.5}
                />
            </Float>

            <Stars
                radius={40}
                depth={60}
                count={2000}
                saturation={0}
                fade
                speed={0.5}
                factor={isDark ? 3 : 0}
            />
        </group>
    );
}
