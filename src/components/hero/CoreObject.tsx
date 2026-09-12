"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import type { Group } from "three";
import { useScrollContext } from "@/lib/context/ScrollContext";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

export function CoreObject() {
  const groupRef = useRef<Group>(null);
  const { mouseX, mouseY, heroProgress } = useScrollContext();
  const reducedMotion = useReducedMotion();

  useFrame((state) => {
    if (!groupRef.current || reducedMotion) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.y = t * 0.15 + mouseX.current * 0.3;
    groupRef.current.rotation.x = Math.sin(t * 0.1) * 0.1 + mouseY.current * 0.15;
    groupRef.current.position.y = Math.sin(t * 0.5) * 0.1 - heroProgress.current * 0.5;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={groupRef}>
        <mesh>
          <icosahedronGeometry args={[0.8, 1]} />
          <meshPhysicalMaterial
            color="#101016"
            metalness={0.9}
            roughness={0.15}
            emissive="#4D7CFF"
            emissiveIntensity={0.15}
            transparent
            opacity={0.95}
          />
        </mesh>

        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.2, 0.02, 16, 64]} />
          <meshStandardMaterial
            color="#8B5CF6"
            emissive="#8B5CF6"
            emissiveIntensity={0.5}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>

        <mesh rotation={[0, Math.PI / 4, Math.PI / 3]}>
          <torusGeometry args={[0.95, 0.015, 12, 48]} />
          <meshStandardMaterial
            color="#4D7CFF"
            emissive="#4D7CFF"
            emissiveIntensity={0.4}
            metalness={0.7}
            roughness={0.25}
          />
        </mesh>

        <mesh>
          <sphereGeometry args={[0.25, 32, 32]} />
          <meshPhysicalMaterial
            color="#5B8CFF"
            emissive="#5B8CFF"
            emissiveIntensity={0.8}
            metalness={0.5}
            roughness={0.1}
            transparent
            opacity={0.9}
          />
        </mesh>
      </group>
    </Float>
  );
}
