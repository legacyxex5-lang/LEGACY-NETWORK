'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, Stars, Text } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

function LabArchitecture() {
  const ribs = Array.from({ length: 19 }, (_, i) => i);
  const lights = Array.from({ length: 34 }, (_, i) => i);
  return (
    <group>
      <mesh position={[0, -3.1, -13]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[18, 70]} />
        <meshStandardMaterial color="#101b1b" metalness={0.72} roughness={0.42} />
      </mesh>
      <gridHelper args={[18, 54, '#5e9b91', '#24413d']} position={[0, -3.06, -13]} />
      <mesh position={[-9.1, 1, -13]}>
        <boxGeometry args={[0.28, 9, 70]} />
        <meshStandardMaterial color="#101b1a" metalness={0.8} roughness={0.35} />
      </mesh>
      <mesh position={[9.1, 1, -13]}>
        <boxGeometry args={[0.28, 9, 70]} />
        <meshStandardMaterial color="#101b1a" metalness={0.8} roughness={0.35} />
      </mesh>
      <mesh position={[0, 5.55, -13]}>
        <boxGeometry args={[18, 0.25, 70]} />
        <meshStandardMaterial color="#101716" metalness={0.75} roughness={0.4} />
      </mesh>
      {ribs.map((i) => (
        <group key={i} position={[0, 0, 8 - i * 2.65]}>
          <mesh position={[-8.8, 1.15, 0]}>
            <boxGeometry args={[0.16, 8.2, 0.18]} />
            <meshStandardMaterial color="#3c625b" metalness={0.8} roughness={0.3} />
          </mesh>
          <mesh position={[8.8, 1.15, 0]}>
            <boxGeometry args={[0.16, 8.2, 0.18]} />
            <meshStandardMaterial color="#3c625b" metalness={0.8} roughness={0.3} />
          </mesh>
          <mesh position={[0, 5.35, 0]}>
            <boxGeometry args={[17.6, 0.14, 0.18]} />
            <meshStandardMaterial color="#3c625b" metalness={0.8} roughness={0.3} />
          </mesh>
          <mesh position={[-8.68, 1.1, 0.12]}>
            <boxGeometry args={[0.035, 7.7, 0.04]} />
            <meshBasicMaterial color="#8fffe0" />
          </mesh>
          <mesh position={[8.68, 1.1, 0.12]}>
            <boxGeometry args={[0.035, 7.7, 0.04]} />
            <meshBasicMaterial color="#8fffe0" />
          </mesh>
        </group>
      ))}
      {lights.map((i) => (
        <mesh key={i} position={[(i % 2 ? -1 : 1) * 5.9, 5.36, 5 - Math.floor(i / 2) * 2.1]}>
          <boxGeometry args={[1.7, 0.025, 0.045]} />
          <meshBasicMaterial color="#a7ffe9" />
        </mesh>
      ))}
      <fog attach="fog" args={['#07100f', 11, 48]} />
    </group>
  );
}

function Reactor({ position = [0, 0, -5] as [number, number, number] }) {
  const core = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (core.current) {
      core.current.rotation.y += delta * 0.12;
      core.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.22) * 0.08;
    }
  });
  return (
    <group position={position}>
      <Float speed={0.55} rotationIntensity={0.08} floatIntensity={0.12}>
        <group ref={core}>
          <mesh>
            <icosahedronGeometry args={[1.35, 2]} />
            <meshStandardMaterial color="#152d2a" metalness={0.95} roughness={0.18} wireframe />
          </mesh>
          <mesh>
            <icosahedronGeometry args={[0.86, 3]} />
            <meshPhysicalMaterial color="#9affdf" emissive="#1a806b" emissiveIntensity={1.1} roughness={0.12} metalness={0.25} transmission={0.35} thickness={1.2} />
          </mesh>
          {[1.8, 2.25, 2.7].map((r, i) => (
            <mesh key={r} rotation={i === 0 ? [0.4, 0.2, 0] : i === 1 ? [1.2, 0.7, 0.4] : [0.2, 1.1, 1]}>
              <torusGeometry args={[r, i === 0 ? 0.025 : 0.012, 12, 180]} />
              <meshBasicMaterial color={i === 0 ? '#9bffe0' : '#4a968c'} transparent opacity={0.8} />
            </mesh>
          ))}
        </group>
      </Float>
      <pointLight color="#74ffd6" intensity={24} distance={12} />
      <mesh position={[0, -2.4, 0]}>
        <cylinderGeometry args={[2.1, 2.8, 0.22, 64]} />
        <meshStandardMaterial color="#172b28" metalness={0.9} roughness={0.25} />
      </mesh>
      <mesh position={[0, -2.27, 0]}>
        <torusGeometry args={[2.15, 0.035, 10, 90]} />
        <meshBasicMaterial color="#a1ffe5" />
      </mesh>
    </group>
  );
}

function ServiceInstallation({ position, index, label }: { position: [number, number, number]; index: number; label: string }) {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (group.current) group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2 + index) * 0.12;
  });
  return (
    <group position={position} ref={group}>
      <mesh position={[0, -0.9, 0]}>
        <cylinderGeometry args={[1.45, 1.7, 0.22, 48]} />
        <meshStandardMaterial color="#1a2927" metalness={0.85} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.05, 0]}>
        {index % 3 === 0 ? <torusGeometry args={[0.9, 0.12, 16, 72]} /> : index % 3 === 1 ? <octahedronGeometry args={[1.05, 1]} /> : <dodecahedronGeometry args={[1, 1]} />}
        <meshStandardMaterial color="#80cdb8" emissive="#1e6c5b" emissiveIntensity={0.65} metalness={0.8} roughness={0.2} wireframe={index === 1} />
      </mesh>
      <mesh position={[0, 1.42, 0]}>
        <boxGeometry args={[2.3, 0.025, 0.025]} />
        <meshBasicMaterial color="#a4ffe2" />
      </mesh>
      <Text position={[0, 1.75, 0]} fontSize={0.19} color="#d9fff2" anchorX="center" anchorY="middle" letterSpacing={0.12}>
        {label.toUpperCase()}
      </Text>
      <pointLight color="#6affd1" intensity={3.5} distance={4} />
    </group>
  );
}

function FounderHalo() {
  return (
    <group position={[0, 0, -25]}>
      <mesh position={[0, 0, -0.25]}>
        <cylinderGeometry args={[3.7, 3.7, 0.18, 64]} />
        <meshStandardMaterial color="#152522" metalness={0.8} roughness={0.25} />
      </mesh>
      <mesh position={[0, 1.3, 0]} rotation={[0, 0, 0]}>
        <torusGeometry args={[2.15, 0.035, 12, 120]} />
        <meshBasicMaterial color="#9bffe0" />
      </mesh>
      <mesh position={[0, 1.3, -0.1]}>
        <sphereGeometry args={[1.2, 48, 48]} />
        <meshPhysicalMaterial color="#274b44" metalness={0.55} roughness={0.2} transmission={0.22} transparent opacity={0.8} />
      </mesh>
      <pointLight position={[0, 2, 1]} color="#8dffdf" intensity={14} distance={9} />
    </group>
  );
}

function ExitPortal() {
  return (
    <group position={[0, 1, -34]}>
      <mesh>
        <torusGeometry args={[3.1, 0.16, 24, 120]} />
        <meshStandardMaterial color="#8dffe0" emissive="#42b89c" emissiveIntensity={1.5} metalness={0.7} roughness={0.18} />
      </mesh>
      <mesh position={[0, 0, -0.25]}>
        <circleGeometry args={[2.92, 80]} />
        <meshBasicMaterial color="#153a35" transparent opacity={0.62} side={THREE.DoubleSide} />
      </mesh>
      <pointLight color="#8dffe0" intensity={30} distance={16} />
    </group>
  );
}

function CameraJourney() {
  const target = useRef(new THREE.Vector3(0, 0.4, 8));
  const current = useRef(new THREE.Vector3(0, 0.4, 8));
  const progress = useRef(0);

  useEffect(() => {
    const update = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      progress.current = THREE.MathUtils.clamp(window.scrollY / max, 0, 1);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  useFrame(({ camera }, delta) => {
    const p = progress.current;
    const z = THREE.MathUtils.lerp(8, -31, p);
    const x = Math.sin(p * Math.PI * 2.15) * 1.15;
    const y = 0.4 + Math.sin(p * Math.PI * 3) * 0.22;
    target.current.set(x, y, z);
    current.current.lerp(target.current, 1 - Math.pow(0.001, delta));
    camera.position.copy(current.current);
    camera.lookAt(x * 0.35, 0.15, z - 8);
    camera.rotation.z = Math.sin(p * Math.PI * 2) * 0.012;
  });
  return null;
}

function SceneContent() {
  return (
    <>
      <color attach="background" args={['#07100f']} />
      <ambientLight intensity={0.55} />
      <hemisphereLight args={['#b8fff0', '#07100f', 1.1]} />
      <directionalLight position={[3, 8, 5]} intensity={2.2} color="#d6fff1" />
      <pointLight position={[-6, 2, -12]} intensity={18} color="#287c70" distance={22} />
      <pointLight position={[6, 1, -27]} intensity={15} color="#3d8f7d" distance={18} />
      <Stars radius={85} depth={55} count={1800} factor={2.2} saturation={0} fade speed={0.15} />
      <Sparkles count={150} scale={[16, 9, 52]} size={1.8} speed={0.12} color="#a5ffe4" opacity={0.6} />
      <LabArchitecture />
      <Reactor />
      <ServiceInstallation position={[-3.7, -0.2, -14]} index={0} label="Web systems" />
      <ServiceInstallation position={[3.7, -0.2, -17]} index={1} label="Automation" />
      <ServiceInstallation position={[-3.7, -0.2, -20]} index={2} label="Immersive" />
      <ServiceInstallation position={[3.7, -0.2, -22.5]} index={3} label="Infrastructure" />
      <FounderHalo />
      <ExitPortal />
      <CameraJourney />
    </>
  );
}

export default function Scene() {
  return (
    <div className="scene" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0.4, 8], fov: 54, near: 0.1, far: 100 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance', stencil: false }}
      >
        <SceneContent />
      </Canvas>
    </div>
  );
}
