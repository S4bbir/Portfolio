"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { CoreObject } from "./CoreObject";
import { ParticleField } from "./ParticleField";
import { ProjectGallery3D } from "./ProjectGallery3D";
import { CameraController } from "@/components/three/CameraController";
import { Lighting } from "@/components/three/Lighting";
import { useDeviceType } from "@/lib/hooks/useIsMobile";

function SceneContent() {
  const device = useDeviceType();
  const particleCount = device === "mobile" ? 400 : device === "tablet" ? 800 : 1800;

  return (
    <>
      <fog attach="fog" args={["#050508", 8, 22]} />
      <Lighting />
      <Environment preset="night" />
      <CameraController mobile={device === "mobile"} />
      <CoreObject />
      <ParticleField count={particleCount} />
      <ProjectGallery3D />
    </>
  );
}

export function HeroScene() {
  const device = useDeviceType();

  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, device === "mobile" ? 7 : 5], fov: 50 }}
        dpr={Math.min(typeof window !== "undefined" ? window.devicePixelRatio : 1, 1.5)}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  );
}
