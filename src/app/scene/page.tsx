'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Html } from '@react-three/drei'
import { Suspense, useState } from 'react'
import { TableModel } from '@/components/TableModel'

function Box() {
  // Fallback geometry if OBJ loading fails
  return (
    <mesh position={[0, 0.5, 0]}>
      <boxGeometry args={[2, 0.1, 1]} />
      <meshStandardMaterial color="#8B7355" />
      {/* Table legs */}
      <mesh position={[-0.9, -0.5, -0.4]}>
        <boxGeometry args={[0.1, 1, 0.1]} />
        <meshStandardMaterial color="#8B7355" />
      </mesh>
      <mesh position={[0.9, -0.5, -0.4]}>
        <boxGeometry args={[0.1, 1, 0.1]} />
        <meshStandardMaterial color="#8B7355" />
      </mesh>
      <mesh position={[-0.9, -0.5, 0.4]}>
        <boxGeometry args={[0.1, 1, 0.1]} />
        <meshStandardMaterial color="#8B7355" />
      </mesh>
      <mesh position={[0.9, -0.5, 0.4]}>
        <boxGeometry args={[0.1, 1, 0.1]} />
        <meshStandardMaterial color="#8B7355" />
      </mesh>
    </mesh>
  )
}

function LoadingFallback() {
  return (
    <Html center>
      <div className="text-gray-600">Loading table model...</div>
    </Html>
  )
}

export default function ScenePage() {
  const [useObjModel, setUseObjModel] = useState(true)
  const [selectedTable, setSelectedTable] = useState('table-1')

  return (
    <div className="w-full h-screen relative">
      <div className="absolute top-4 left-4 z-10 bg-white p-4 rounded shadow-lg">
        <h3 className="font-semibold mb-2">Table Options</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={useObjModel}
              onChange={(e) => setUseObjModel(e.target.checked)}
            />
            Use OBJ Model
          </label>
          {useObjModel && (
            <select
              value={selectedTable}
              onChange={(e) => setSelectedTable(e.target.value)}
              className="block w-full px-2 py-1 border rounded"
            >
              <option value="table-1">Round Dining Table</option>
              <option value="table-2">Coffee Table</option>
            </select>
          )}
        </div>
      </div>
      
      <Canvas camera={{ position: [3, 2, 5], fov: 50 }}>
        <Suspense fallback={<LoadingFallback />}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          
          {useObjModel ? (
            <TableModel 
              modelPath={`/models/${selectedTable}.obj`}
              scale={selectedTable === 'table-1' ? 0.75 : 0.4}
              position={[0, 0, 0]}
            />
          ) : (
            <Box />
          )}
          
          <OrbitControls />
          <Environment preset="apartment" />
          <gridHelper args={[10, 10]} />
        </Suspense>
      </Canvas>
    </div>
  )
}