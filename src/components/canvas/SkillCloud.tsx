'use client';

import { useMemo, useState } from 'react';
import { Html, OrbitControls } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { Physics, RigidBody } from '@react-three/rapier';
import { useSpring, a } from '@react-spring/three';
import { Color, Vector3 } from 'three';
import { useUIStore } from '@/store/ui';

interface SkillCloudProps {
  skills: string[];
}

function SkillBody({ label, index }: { label: string; index: number }) {
  const [active, setActive] = useState(false);
  const pointer = useUIStore((s) => s.pointer);
  const { scale, wire } = useSpring({
    scale: active ? 1.3 : 1,
    wire: active ? 1 : 0,
    config: { tension: 120, friction: 14 }
  });

  const color = useMemo(() => new Color(`hsl(${(index * 40) % 360},80%,70%)`), [index]);
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const lookTarget = new Vector3(pointer.x * 2.5, 1.4 + pointer.y, 0);
    state.camera.position.lerp(new Vector3(Math.sin(t * 0.2) * 2 + pointer.x * 1.2, 2.4 + pointer.y, 6), 0.04);
    state.camera.lookAt(lookTarget);
  });

  return (
    <RigidBody
      restitution={0.7}
      friction={0.2}
      colliders="ball"
      position={[(Math.random() - 0.5) * 3, Math.random() * 2 + 1.5, (Math.random() - 0.5) * 3]}
      onCollisionEnter={() => setActive(true)}
      onCollisionExit={() => setActive(false)}
    >
      <a.mesh scale={scale} onClick={() => setActive((v) => !v)}>
        <icosahedronGeometry args={[0.45, 0]} />
        <a.meshStandardMaterial color={color} wireframe={wire.to((v) => v > 0.5)} />
        <Html
          position={[-0.9, 0, 0.6]}
          transform
          occlude
          className="select-none text-xs font-semibold tracking-wide text-slate-100 drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]"
        >
          {label}
        </Html>
      </a.mesh>
    </RigidBody>
  );
}

export function SkillCloud({ skills }: SkillCloudProps) {
  return (
    <div className="h-[520px] overflow-hidden rounded-2xl border border-white/10">
      <Canvas camera={{ position: [0, 2.5, 6], fov: 40 }} dpr={[1, 1.2]}>
        <color attach="background" args={[0.03, 0.06, 0.12]} />
        <ambientLight intensity={0.6} />
        <directionalLight intensity={1.1} position={[4, 6, 3]} />
        <Physics gravity={[0, -2, 0]} timeStep="vary">
          {skills.map((skill, idx) => (
            <SkillBody key={skill} label={skill} index={idx} />
          ))}
        </Physics>
        <OrbitControls enablePan={false} minDistance={4} maxDistance={8} autoRotate autoRotateSpeed={0.4} />
      </Canvas>
    </div>
  );
}
