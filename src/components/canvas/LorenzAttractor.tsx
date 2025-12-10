'use client';

import { useMemo, useRef } from 'react';
import { Line } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Color, Vector3 } from 'three';
import { useUIStore } from '@/store/ui';

export function LorenzAttractor() {
  const lineRef = useRef<any>(null);
  const points = useMemo(() => {
    const sigma = 10;
    const rho = 28;
    const beta = 8 / 3;
    const dt = 0.005;
    let x = 0.1;
    let y = 0;
    let z = 0;
    const pts: Vector3[] = [];
    for (let i = 0; i < 4000; i++) {
      const dx = sigma * (y - x) * dt;
      const dy = (x * (rho - z) - y) * dt;
      const dz = (x * y - beta * z) * dt;
      x += dx;
      y += dy;
      z += dz;
      pts.push(new Vector3(x * 0.08, y * 0.08, z * 0.08));
    }
    return pts;
  }, []);

  const pointer = useUIStore((s) => s.pointer);

  useFrame(({ clock }) => {
    if (!lineRef.current) return;
    const t = clock.getElapsedTime();
    lineRef.current.rotation.y = t * 0.12 + pointer.x * 0.6;
    lineRef.current.rotation.x = Math.sin(t * 0.3) * 0.15 + pointer.y * 0.4;
    const glow = 0.6 + Math.abs(pointer.x * 0.4) + Math.abs(pointer.y * 0.3);
    if (lineRef.current.material) {
      lineRef.current.material.color = new Color('#7dd3fc').lerp(new Color('#a855f7'), glow * 0.25);
      lineRef.current.material.opacity = Math.min(0.95, 0.6 + glow * 0.25);
    }
  });

  return (
    <group position={[0, 0, -2]}>
      <Line ref={lineRef} points={points} color="#7dd3fc" lineWidth={1.2} dashed={false} transparent opacity={0.8} />
    </group>
  );
}
