"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { CredentialCard } from "./credential-card";

function LoadingSkeleton() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-[280px] h-[178px] rounded-2xl bg-background-alt animate-pulse" />
    </div>
  );
}

export function CardScene() {
  return (
    <div className="relative w-full h-full">
      <LoadingSkeleton />
      <Canvas
        camera={{ position: [0, 0, 5], fov: 35 }}
        style={{ width: "100%", height: "100%", position: "relative", zIndex: 1 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          <CredentialCard />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}
