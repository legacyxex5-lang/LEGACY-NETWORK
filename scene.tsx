'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Sparkles } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function Core() {
  const group = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.11;
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.18) * 0.08;
  });
  return <group ref={group}>
    <mesh><icosahedronGeometry args={[1.16, 2]} /><meshStandardMaterial color="#171d19" metalness={0.88} roughness={0.24} wireframe /></mesh>
    <mesh rotation={[0.4, 0.2, 0.1]}><torusGeometry args={[1.65, 0.012, 12, 180]} /><meshBasicMaterial color="#baff70" /></mesh>
    <mesh rotation={[1.1, 0.7, 0.3]}><torusGeometry args={[1.95, 0.006, 8, 180]} /><meshBasicMaterial color="#8b9b87" transparent opacity={0.65} /></mesh>
    <mesh><sphereGeometry args={[0.63, 48, 48]} /><meshPhysicalMaterial color="#a8c18e" metalness={0.72} roughness={0.18} transmission={0.08} transparent opacity={0.9} /></mesh>
    {Array.from({ length: 8 }).map((_, i) => <mesh key={i} position={[Math.cos(i * Math.PI / 4) * 2.25, Math.sin(i * Math.PI / 4) * 0.8, Math.sin(i * Math.PI / 4) * 1.3]}><sphereGeometry args={[0.035, 16, 16]} /><meshBasicMaterial color="#c2ff85" /></mesh>)}
  </group>;
}
function SceneContent() {
  return <>
    <ambientLight intensity={0.5} />
    <pointLight position={[4, 4, 5]} intensity={34} color="#c9ff9a" />
    <pointLight position={[-4, -2, -3]} intensity={18} color="#627c70" />
    <Stars radius={80} depth={45} count={1800} factor={2.1} saturation={0} fade speed={0.35} />
    <Sparkles count={90} scale={10} size={1.5} speed={0.18} color="#baff70" />
    <Float speed={1.1} rotationIntensity={0.16} floatIntensity={0.34}><Core /></Float>
  </>;
}
export default function Scene() {
  return <div className="scene" aria-label="Animated abstract 3D sculpture">
    <Canvas camera={{ position: [0, 0, 7.5], fov: 42 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}>
      <SceneContent />
    </Canvas>
  </div>;
}
