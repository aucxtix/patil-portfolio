import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom, DepthOfField } from '@react-three/postprocessing';
import * as THREE from 'three';

const CITY_SIZE = 200;
const BUILDING_COUNT = 500;
const PACKET_COUNT = 300;
const TRACE_COUNT = 150;

function useDarkMode() {
  const [isDark, setIsDark] = useState(true);
  useEffect(() => {
    const checkTheme = () => setIsDark(document.documentElement.getAttribute('data-theme') !== 'light');
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    checkTheme();
    return () => observer.disconnect();
  }, []);
  return isDark;
}

function Buildings({ isDark, mousePos, clickPulse }: { isDark: boolean, mousePos: React.MutableRefObject<THREE.Vector3>, clickPulse: React.MutableRefObject<number> }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const color = useMemo(() => new THREE.Color(), []);
  
  const buildings = useMemo(() => {
    return Array.from({ length: BUILDING_COUNT }).map(() => {
      const x = (Math.random() - 0.5) * CITY_SIZE;
      const z = (Math.random() - 0.5) * CITY_SIZE;
      const distFromCenter = Math.sqrt(x*x + z*z);
      const isCenter = distFromCenter < 30;
      
      const h = isCenter ? Math.random() * 20 + 10 : Math.random() * 8 + 1;
      const w = Math.random() * 2 + 1;
      const d = Math.random() * 2 + 1;
      
      // Select highlight color: cyan, electric blue, or violet
      const highlightOptions = [0x00ffff, 0x0066ff, 0x8a2be2];
      const highlightHex = highlightOptions[Math.floor(Math.random() * highlightOptions.length)];
      
      return { x, z, h, w, d, highlightHex, baseColor: Math.random() };
    });
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const time = clock.elapsedTime;
    
    buildings.forEach((b, i) => {
      let z = b.z + time * 3;
      z = ((z + CITY_SIZE/2) % CITY_SIZE) - CITY_SIZE/2;

      const distToMouse = Math.sqrt((b.x - mousePos.current.x)**2 + (z - mousePos.current.z)**2);
      const hoverScale = distToMouse < 15 ? 1 + (15 - distToMouse)*0.02 : 1;
      
      const pulseEffect = clickPulse.current > 0 ? Math.max(0, 1 - Math.abs(distToMouse - (20 - clickPulse.current*20))/5) : 0;
      
      dummy.position.set(b.x, (b.h * hoverScale) / 2, z);
      dummy.scale.set(b.w, b.h * hoverScale, b.d);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
      
      const baseHex = isDark ? 0x0a0c10 : 0xe0e5ec;
      const highlightHex = isDark ? b.highlightHex : 0x0066ff;
      
      color.setHex(baseHex);
      if (distToMouse < 15) {
        color.lerp(new THREE.Color(highlightHex), (15 - distToMouse)/30);
      }
      if (pulseEffect > 0) {
        color.lerp(new THREE.Color(highlightHex), pulseEffect * 0.5);
      }
      
      const breathing = Math.sin(time * 2 + b.baseColor * Math.PI * 2) * 0.1 + 0.9;
      color.multiplyScalar(breathing);
      
      meshRef.current!.setColorAt(i, color);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  });

  const matColor = isDark ? "#11141a" : "#f0f4f8";

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, BUILDING_COUNT]}>
      <boxGeometry />
      <meshStandardMaterial color={matColor} roughness={0.6} metalness={0.8} />
    </instancedMesh>
  );
}

function Packets({ isDark }: { isDark: boolean }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const packets = useMemo(() => {
    return Array.from({ length: PACKET_COUNT }).map(() => ({
      x: (Math.random() - 0.5) * CITY_SIZE,
      z: (Math.random() - 0.5) * CITY_SIZE,
      speed: Math.random() * 20 + 10,
      dir: Math.random() > 0.5 ? 1 : -1,
      isVertical: Math.random() > 0.5
    }));
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const time = clock.elapsedTime;
    
    packets.forEach((p, i) => {
      let x = p.x;
      let z = p.z;
      
      if (p.isVertical) {
        z += time * p.speed * p.dir;
        z = ((z + CITY_SIZE/2) % CITY_SIZE) - CITY_SIZE/2;
      } else {
        x += time * p.speed * p.dir;
        x = ((x + CITY_SIZE/2) % CITY_SIZE) - CITY_SIZE/2;
        z += time * 3; // follow city speed
        z = ((z + CITY_SIZE/2) % CITY_SIZE) - CITY_SIZE/2;
      }
      
      dummy.position.set(x, 0.2, z);
      dummy.scale.setScalar(isDark ? 0.3 : 0.4);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  const packetColor = isDark ? new THREE.Color(0x00ffff).multiplyScalar(2) : new THREE.Color(0x0055ff);

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, PACKET_COUNT]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color={packetColor} />
    </instancedMesh>
  );
}

function Traces({ isDark }: { isDark: boolean }) {
  const linesRef = useRef<THREE.LineSegments>(null);
  
  useMemo(() => {
    // We can just create a static grid for traces and move them in useFrame
  }, []);
  
  return null; // A bit complex to animate lines, let's use a grid helper instead
}

function Ground({ isDark }: { isDark: boolean }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <planeGeometry args={[CITY_SIZE, CITY_SIZE]} />
      <meshStandardMaterial 
        color={isDark ? "#05070B" : "#e2e8f0"} 
        roughness={0.2} 
        metalness={0.8}
      />
      <gridHelper args={[CITY_SIZE, 100, isDark ? 0x00ffff : 0x0055ff, isDark ? 0x112233 : 0xcbd5e1]} rotation={[Math.PI/2, 0, 0]} position={[0, 0, 0.01]} />
    </mesh>
  );
}

function MovingGrid({ isDark }: { isDark: boolean }) {
  const gridRef = useRef<THREE.GridHelper>(null);
  useFrame(({ clock }) => {
    if (gridRef.current) {
      gridRef.current.position.z = (clock.elapsedTime * 3) % (CITY_SIZE / 100);
    }
  });
  return (
    <gridHelper 
      ref={gridRef}
      args={[CITY_SIZE, 100, isDark ? 0x00ffff : 0x0055ff, isDark ? 0x1a293a : 0xcbd5e1]} 
      position={[0, 0.01, 0]} 
    />
  );
}


function Scene() {
  const isDark = useDarkMode();
  const mousePos = useRef(new THREE.Vector3());
  const clickPulse = useRef(0);
  const { camera, raycaster, pointer, scene } = useThree();

  useFrame(({ clock }) => {
    // Update mouse position on ground plane
    raycaster.setFromCamera(pointer, camera);
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    raycaster.ray.intersectPlane(plane, mousePos.current);
    
    if (clickPulse.current > 0) {
      clickPulse.current -= 0.02; // fade out
    }
    
    // Slight camera sway
    camera.position.x = Math.sin(clock.elapsedTime * 0.2) * 5;
    camera.lookAt(0, 5, -20);
  });

  useEffect(() => {
    const handleClick = () => { clickPulse.current = 1; };
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <>
      <color attach="background" args={[isDark ? '#05070B' : '#ffffff']} />
      <fog attach="fog" args={[isDark ? '#05070B' : '#ffffff', 20, 90]} />
      
      <ambientLight intensity={isDark ? 0.2 : 0.8} />
      <directionalLight position={[10, 20, 10]} intensity={isDark ? 1 : 1.5} color={isDark ? '#a0a0ff' : '#ffffff'} />
      <pointLight position={[0, 10, 0]} intensity={isDark ? 5 : 2} color={isDark ? '#00ffff' : '#0066ff'} distance={50} />

      <Ground isDark={isDark} />
      <MovingGrid isDark={isDark} />
      <Buildings isDark={isDark} mousePos={mousePos} clickPulse={clickPulse} />
      <Packets isDark={isDark} />

      <EffectComposer>
        {isDark && <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1.5} />}
        {!isDark && <Bloom luminanceThreshold={0.8} mipmapBlur intensity={0.5} />}
        <DepthOfField target={[0, 5, -20]} focalLength={0.05} bokehScale={2} height={480} />
      </EffectComposer>
    </>
  );
}

export function LivingCircuitCity() {
  return (
    <div className="fixed inset-0 w-full h-full -z-20 pointer-events-none">
      <Canvas camera={{ position: [0, 8, 20], fov: 60 }}>
        <Scene />
      </Canvas>
    </div>
  );
}
