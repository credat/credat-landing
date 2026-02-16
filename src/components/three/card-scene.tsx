"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { CredentialCard } from "./credential-card";

export function CardScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 35 }}
      style={{ width: "100%", height: "100%" }}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <CredentialCard />
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}
