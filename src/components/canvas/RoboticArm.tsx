'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Cylinder, PerspectiveCamera } from '@react-three/drei';
import { Group, Quaternion, Vector3 } from 'three';
import { SectionId, useUIStore } from '@/store/ui';

const sectionTargets: Record<SectionId, Vector3> = {
  hero: new Vector3(0, 1.5, 0),
  summary: new Vector3(-0.5, 0.6, -1),
  experience: new Vector3(-0.4, 0, -1.2),
  projects: new Vector3(0.3, -0.4, -1.4),
  skills: new Vector3(0.2, -0.7, -1.2),
  contact: new Vector3(0.1, -1.1, -1)
};

export function RoboticArm() {
  const groupRef = useRef<Group>(null);
  const headRef = useRef<Group>(null);
  const activeSection = useUIStore((s) => s.activeSection);
  const pointer = useUIStore((s) => s.pointer);

  useFrame(({ camera }) => {
    if (!groupRef.current || !headRef.current) return;
    const target = sectionTargets[activeSection];
    const dir = target.clone().normalize();
    const quaternion = new Quaternion().setFromUnitVectors(new Vector3(0, 1, 0), dir);
    groupRef.current.quaternion.slerp(quaternion, 0.1);

    const pointerVec = new Vector3(pointer.x * 0.001, pointer.y * -0.001, 0);
    headRef.current.lookAt(pointerVec);

    camera.position.set(0, 0, 5);
    camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={groupRef} position={[2.6, -0.5, -1.5]}>
      <PerspectiveCamera makeDefault position={[5, 0, 5]} fov={45} />
      <Cylinder args={[0.05, 0.12, 1.5, 12]} position={[0, -0.2, 0]} rotation={[0, 0, Math.PI / 12]}>
        <meshStandardMaterial color="#7dd3fc" metalness={0.6} roughness={0.3} />
      </Cylinder>
      <Cylinder args={[0.06, 0.06, 1.2, 10]} position={[0.1, -1, 0.1]} rotation={[0, 0, -Math.PI / 8]}>
        <meshStandardMaterial color="#a855f7" metalness={0.7} roughness={0.35} />
      </Cylinder>
      <group ref={headRef} position={[0.2, -1.7, 0.1]}>
        <Cylinder args={[0.14, 0.05, 0.4, 16]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#bef264" emissive="#7dd3fc" emissiveIntensity={0.6} />
        </Cylinder>
        <mesh position={[0, 0.25, 0]}>
          <sphereGeometry args={[0.12, 24, 24]} />
          <meshStandardMaterial color="#0ea5e9" emissive="#22d3ee" emissiveIntensity={0.8} />
        </mesh>
      </group>
    </group>
  );
}
