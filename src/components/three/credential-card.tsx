"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox, Text, Float } from "@react-three/drei";
import * as THREE from "three";

export function CredentialCard() {
  const groupRef = useRef<THREE.Group>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useFrame(({ pointer }) => {
    if (!groupRef.current) return;
    mouseRef.current.x += (pointer.x * 0.3 - mouseRef.current.x) * 0.05;
    mouseRef.current.y += (pointer.y * 0.2 - mouseRef.current.y) * 0.05;
    groupRef.current.rotation.y =
      mouseRef.current.x + Math.sin(Date.now() * 0.0005) * 0.1;
    groupRef.current.rotation.x =
      -mouseRef.current.y + Math.cos(Date.now() * 0.0005) * 0.05;
  });

  return (
    <Float rotationIntensity={0.2} floatIntensity={0.5} speed={2}>
      <group ref={groupRef}>
        {/* Card body */}
        <RoundedBox args={[3.4, 2.16, 0.04]} radius={0.08} smoothness={4}>
          <meshPhysicalMaterial
            color="#ffffff"
            roughness={0.15}
            metalness={0.05}
            clearcoat={1}
            clearcoatRoughness={0.1}
            side={THREE.DoubleSide}
          />
        </RoundedBox>

        {/* Blue accent strip at top */}
        <mesh position={[0, 0.88, 0.025]}>
          <planeGeometry args={[3.2, 0.35]} />
          <meshStandardMaterial color="#2563EB" />
        </mesh>

        {/* "Verifiable ID" title */}
        <Text
          position={[-1.2, 0.88, 0.03]}
          fontSize={0.12}
          color="#ffffff"
          font="/fonts/Inter-Bold.woff2"
          anchorX="left"
        >
          VERIFIABLE ID
        </Text>

        {/* EU label */}
        <Text
          position={[1.4, 0.88, 0.03]}
          fontSize={0.14}
          color="#ffffff"
          font="/fonts/Inter-Bold.woff2"
        >
          EU
        </Text>

        {/* Given Name label */}
        <Text
          position={[-1.2, 0.35, 0.025]}
          fontSize={0.08}
          color="#6B7280"
          anchorX="left"
          font="/fonts/Inter-Regular.woff2"
        >
          Given Name
        </Text>
        <Text
          position={[-1.2, 0.18, 0.025]}
          fontSize={0.13}
          color="#0A0A0A"
          anchorX="left"
          font="/fonts/Inter-Bold.woff2"
        >
          Marie
        </Text>

        {/* Family Name label */}
        <Text
          position={[-1.2, -0.05, 0.025]}
          fontSize={0.08}
          color="#6B7280"
          anchorX="left"
          font="/fonts/Inter-Regular.woff2"
        >
          Family Name
        </Text>
        <Text
          position={[-1.2, -0.22, 0.025]}
          fontSize={0.13}
          color="#0A0A0A"
          anchorX="left"
          font="/fonts/Inter-Bold.woff2"
        >
          Dupont
        </Text>

        {/* Issuer label */}
        <Text
          position={[-1.2, -0.5, 0.025]}
          fontSize={0.08}
          color="#6B7280"
          anchorX="left"
          font="/fonts/Inter-Regular.woff2"
        >
          Issuer
        </Text>
        <Text
          position={[-1.2, -0.67, 0.025]}
          fontSize={0.11}
          color="#2563EB"
          anchorX="left"
          font="/fonts/Inter-Regular.woff2"
        >
          French Republic
        </Text>

        {/* Format label */}
        <Text
          position={[0.6, -0.5, 0.025]}
          fontSize={0.08}
          color="#6B7280"
          anchorX="left"
          font="/fonts/Inter-Regular.woff2"
        >
          Format
        </Text>
        <Text
          position={[0.6, -0.67, 0.025]}
          fontSize={0.11}
          color="#0A0A0A"
          anchorX="left"
          font="/fonts/Inter-Bold.woff2"
        >
          SD-JWT VC
        </Text>
      </group>
    </Float>
  );
}
