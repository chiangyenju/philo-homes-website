'use client'

import { useEffect, useRef, useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

declare global {
  interface Window {
    THREE: any;
  }
}

export default function Design() {
  const sceneRef = useRef<HTMLDivElement>(null)
  const [currentSelection, setCurrentSelection] = useState('floor')
  const [isLoading, setIsLoading] = useState(true)
  const [activeMaterials, setActiveMaterials] = useState({
    floor: 0,
    wall: 0,
    vanity: 0,
    bathtub: 0
  })
  const designerRef = useRef<any>(null)

  useEffect(() => {
    // Load Three.js
    const script = document.createElement('script')
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js'
    script.onload = () => {
      setIsLoading(false)
      initializeDesigner()
    }
    document.head.appendChild(script)

    return () => {
      if (designerRef.current) {
        designerRef.current.cleanup?.()
      }
    }
  }, [])

  const initializeDesigner = () => {
    if (!sceneRef.current || !window.THREE) return

    class RedecorstyleBathroomDesigner {
      scene: any
      camera: any
      renderer: any
      meshes: any = {}
      materials: any
      currentSelection: string = 'floor'

      constructor(container: HTMLElement) {
        this.materials = {
          floor: [
            { 
              name: 'Carrara Marble', 
              color: 0xf8f9fa, 
              roughness: 0.05, 
              metalness: 0.0, 
              price: 1580,
              pattern: 'marble' 
            },
            { 
              name: 'Herringbone Oak', 
              color: 0x8d6e63, 
              roughness: 0.9, 
              metalness: 0.0, 
              price: 1290,
              pattern: 'wood' 
            },
            { 
              name: 'Polished Concrete', 
              color: 0x78909c, 
              roughness: 0.2, 
              metalness: 0.0, 
              price: 890,
              pattern: 'concrete' 
            },
            { 
              name: 'Nero Marquina', 
              color: 0x1c1c1c, 
              roughness: 0.05, 
              metalness: 0.1, 
              price: 2180,
              pattern: 'marble' 
            }
          ],
          wall: [
            { 
              name: 'Subway Tile', 
              color: 0xffffff, 
              roughness: 0.1, 
              metalness: 0.0, 
              price: 650,
              pattern: 'tile' 
            },
            { 
              name: 'Travertine', 
              color: 0xf5f5dc, 
              roughness: 0.7, 
              metalness: 0.0, 
              price: 1200,
              pattern: 'stone' 
            },
            { 
              name: 'Zellige Blue', 
              color: 0x2e7d9a, 
              roughness: 0.3, 
              metalness: 0.0, 
              price: 1850,
              pattern: 'tile' 
            },
            { 
              name: 'Fluted Wood', 
              color: 0x6d4c41, 
              roughness: 0.8, 
              metalness: 0.0, 
              price: 1450,
              pattern: 'wood' 
            }
          ],
          vanity: [
            { 
              name: 'Walnut Veneer', 
              color: 0x4e342e, 
              roughness: 0.7, 
              metalness: 0.0, 
              price: 1890,
              pattern: 'wood' 
            },
            { 
              name: 'White Lacquer', 
              color: 0xffffff, 
              roughness: 0.05, 
              metalness: 0.0, 
              price: 1650,
              pattern: 'solid' 
            },
            { 
              name: 'Concrete Grey', 
              color: 0x616161, 
              roughness: 0.9, 
              metalness: 0.0, 
              price: 1290,
              pattern: 'concrete' 
            }
          ],
          bathtub: [
            { 
              name: 'Matte White', 
              color: 0xf8f9fa, 
              roughness: 0.8, 
              metalness: 0.0, 
              price: 2890,
              pattern: 'solid' 
            },
            { 
              name: 'Glossy Black', 
              color: 0x212121, 
              roughness: 0.05, 
              metalness: 0.0, 
              price: 3490,
              pattern: 'solid' 
            },
            { 
              name: 'Stone Resin', 
              color: 0xe0e0e0, 
              roughness: 0.3, 
              metalness: 0.0, 
              price: 4290,
              pattern: 'stone' 
            }
          ]
        }
        
        this.init(container)
      }

      init(container: HTMLElement) {
        this.setupScene(container)
        this.createDetailedBathroom()
        this.setupRealisticLighting()
        this.animate()
      }

      setupScene(container: HTMLElement) {
        // Scene
        this.scene = new window.THREE.Scene()
        this.scene.background = new window.THREE.Color(0x2c3e50)
        
        // Camera - Redecor-style frontal view
        this.camera = new window.THREE.PerspectiveCamera(
          60,
          container.clientWidth / container.clientHeight,
          0.1,
          1000
        )
        this.camera.position.set(0, 3, 8)  // More frontal view like Redecor
        this.camera.lookAt(0, 1, 0)
        
        // Renderer
        this.renderer = new window.THREE.WebGLRenderer({ 
          antialias: true,
          alpha: true 
        })
        this.renderer.setSize(container.clientWidth, container.clientHeight)
        this.renderer.shadowMap.enabled = true
        this.renderer.shadowMap.type = window.THREE.PCFSoftShadowMap
        this.renderer.outputEncoding = window.THREE.sRGBEncoding
        this.renderer.toneMapping = window.THREE.ACESFilmicToneMapping
        this.renderer.toneMappingExposure = 1.2
        this.renderer.physicallyCorrectLights = true
        
        container.appendChild(this.renderer.domElement)
        
        // Handle resize
        const handleResize = () => {
          this.camera.aspect = container.clientWidth / container.clientHeight
          this.camera.updateProjectionMatrix()
          this.renderer.setSize(container.clientWidth, container.clientHeight)
        }
        window.addEventListener('resize', handleResize)
      }

      createDetailedBathroom() {
        // Floor
        const floorGeometry = new window.THREE.PlaneGeometry(10, 10, 10, 10)
        const floorMaterial = new window.THREE.MeshStandardMaterial({
          color: 0xf8f9fa,
          roughness: 0.05,
          metalness: 0.0
        })
        this.meshes.floor = new window.THREE.Mesh(floorGeometry, floorMaterial)
        this.meshes.floor.rotation.x = -Math.PI / 2
        this.meshes.floor.receiveShadow = true
        this.scene.add(this.meshes.floor)
        
        // Back wall
        const backWallGeometry = new window.THREE.PlaneGeometry(10, 6, 5, 5)
        const backWallMaterial = new window.THREE.MeshStandardMaterial({
          color: 0xffffff,
          roughness: 0.1,
          metalness: 0.0
        })
        this.meshes.backWall = new window.THREE.Mesh(backWallGeometry, backWallMaterial)
        this.meshes.backWall.position.set(0, 3, -5)
        this.meshes.backWall.receiveShadow = true
        this.scene.add(this.meshes.backWall)
        
        // Left wall
        const leftWallGeometry = new window.THREE.PlaneGeometry(10, 6, 5, 5)
        const leftWallMaterial = new window.THREE.MeshStandardMaterial({
          color: 0xffffff,
          roughness: 0.1,
          metalness: 0.0
        })
        this.meshes.leftWall = new window.THREE.Mesh(leftWallGeometry, leftWallMaterial)
        this.meshes.leftWall.position.set(-5, 3, 0)
        this.meshes.leftWall.rotation.y = Math.PI / 2
        this.meshes.leftWall.receiveShadow = true
        this.scene.add(this.meshes.leftWall)
        
        // Bathtub
        const bathtubGeometry = new window.THREE.CylinderGeometry(1.5, 1.5, 0.8, 16)
        const bathtubMaterial = new window.THREE.MeshStandardMaterial({
          color: 0xf8f9fa,
          roughness: 0.8,
          metalness: 0.0
        })
        this.meshes.bathtub = new window.THREE.Mesh(bathtubGeometry, bathtubMaterial)
        this.meshes.bathtub.position.set(2.5, 0.4, -2.5)
        this.meshes.bathtub.castShadow = true
        this.meshes.bathtub.receiveShadow = true
        this.scene.add(this.meshes.bathtub)
        
        // Vanity
        const vanityGeometry = new window.THREE.BoxGeometry(2.5, 1, 0.6)
        const vanityMaterial = new window.THREE.MeshStandardMaterial({
          color: 0x4e342e,
          roughness: 0.7,
          metalness: 0.0
        })
        this.meshes.vanity = new window.THREE.Mesh(vanityGeometry, vanityMaterial)
        this.meshes.vanity.position.set(-2.5, 0.5, -4)
        this.meshes.vanity.castShadow = true
        this.meshes.vanity.receiveShadow = true
        this.scene.add(this.meshes.vanity)
        
        // Vanity countertop
        const counterGeometry = new window.THREE.BoxGeometry(2.7, 0.1, 0.65)
        const counterMaterial = new window.THREE.MeshStandardMaterial({
          color: 0xffffff,
          roughness: 0.05,
          metalness: 0.0
        })
        const counter = new window.THREE.Mesh(counterGeometry, counterMaterial)
        counter.position.set(-2.5, 1.05, -4)
        counter.castShadow = true
        counter.receiveShadow = true
        this.scene.add(counter)
      }

      setupRealisticLighting() {
        // Ambient light
        const ambientLight = new window.THREE.AmbientLight(0x404040, 0.4)
        this.scene.add(ambientLight)
        
        // Main directional light
        const mainLight = new window.THREE.DirectionalLight(0xffffff, 1.2)
        mainLight.position.set(8, 10, 8)
        mainLight.castShadow = true
        mainLight.shadow.mapSize.width = 2048
        mainLight.shadow.mapSize.height = 2048
        mainLight.shadow.camera.near = 0.5
        mainLight.shadow.camera.far = 50
        mainLight.shadow.camera.left = -10
        mainLight.shadow.camera.right = 10
        mainLight.shadow.camera.top = 10
        mainLight.shadow.camera.bottom = -10
        this.scene.add(mainLight)
        
        // Ceiling light
        const ceilingLight = new window.THREE.PointLight(0xfff8dc, 0.8, 20)
        ceilingLight.position.set(0, 5, 0)
        ceilingLight.castShadow = true
        this.scene.add(ceilingLight)
        
        // Vanity light
        const vanityLight = new window.THREE.PointLight(0xffffff, 0.6, 10)
        vanityLight.position.set(-2.5, 2.5, -3)
        vanityLight.castShadow = true
        this.scene.add(vanityLight)
      }

      applyMaterial(category: string, index: number) {
        const material = this.materials[category][index]
        let targetMeshes: any[] = []
        
        console.log(`Applying material: ${material.name} to ${category}`)
        
        switch(category) {
          case 'floor':
            targetMeshes = [this.meshes.floor]
            break
          case 'wall':
            targetMeshes = [this.meshes.backWall, this.meshes.leftWall]
            break
          case 'vanity':
            targetMeshes = [this.meshes.vanity]
            break
          case 'bathtub':
            targetMeshes = [this.meshes.bathtub]
            break
        }
        
        targetMeshes.forEach(mesh => {
          if (mesh && mesh.material) {
            console.log(`Updating material for ${mesh.name || 'unnamed mesh'}`)
            
            const startColor = mesh.material.color.clone()
            const endColor = new window.THREE.Color(material.color)
            const startRoughness = mesh.material.roughness
            const endRoughness = material.roughness
            const startMetalness = mesh.material.metalness
            const endMetalness = material.metalness
            
            let progress = 0
            const animate = () => {
              progress += 0.05  // Slower transition for smoother effect
              if (progress <= 1) {
                mesh.material.color.lerpColors(startColor, endColor, progress)
                mesh.material.roughness = startRoughness + (endRoughness - startRoughness) * progress
                mesh.material.metalness = startMetalness + (endMetalness - startMetalness) * progress
                mesh.material.needsUpdate = true  // Force material update
                requestAnimationFrame(animate)
              } else {
                // Ensure final values are set
                mesh.material.color.copy(endColor)
                mesh.material.roughness = endRoughness
                mesh.material.metalness = endMetalness
                mesh.material.needsUpdate = true
                console.log(`Material transition complete for ${mesh.name || 'unnamed mesh'}`)
              }
            }
            animate()
          } else {
            console.warn(`Mesh not found or missing material for ${category}`)
          }
        })
      }

      animate() {
        requestAnimationFrame(() => this.animate())
        this.renderer.render(this.scene, this.camera)
      }

      cleanup() {
        if (this.renderer) {
          this.renderer.dispose()
        }
      }
    }

    const designer = new RedecorstyleBathroomDesigner(sceneRef.current!)
    designerRef.current = designer
    
    // Make designer globally accessible for debugging
    if (typeof window !== 'undefined') {
      (window as any).designer = designer
    }
    
    console.log('Designer initialized:', designer)
  }

  const materials = {
    floor: [
      { name: 'Carrara Marble', price: 1580, pattern: 'marble', color: '#f8f9fa' },
      { name: 'Herringbone Oak', price: 1290, pattern: 'wood', color: '#8d6e63' },
      { name: 'Polished Concrete', price: 890, pattern: 'concrete', color: '#78909c' },
      { name: 'Nero Marquina', price: 2180, pattern: 'marble', color: '#1c1c1c' }
    ],
    wall: [
      { name: 'Subway Tile', price: 650, pattern: 'tile', color: '#ffffff' },
      { name: 'Travertine', price: 1200, pattern: 'stone', color: '#f5f5dc' },
      { name: 'Zellige Blue', price: 1850, pattern: 'tile', color: '#2e7d9a' },
      { name: 'Fluted Wood', price: 1450, pattern: 'wood', color: '#6d4c41' }
    ],
    vanity: [
      { name: 'Walnut Veneer', price: 1890, pattern: 'wood', color: '#4e342e' },
      { name: 'White Lacquer', price: 1650, pattern: 'solid', color: '#ffffff' },
      { name: 'Concrete Grey', price: 1290, pattern: 'concrete', color: '#616161' }
    ],
    bathtub: [
      { name: 'Matte White', price: 2890, pattern: 'solid', color: '#f8f9fa' },
      { name: 'Glossy Black', price: 3490, pattern: 'solid', color: '#212121' },
      { name: 'Stone Resin', price: 4290, pattern: 'stone', color: '#e0e0e0' }
    ]
  }

  const selectHotspot = (target: string) => {
    console.log(`Selecting hotspot: ${target}`)
    setCurrentSelection(target)
    
    // Update the designer's current selection
    if (designerRef.current) {
      designerRef.current.currentSelection = target
    }
  }

  const applyMaterial = (category: string, index: number) => {
    console.log(`React: Applying material ${index} to ${category}`)
    
    if (designerRef.current && designerRef.current.applyMaterial) {
      designerRef.current.applyMaterial(category, index)
      
      // Update active material state
      setActiveMaterials(prev => ({
        ...prev,
        [category]: index
      }))
    } else {
      console.error('Designer not ready or applyMaterial method not found')
    }
  }

  const getPatternStyle = (pattern: string, baseColor: string) => {
    switch(pattern) {
      case 'marble':
        return {
          background: `linear-gradient(45deg, ${baseColor} 0%, ${adjustColor(baseColor, -20)} 25%, ${baseColor} 50%, ${adjustColor(baseColor, -10)} 75%, ${baseColor} 100%)`
        }
      case 'wood':
        return {
          background: `repeating-linear-gradient(90deg, ${baseColor} 0px, ${adjustColor(baseColor, -30)} 8px, ${baseColor} 16px)`
        }
      case 'tile':
        return {
          background: `repeating-linear-gradient(0deg, ${baseColor} 0px, ${adjustColor(baseColor, -15)} 2px, ${baseColor} 4px)`
        }
      case 'concrete':
        return {
          background: `linear-gradient(135deg, ${baseColor} 0%, ${adjustColor(baseColor, -20)} 100%)`
        }
      case 'stone':
        return {
          background: `radial-gradient(circle at 30% 30%, ${adjustColor(baseColor, 10)} 0%, ${baseColor} 70%)`
        }
      default:
        return {
          background: baseColor
        }
    }
  }

  const adjustColor = (hex: string, amount: number) => {
    const color = parseInt(hex.slice(1), 16)
    const r = Math.max(0, Math.min(255, (color >> 16) + amount))
    const g = Math.max(0, Math.min(255, ((color >> 8) & 0x00FF) + amount))
    const b = Math.max(0, Math.min(255, (color & 0x0000FF) + amount))
    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <div className="fixed inset-0 top-20">
        {/* Header Bar */}
        <div className="absolute top-0 left-0 right-0 h-20 bg-black/80 backdrop-blur-lg flex items-center justify-between px-6 z-50">
          <button 
            className="w-10 h-10 rounded-full bg-white/20 border-none text-white text-lg cursor-pointer flex items-center justify-center hover:bg-white/30 transition-all duration-300"
            onClick={() => window.history.back()}
          >
            ←
          </button>
          
          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-full text-sm font-semibold">
              <div className="w-5 h-5 rounded-full bg-yellow-400"></div>
              <span>1280</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-full text-sm font-semibold">
              <div className="w-5 h-5 rounded-full bg-orange-500"></div>
              <span>890</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-full text-sm font-semibold">
              <div className="w-5 h-5 rounded-full bg-green-500"></div>
              <span>5430</span>
            </div>
          </div>
          
          <button className="bg-white/80 text-black border-none px-6 py-3 rounded-full font-semibold cursor-pointer hover:bg-white transition-all duration-300">
            Done
          </button>
        </div>

        {/* 3D Scene Container */}
        <div className="absolute top-20 left-0 right-0 bottom-44 bg-gradient-to-br from-gray-800 to-gray-900">
          {isLoading && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white/70 text-lg">
              Loading 3D Scene...
            </div>
          )}
          <div ref={sceneRef} className="w-full h-full relative">
            {/* Hotspots */}
            <button 
              className={`absolute w-10 h-10 border-3 rounded-full cursor-pointer transition-all duration-300 flex items-center justify-center backdrop-blur-lg z-10 hover:scale-110 ${
                currentSelection === 'floor' 
                  ? 'bg-red-500/80 border-red-400 shadow-lg shadow-red-500/50' 
                  : 'border-white/80 bg-white/10 hover:bg-white/30'
              }`}
              style={{ bottom: '20%', left: '45%' }}
              onClick={() => selectHotspot('floor')}
            >
              <div className={`w-2 h-2 rounded-full ${currentSelection === 'floor' ? 'bg-white' : 'bg-white'}`}></div>
            </button>
            
            <button 
              className={`absolute w-10 h-10 border-3 rounded-full cursor-pointer transition-all duration-300 flex items-center justify-center backdrop-blur-lg z-10 hover:scale-110 ${
                currentSelection === 'wall' 
                  ? 'bg-red-500/80 border-red-400 shadow-lg shadow-red-500/50' 
                  : 'border-white/80 bg-white/10 hover:bg-white/30'
              }`}
              style={{ top: '25%', right: '30%' }}
              onClick={() => selectHotspot('wall')}
            >
              <div className={`w-2 h-2 rounded-full ${currentSelection === 'wall' ? 'bg-white' : 'bg-white'}`}></div>
            </button>
            
            <button 
              className={`absolute w-10 h-10 border-3 rounded-full cursor-pointer transition-all duration-300 flex items-center justify-center backdrop-blur-lg z-10 hover:scale-110 ${
                currentSelection === 'vanity' 
                  ? 'bg-red-500/80 border-red-400 shadow-lg shadow-red-500/50' 
                  : 'border-white/80 bg-white/10 hover:bg-white/30'
              }`}
              style={{ bottom: '35%', left: '25%' }}
              onClick={() => selectHotspot('vanity')}
            >
              <div className={`w-2 h-2 rounded-full ${currentSelection === 'vanity' ? 'bg-white' : 'bg-white'}`}></div>
            </button>
            
            <button 
              className={`absolute w-10 h-10 border-3 rounded-full cursor-pointer transition-all duration-300 flex items-center justify-center backdrop-blur-lg z-10 hover:scale-110 ${
                currentSelection === 'bathtub' 
                  ? 'bg-red-500/80 border-red-400 shadow-lg shadow-red-500/50' 
                  : 'border-white/80 bg-white/10 hover:bg-white/30'
              }`}
              style={{ bottom: '30%', right: '20%' }}
              onClick={() => selectHotspot('bathtub')}
            >
              <div className={`w-2 h-2 rounded-full ${currentSelection === 'bathtub' ? 'bg-white' : 'bg-white'}`}></div>
            </button>
          </div>
        </div>

        {/* Materials Panel */}
        <div className="absolute bottom-0 left-0 right-0 h-44 bg-black/90 backdrop-blur-lg p-5 overflow-x-auto">
          <div className="flex gap-4 h-full pb-2">
            {materials[currentSelection as keyof typeof materials]?.map((material, index) => (
              <div
                key={index}
                className={`relative w-30 h-32 rounded-lg cursor-pointer transition-all duration-300 border-3 border-transparent overflow-hidden flex-shrink-0 hover:transform hover:-translate-y-1 hover:shadow-xl ${activeMaterials[currentSelection as keyof typeof activeMaterials] === index ? 'border-blue-400 transform -translate-y-1 shadow-lg shadow-blue-400/30' : ''}`}
                onClick={() => applyMaterial(currentSelection, index)}
              >
                <div 
                  className="w-full h-20 rounded-t-lg"
                  style={getPatternStyle(material.pattern, material.color)}
                ></div>
                <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-2 text-center">
                  <div className="text-xs font-semibold text-white mb-1">
                    {material.name}
                  </div>
                  <div className="text-xs text-yellow-400 flex items-center justify-center gap-1">
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                    {material.price}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 