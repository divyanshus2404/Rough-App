'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Environment, ContactShadows } from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

function FloatingShapes() {
  const mesh1 = useRef<THREE.Mesh>(null)
  const mesh2 = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (mesh1.current) {
      mesh1.current.rotation.x = Math.sin(t / 4)
      mesh1.current.rotation.y = Math.sin(t / 2)
    }
    if (mesh2.current) {
      mesh2.current.rotation.x = Math.cos(t / 3)
      mesh2.current.rotation.y = Math.sin(t / 3)
    }
  })

  return (
    <>
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <mesh ref={mesh1} position={[-2, 1, 0]} castShadow>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#4f46e5" roughness={0.1} metalness={0.8} />
        </mesh>
      </Float>

      <Float speed={1.5} rotationIntensity={1.5} floatIntensity={1.5}>
        <mesh ref={mesh2} position={[2, -1, -1]} castShadow>
          <torusGeometry args={[0.8, 0.3, 16, 32]} />
          <meshStandardMaterial color="#6366f1" roughness={0.2} metalness={0.5} wireframe={true} />
        </mesh>
      </Float>

      <Environment preset="city" />
      <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={10} blur={2} far={4} />
      
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} castShadow />
    </>
  )
}

export default function FloatingObjectsScene() {
  return (
    <div className="absolute inset-0 -z-10 w-full h-full opacity-60">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <FloatingShapes />
      </Canvas>
    </div>
  )
}
