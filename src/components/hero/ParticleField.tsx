"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import type { Points } from "three";
import { useScrollContext } from "@/lib/context/ScrollContext";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

interface ParticleFieldProps {
  count?: number;
}

export function ParticleField({ count = 1500 }: ParticleFieldProps) {
  const pointsRef = useRef<Points>(null);
  const { mouseX, mouseY } = useScrollContext();
  const reducedMotion = useReducedMotion();

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const radius = 3 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i3 + 2] = radius * Math.cos(phi);

      const mix = Math.random();
      col[i3] = 0.3 + mix * 0.2;
      col[i3 + 1] = 0.35 + mix * 0.15;
      col[i3 + 2] = 0.9 + mix * 0.1;
    }

    return [pos, col];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current || reducedMotion) return;
    const t = state.clock.elapsedTime;
    pointsRef.current.rotation.y = t * 0.02 + mouseX.current * 0.05;
    pointsRef.current.rotation.x = mouseY.current * 0.03;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
