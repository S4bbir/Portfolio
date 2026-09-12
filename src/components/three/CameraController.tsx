"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useScrollContext } from "@/lib/context/ScrollContext";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

interface CameraControllerProps {
  mobile?: boolean;
}

export function CameraController({ mobile }: CameraControllerProps) {
  const { camera } = useThree();
  const { heroProgress, mouseX, mouseY } = useScrollContext();
  const reducedMotion = useReducedMotion();

  useFrame(() => {
    if (reducedMotion) return;

    const scroll = heroProgress.current;
    const mx = mouseX.current * 0.3;
    const my = mouseY.current * 0.2;

    const baseZ = mobile ? 6 : 5;
    const targetZ = baseZ + scroll * 3;
    const targetX = mx * 0.5;
    const targetY = my * 0.3 + scroll * 0.5;

    camera.position.x += (targetX - camera.position.x) * 0.05;
    camera.position.y += (targetY - camera.position.y) * 0.05;
    camera.position.z += (targetZ - camera.position.z) * 0.05;
    camera.lookAt(0, 0, 0);
  });

  return null;
}
