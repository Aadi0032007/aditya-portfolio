'use client';

import { useMemo, useRef } from 'react';
import { Points, shaderMaterial } from '@react-three/drei';
import { useFrame, extend } from '@react-three/fiber';
import { Color, Vector3 } from 'three';
import { useUIStore } from '@/store/ui';

const TensorMaterial = shaderMaterial(
  { uTime: 0, uMouse: new Vector3(), uStrength: 1.2, uColorA: new Color('#7dd3fc'), uColorB: new Color('#a855f7') },
  /* glsl */ `
  varying vec3 vPosition;
  varying float vDist;
  uniform vec3 uMouse;
  uniform float uStrength;
  void main() {
    vPosition = position;
    vDist = length(uMouse - position);
    vec3 displaced = position + normalize(position + uMouse) * 0.1 * smoothstep(uStrength, 0.0, vDist);
    vec4 mvPosition = modelViewMatrix * vec4(displaced, 1.0);
    gl_PointSize = 2.0 + 12.0 * smoothstep(uStrength, 0.0, vDist);
    gl_Position = projectionMatrix * mvPosition;
  }
`,
  /* glsl */ `
  precision highp float;
  varying float vDist;
  uniform float uTime;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  void main() {
    float flicker = sin(uTime * 0.9 + vDist * 2.5) * 0.5 + 0.5;
    float alpha = smoothstep(0.0, 1.0, 1.0 - vDist);
    vec3 color = mix(uColorA, uColorB, flicker);
    gl_FragColor = vec4(color, alpha);
  }
`
);
extend({ TensorMaterial });

type TensorMaterialImpl = typeof TensorMaterial & JSX.IntrinsicElements['shaderMaterial'];

export function TensorField() {
  const materialRef = useRef<TensorMaterialImpl>(null);
  const mouse = useUIStore((s) => s.pointer);

  const positions = useMemo(() => {
    const pts = new Float32Array(2400 * 3);
    for (let i = 0; i < pts.length; i += 3) {
      pts[i] = (Math.random() - 0.5) * 6;
      pts[i + 1] = (Math.random() - 0.5) * 6;
      pts[i + 2] = (Math.random() - 0.5) * 6;
    }
    return pts;
  }, []);

  const mouseVec = useRef(new Vector3());

  useFrame(({ clock }) => {
    if (!materialRef.current) return;
    materialRef.current.uTime = clock.getElapsedTime();
    mouseVec.current.lerp(new Vector3(mouse.x * 2.5, mouse.y * 2.5, 0), 0.08);
    materialRef.current.uMouse = mouseVec.current;
  });

  return (
    <Points positions={positions} stride={3} frustumCulled={false}>
      {/* @ts-expect-error */}
      <tensorMaterial ref={materialRef} transparent depthWrite={false} />
    </Points>
  );
}
