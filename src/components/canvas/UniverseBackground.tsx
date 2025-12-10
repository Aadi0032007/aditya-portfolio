'use client';

import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Group, InstancedMesh, Matrix4, Vector3 } from 'three';
import { Line } from '@react-three/drei';
import { TensorField } from './TensorField';
import { RoboticArm } from './RoboticArm';
import { useUIStore } from '@/store/ui';

function StarVeil() {
  const meshRef = useRef<InstancedMesh>(null);
  const dummy = useMemo(() => new Matrix4(), []);
  const velocities = useMemo(() =>
    Array.from({ length: 420 }, () => new Vector3((Math.random() - 0.5) * 0.001, (Math.random() - 0.5) * 0.002, 0)),
  []);
  const positions = useMemo(() =>
    Array.from({ length: 420 }, () => new Vector3((Math.random() - 0.5) * 18, (Math.random() - 0.5) * 12, (Math.random() - 0.5) * 10)),
  []);
  const pointer = useUIStore((s) => s.pointer);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    positions.forEach((pos, i) => {
      pos.add(velocities[i]);
      if (pos.y > 7) pos.y = -7;
      if (pos.y < -7) pos.y = 7;
      const pull = new Vector3(pointer.x * 6, pointer.y * 4, 0).sub(pos).multiplyScalar(0.0008);
      pos.add(pull);
      dummy.setPosition(pos.x + Math.sin(t * 0.1 + i) * 0.02, pos.y, pos.z);
      meshRef.current!.setMatrixAt(i, dummy);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined as any, undefined as any, positions.length]}> 
      <sphereGeometry args={[0.06, 6, 6]} />
      <meshBasicMaterial color="#7dd3fc" transparent opacity={0.6} />
    </instancedMesh>
  );
}

function OrbitalTraces() {
  const lineGroup = useRef<Group>(null);
  const pointer = useUIStore((s) => s.pointer);
  const bands = useMemo(() => {
    return Array.from({ length: 4 }, (_, idx) => {
      const pts: Vector3[] = [];
      const radius = 3 + idx * 0.8;
      for (let i = 0; i < 360; i++) {
        const a = (i / 180) * Math.PI;
        const wobble = Math.sin(a * 3 + idx) * 0.2;
        pts.push(new Vector3(Math.cos(a) * radius, Math.sin(a) * (radius * 0.28 + wobble), Math.sin(a * 1.5) * 0.6));
      }
      return pts;
    });
  }, []);

  useFrame(({ clock }) => {
    if (!lineGroup.current) return;
    const t = clock.getElapsedTime();
    lineGroup.current.rotation.y = t * 0.08 + pointer.x * 0.4;
    lineGroup.current.rotation.x = Math.sin(t * 0.3) * 0.1 + pointer.y * 0.3;
  });

  return (
    <group ref={lineGroup} position={[0, 0, -3]}>
      {bands.map((pts, idx) => (
        <Line key={idx} points={pts} color={idx % 2 === 0 ? '#a855f7' : '#7dd3fc'} transparent opacity={0.4} lineWidth={1.2} />
      ))}
    </group>
  );
}

function IonicCurtain() {
  const meshRef = useRef<InstancedMesh>(null);
  const dummy = useMemo(() => new Matrix4(), []);
  const pointer = useUIStore((s) => s.pointer);
  const nodes = useMemo(() =>
    Array.from({ length: 120 }, () => ({
      anchor: new Vector3((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 6, (Math.random() - 0.5) * 6),
      offset: Math.random() * Math.PI * 2
    })),
  []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    nodes.forEach((node, idx) => {
      const osc = Math.sin(t * 0.8 + node.offset) * 0.6;
      const follow = new Vector3(pointer.x * 3, pointer.y * 2, 0).multiplyScalar(0.2);
      dummy.setPosition(node.anchor.x + osc * 0.4 + follow.x, node.anchor.y + osc * 0.3 + follow.y, node.anchor.z);
      dummy.scale.setScalar(0.4 + Math.abs(Math.sin(t + idx)) * 0.35);
      meshRef.current!.setMatrixAt(idx, dummy);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined as any, undefined as any, nodes.length]}>
      <icosahedronGeometry args={[0.35, 0]} />
      <meshStandardMaterial color="#bef264" emissive="#a855f7" emissiveIntensity={0.7} roughness={0.2} metalness={0.6} />
    </instancedMesh>
  );
}

export function UniverseBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }} dpr={[1, 1.8]}>
        <color attach="background" args={[0.03, 0.05, 0.1]} />
        <ambientLight intensity={0.4} />
        <pointLight position={[6, 6, 6]} intensity={1.3} />
        <StarVeil />
        <TensorField />
        <OrbitalTraces />
        <IonicCurtain />
        <group position={[2.6, -1, -2]} scale={0.8}>
          <RoboticArm />
        </group>
      </Canvas>
    </div>
  );
}
