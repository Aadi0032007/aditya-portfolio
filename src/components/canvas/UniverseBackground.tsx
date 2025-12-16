'use client';

import { Canvas } from '@react-three/fiber';
import { NeuralFlow } from './NeuralFlow';
import { CyberGrid } from './CyberGrid';
import { TensorField } from './TensorField';
import { RepellingPulsars } from './RepellingPulsars';

import { CosmologySystem } from './CosmologySystem';
import { useUIStore } from '@/store/ui';

function SceneConfig() {
  const theme = useUIStore((s) => s.theme);
  const isDark = theme === 'dark';
  // Deep, premium dark blue/black for cyber theme
  return <color attach="background" args={isDark ? [0.01, 0.015, 0.03] : [0.95, 0.97, 1]} />;
}

export function UniverseBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }} dpr={[1, 1.8]}>
        <SceneConfig />
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />

        {/* Core Elements */}
        <CyberGrid />
        <NeuralFlow />

        {/* Interactive Dots: Repel outwards */}
        <RepellingPulsars />

        {/* Re-introduced Tensors for extra density */}
        <group position={[0, 0, -5]} scale={[1.5, 1.5, 1.5]}>
          <TensorField />
        </group>

        {/* Preserved High-Fidelity System */}
        <CosmologySystem />


      </Canvas>
    </div>
  );
}
