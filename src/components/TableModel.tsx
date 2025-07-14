'use client'

import { useLoader } from '@react-three/fiber'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface TableModelProps {
  modelPath: string
  scale?: number
  position?: [number, number, number]
}

export function TableModel({ modelPath, scale = 0.75, position = [0, 0, 0] }: TableModelProps) {
  const obj = useLoader(OBJLoader, modelPath)
  const meshRef = useRef<THREE.Group>(null)

  useEffect(() => {
    if (obj) {
      // Center the model
      const box = new THREE.Box3().setFromObject(obj)
      const center = box.getCenter(new THREE.Vector3())
      obj.position.sub(center)
      
      // Apply basic material if none exists
      obj.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          if (!child.material) {
            child.material = new THREE.MeshStandardMaterial({
              color: '#8B7355',
              roughness: 0.7,
              metalness: 0.1
            })
          }
        }
      })
    }
  }, [obj])

  return <primitive ref={meshRef} object={obj} scale={scale} position={position} />
}