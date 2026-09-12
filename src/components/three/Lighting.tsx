"use client";

export function Lighting() {
  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[4, 3, 4]} intensity={1.2} color="#4D7CFF" distance={20} />
      <pointLight position={[-4, -2, 3]} intensity={0.8} color="#8B5CF6" distance={18} />
      <pointLight position={[0, -4, -2]} intensity={0.4} color="#5B8CFF" distance={15} />
      <spotLight
        position={[0, 8, 0]}
        angle={0.4}
        penumbra={1}
        intensity={0.3}
        color="#F5F5F5"
      />
    </>
  );
}
