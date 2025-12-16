'use client';

import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Mesh, PlaneGeometry, ShaderMaterial } from 'three';
import { useUIStore } from '@/store/ui';

export function CyberGrid() {
  const meshRef = useRef<Mesh>(null);
  const materialRef = useRef<ShaderMaterial>(null);

  useFrame((state) => {
    if (materialRef.current) {
      // Animate grid movement
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
      // Scroll influence
      materialRef.current.uniforms.uScroll.value = window.scrollY;
    }
  });

  const theme = useUIStore((s) => s.theme);
  const isDark = theme === 'dark';

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float uTime;
    uniform float uScroll;
    uniform vec3 uColor;
    varying vec2 vUv;

    void main() {
      // Moving grid logic (Slower default)
      float speed = 1.0 + (abs(uScroll) * 0.005); 
      float gridY = mod(vUv.y * 20.0 - uTime * 0.3 - (uScroll * 0.02), 1.0); // 0.3 was 0.5
      float gridX = mod(vUv.x * 20.0, 1.0);
      
      // Warp effect on scroll
      float warp = sin(vUv.y * 10.0 + uTime) * (uScroll * 0.0005);
      gridX += warp;
      
      float lineY = step(0.98, gridY); // Horizontal lines
      float lineX = step(0.98, gridX); // Vertical lines
      
      float opacity = (lineX + lineY) * 0.3;
      
      // Fade out into distance
      float dist = distance(vUv, vec2(0.5, 0.5));
      opacity *= (1.0 - smoothstep(0.0, 0.6, vUv.y)); // Fade at top (horizon)
      
      gl_FragColor = vec4(uColor, opacity);
    }
  `;

  return (
    <mesh ref={meshRef} position={[0, -5, -10]} rotation={[-Math.PI / 2.5, 0, 0]} scale={[50, 50, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={materialRef}
        transparent
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uScroll: { value: 0 },
          uColor: { value: isDark ? [0.5, 0.2, 0.8] : [0.2, 0.4, 0.9] } // Purple/Blue
        }}
      />
    </mesh>
  );
}
