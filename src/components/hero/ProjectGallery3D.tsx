"use client";

import { useRef, useState, useMemo } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import type { Group, Mesh } from "three";
import { projects } from "@/config/projects";
import { useScrollContext } from "@/lib/context/ScrollContext";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";
import { useDeviceType } from "@/lib/hooks/useIsMobile";

interface ProjectPanelProps {
  project: (typeof projects)[0];
  index: number;
  total: number;
  onHover: (slug: string | null) => void;
  hoveredSlug: string | null;
}

function ProjectPanel({ project, index, total, onHover, hoveredSlug }: ProjectPanelProps) {
  const meshRef = useRef<Mesh>(null);
  const { mouseX, mouseY, heroProgress } = useScrollContext();
  const reducedMotion = useReducedMotion();

  const texture = useLoader(TextureLoader, project.image);

  const { position, rotation } = useMemo(() => {
    const angle = (index / total) * Math.PI * 1.4 - Math.PI * 0.7;
    const radius = 3.2;
    return {
      position: [
        Math.sin(angle) * radius,
        (index - total / 2) * 0.3,
        Math.cos(angle) * radius - 1,
      ] as [number, number, number],
      rotation: [-0.1, angle + Math.PI, 0] as [number, number, number],
    };
  }, [index, total]);

  const isHovered = hoveredSlug === project.slug;
  const isDimmed = hoveredSlug !== null && !isHovered;

  useFrame(() => {
    if (!meshRef.current || reducedMotion) return;

    const targetScale = isHovered ? 1.15 : isDimmed ? 0.9 : 1;
    const targetZ = isHovered ? 0.5 : 0;

    meshRef.current.scale.x += (targetScale - meshRef.current.scale.x) * 0.08;
    meshRef.current.scale.y += (targetScale - meshRef.current.scale.y) * 0.08;
    meshRef.current.position.z = position[2] + targetZ - heroProgress.current * 1.5;
    meshRef.current.rotation.y = rotation[1] + mouseX.current * 0.1;
    meshRef.current.rotation.x = rotation[0] + mouseY.current * 0.05;
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={rotation}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHover(project.slug);
        document.body.style.cursor = "none";
      }}
      onPointerOut={() => {
        onHover(null);
      }}
    >
      <planeGeometry args={[1.6, 1]} />
      <meshStandardMaterial
        map={texture}
        metalness={0.3}
        roughness={0.4}
        emissive={isHovered ? project.color : "#000000"}
        emissiveIntensity={isHovered ? 0.3 : 0}
        transparent
        opacity={isDimmed ? 0.5 : 1}
      />
    </mesh>
  );
}

export function ProjectGallery3D() {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const groupRef = useRef<Group>(null);
  const device = useDeviceType();
  const reducedMotion = useReducedMotion();

  const visibleProjects = useMemo(() => {
    if (device === "mobile") return projects.slice(0, 2);
    if (device === "tablet") return projects.slice(0, 3);
    return projects;
  }, [device]);

  useFrame((state) => {
    if (!groupRef.current || reducedMotion) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.03;
  });

  return (
    <group ref={groupRef}>
      {visibleProjects.map((project, i) => (
        <ProjectPanel
          key={project.slug}
          project={project}
          index={i}
          total={visibleProjects.length}
          onHover={setHoveredSlug}
          hoveredSlug={hoveredSlug}
        />
      ))}
    </group>
  );
}
