'use client';

import { useMemo, useRef, useEffect } from 'react';
import { InstancedMesh, Object3D, Vector3, Color } from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { useUIStore } from '@/store/ui';

export function TensorField() {
  const meshRef = useRef<InstancedMesh>(null);
  const dummy = useMemo(() => new Object3D(), []);
  const pointer = useUIStore((s) => s.pointer);
  const { viewport } = useThree();

  // Expanded Grid configuration
  // Ultra-Density: ~150x80 units
  const cols = 150; // Increased from 100
  const rows = 80; // Increased from 60
  const sep = 0.4; // Tighter spacing (was 0.6)

  const particles = useMemo(() => {
    const temp = [];
    for (let x = 0; x < cols; x++) {
      for (let y = 0; y < rows; y++) {
        temp.push({
          x: (x - cols / 2) * sep * 1.5, // Stretch Horizontally
          y: (y - rows / 2) * sep,
          z: 0,
          originalZ: 0
        });
      }
    }
    return temp;
  }, []);



  const theme = useUIStore((s) => s.theme);
  const isDark = theme === 'dark';

  // Metrics for color interpolation
  const baseColor = useMemo(() => new Color(isDark ? "#6366f1" : "#4f46e5"), [isDark]);
  const activeColor = useMemo(() => new Color(isDark ? "#00ffff" : "#0ea5e9"), [isDark]); // Bright Cyan for activity
  const tempColor = useMemo(() => new Color(), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();

    // Fix Mirroring: Invert Y pointer input
    // Hero.ts sends (0 = top => -1). We want Top = +Y.
    // -1 * -1 = +1.
    const mousePos = new Vector3(
      (pointer.x * viewport.width) / 2,
      -(pointer.y * viewport.height) / 2, // Inverted Y to fix mirror
      0
    );

    particles.forEach((p, i) => {
      const distance = Math.hypot(p.x - mousePos.x, p.y - mousePos.y);

      // Stronger expanding ripple based on distance and time
      const ripplePhase = (distance * 2) - (t * 5);
      const ripple = Math.sin(ripplePhase) * Math.max(0, 1 - distance / 12) * 0.5; // Scale decay

      // Interaction radius (stronger and wider)
      const effect = Math.max(0, 1 - distance / 5); // Slightly tighter radius for density pinch

      // Combine wave and interaction
      const zOffset = ripple + (effect * 1.5);

      const angle = Math.atan2(mousePos.y - p.y, mousePos.x - p.x);

      // Magnetic Pinch: Pull particles towards cursor to create density
      // We interpolate current position towards mousePos based on 'effect' strength
      const pinchStrength = 0.8; // Stronger pull for higher density
      const targetX = p.x + (mousePos.x - p.x) * effect * pinchStrength;
      const targetY = p.y + (mousePos.y - p.y) * effect * pinchStrength;

      dummy.position.set(targetX, targetY, p.z + zOffset);

      // Dynamic rotation
      dummy.rotation.z = angle + (ripple * Math.PI * 0.2);
      dummy.rotation.x = (effect * 1.2) + ripple;
      dummy.rotation.y = ripple * 0.8;

      // Scale pulse
      // Make it thicker when rippling
      const scaleMultiplier = 1 + effect * 4 + Math.abs(ripple) * 3;

      dummy.scale.set(
        1 * scaleMultiplier,
        8 * scaleMultiplier, // Slightly Shorter lines (was 10)
        1 * scaleMultiplier
      );

      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);

      // Illumination Logic
      // Lerp between baseColor and activeColor based on effect strength
      // effect is 0 to 1.
      tempColor.lerpColors(baseColor, activeColor, effect);
      meshRef.current!.setColorAt(i, tempColor);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined as any, undefined as any, particles.length]}>
      {/* Smaller/Thinner lines */}
      <boxGeometry args={[0.004, 0.004, 0.004]} />
      <meshStandardMaterial
        color={isDark ? "#6366f1" : "#4f46e5"}
        emissive={isDark ? "#818cf8" : "#4338ca"}
        emissiveIntensity={isDark ? 0.8 : 0.6}
        roughness={0.1}
        metalness={0.9}
        transparent
        opacity={0.6} // Reduced opacity for subtle background texture
      />
    </instancedMesh>
  );
}
