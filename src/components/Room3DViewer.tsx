'use client'

import { useRef } from 'react'

// Scene data from mobile app demo
const SCENE_DATA = {
  environment: 'studio',
  items: [
    {
      id: 'room',
      name: 'room.glb',
      url: 'https://storage.googleapis.com/furniture-glb-test-public/demo-glbs/compressed_empty_room.glb',
      position: [0, 2.292253777287911, 5.366944085483566],
      rotation: [1.5660407854416705, 0, 0],
      scale: [1, 1, 1],
    },
    {
      id: 'wall_painting',
      name: 'wall_painting.glb',
      url: 'https://storage.googleapis.com/furniture-glb-test-public/demo-glbs/wall_painting.glb',
      position: [-3, 1.5, 3.1605251393775937],
      rotation: [0, 0, 0],
      scale: [2, 2, 2],
    },
    {
      id: 'N01003005001L01E7ZJKCWEY79G-1',
      name: 'N01003005001L01E7ZJKCWEY79G.glb',
      url: 'https://storage.googleapis.com/furniture-glb-test-public/demo-glbs/N01003005001L01E7ZJKCWEY79G.glb',
      position: [-4.7, -0.008558475263591214, 3.53],
      rotation: [-1.377796119996084e-15, 1.5638120939812679, 1.6223132316345164e-15],
      scale: [1, 1, 1],
    },
    {
      id: 'N01003005001L01E7ZJKCWEY79G-2',
      name: 'N01003005001L01E7ZJKCWEY79G.glb',
      url: 'https://storage.googleapis.com/furniture-glb-test-public/demo-glbs/N01003005001L01E7ZJKCWEY79G.glb',
      position: [-4.7, 0.002462148485136151, 5.75],
      rotation: [-3.141592653589793, 1.5626915472770018, -3.141592653589793],
      scale: [1, 1, 1],
    },
    {
      id: 'L01003005004Y01WT95QAT3QJHL-1',
      name: 'L01003005004Y01WT95QAT3QJHL.glb',
      url: 'https://storage.googleapis.com/furniture-glb-test-public/demo-glbs/L01003005004Y01WT95QAT3QJHL.glb',
      position: [-4.7, 0.4378544180148447, 5.75],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
    },
    {
      id: 'L01003005004Y01WT95QAT3QJHL-2',
      name: 'L01003005004Y01WT95QAT3QJHL.glb',
      url: 'https://storage.googleapis.com/furniture-glb-test-public/demo-glbs/L01003005004Y01WT95QAT3QJHL.glb',
      position: [-4.7, 0.42969472773293016, 3.53],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
    },
    {
      id: 'C01001005001Y02VCKKUUE8KVLN',
      name: 'C01001005001Y02VCKKUUE8KVLN.glb',
      url: 'https://storage.googleapis.com/furniture-glb-test-public/demo-glbs/C01001005001Y02VCKKUUE8KVLN.glb',
      position: [-1.3, 0.018351625519383963, 5.063790922505906],
      rotation: [3.141592653589793, -0.8764865954799111, 3.141592653589793],
      scale: [1, 1, 1],
    },
    {
      id: 'C02001001001X01O9Z60O3BZFET',
      name: 'C02001001001X01O9Z60O3BZFET.glb',
      url: 'https://storage.googleapis.com/furniture-glb-test-public/demo-glbs/C02001001001X01O9Z60O3BZFET.glb',
      position: [-1.1, -0.010363796684173643, 3.43],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
    },
    {
      id: 'C01001007001N01JLCNN2L0DS2W',
      name: 'C01001007001N01JLCNN2L0DS2W.glb',
      url: 'https://storage.googleapis.com/furniture-glb-test-public/demo-glbs/C01001007001N01JLCNN2L0DS2W.glb',
      position: [-1.8, -0.011937575343393347, 4.401384133317575],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
    },
    {
      id: 'B02003005001L01HD07LSIFNH6P',
      name: 'B02003005001L01HD07LSIFNH6P.glb',
      url: 'https://storage.googleapis.com/furniture-glb-test-public/demo-glbs/B02003005001L01HD07LSIFNH6P.glb',
      position: [-4.0483578256098465, -0.08864966712903843, 4.62158465639522],
      rotation: [0, 1.5706054553592734, 0],
      scale: [1.65, 1.65, 1.65],
    },
    {
      id: 'B01001005001M01O9Z60ORCWCPT',
      name: 'B01001005001M01O9Z60ORCWCPT.glb',
      url: 'https://storage.googleapis.com/furniture-glb-test-public/demo-glbs/B01001005001M01O9Z60ORCWCPT.glb',
      position: [-2.6, -0.03583070634195651, 4.6],
      rotation: [2.397038242552633, 1.55, -2.4148926362314573],
      scale: [1, 1, 1],
    },
  ],
}

interface Room3DViewerProps {
  className?: string
}

export default function Room3DViewer({ className = '' }: Room3DViewerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            margin: 0;
            overflow: hidden;
            background: #fafafa;
            font-family: 'GT America', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          }
          canvas { display: block; touch-action: none; }

          #hint {
            position: absolute;
            bottom: 20px;
            right: 20px;
            color: #8E8E8E;
            font-size: 11px;
            background: rgba(255, 255, 255, 0.95);
            padding: 8px 16px;
            border-radius: 20px;
            backdrop-filter: blur(10px);
            box-shadow: 0 2px 8px rgba(0,0,0,0.06);
          }

          #reset-view {
            position: absolute;
            top: 20px;
            right: 20px;
            background: rgba(255, 255, 255, 0.95);
            border: 1px solid rgba(0,0,0,0.08);
            padding: 10px 20px;
            border-radius: 24px;
            font-size: 12px;
            font-weight: 500;
            color: #101A2E;
            cursor: pointer;
            box-shadow: 0 2px 8px rgba(0,0,0,0.06);
            backdrop-filter: blur(20px);
            transition: all 0.3s ease;
            letter-spacing: 0.5px;
          }

          #reset-view:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 16px rgba(0,0,0,0.1);
            background: #101A2E;
            color: white;
          }

          #loading {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
          }

          #loading-text {
            color: #101A2E;
            font-size: 13px;
            font-weight: 500;
            letter-spacing: 0.5px;
            margin-bottom: 16px;
          }

          #loading-bar-container {
            width: 200px;
            height: 3px;
            background: #E1E1E1;
            border-radius: 2px;
            overflow: hidden;
          }

          #loading-bar {
            height: 100%;
            background: linear-gradient(90deg, #D1903E, #C9A876);
            width: 0%;
            transition: width 0.3s ease;
            border-radius: 2px;
          }
        </style>
        <script crossorigin="anonymous" src="https://unpkg.com/three@0.147.0/build/three.min.js"></script>
        <script crossorigin="anonymous" src="https://unpkg.com/three@0.147.0/examples/js/controls/OrbitControls.js"></script>
        <script crossorigin="anonymous" src="https://unpkg.com/three@0.147.0/examples/js/loaders/GLTFLoader.js"></script>
        <script crossorigin="anonymous" src="https://unpkg.com/three@0.147.0/examples/js/loaders/DRACOLoader.js"></script>
      </head>
      <body>
        <div id="loading">
          <div id="loading-text">Loading 3D Room...</div>
          <div id="loading-bar-container">
            <div id="loading-bar"></div>
          </div>
        </div>
        <div id="hint" style="display: none;">Drag to rotate &bull; Scroll to zoom</div>
        <button id="reset-view" onclick="resetCamera()" style="display: none;">Reset View</button>

        <script>
          const scene = new THREE.Scene();
          scene.background = new THREE.Color(0xfafafa);

          const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);

          const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
          renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
          renderer.setSize(window.innerWidth, window.innerHeight);
          renderer.shadowMap.enabled = true;
          renderer.shadowMap.type = THREE.PCFSoftShadowMap;
          renderer.toneMapping = THREE.ACESFilmicToneMapping;
          renderer.toneMappingExposure = 1.2;
          renderer.outputEncoding = THREE.sRGBEncoding;
          document.body.appendChild(renderer.domElement);

          // Lighting
          const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
          scene.add(ambientLight);

          const keyLight = new THREE.DirectionalLight(0xffffff, 0.6);
          keyLight.position.set(5, 15, 5);
          keyLight.castShadow = true;
          keyLight.shadow.mapSize.width = 2048;
          keyLight.shadow.mapSize.height = 2048;
          scene.add(keyLight);

          // Controls
          const controls = new THREE.OrbitControls(camera, renderer.domElement);
          controls.enableDamping = true;
          controls.dampingFactor = 0.05;
          controls.minDistance = 2;
          controls.maxDistance = 12;
          controls.target.set(0, 0, 0);
          controls.enablePan = false;

          // Load models
          const loader = new THREE.GLTFLoader();
          const dracoLoader = new THREE.DRACOLoader();
          dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
          loader.setDRACOLoader(dracoLoader);

          const sceneData = ${JSON.stringify(SCENE_DATA)};

          let loadedCount = 0;
          const totalItems = sceneData.items.length;

          function updateProgress(count) {
            const percent = Math.floor((count / totalItems) * 100);
            document.getElementById('loading-bar').style.width = percent + '%';
            document.getElementById('loading-text').textContent = 'Loading 3D Room... ' + percent + '%';
            window.parent.postMessage({ type: 'progress', value: percent }, '*');
          }

          function loadNext(index) {
            if (index >= totalItems) return;
            const item = sceneData.items[index];

            loader.load(
              item.url,
              function (gltf) {
                const model = gltf.scene;
                const isRoom = item.name.toLowerCase().includes('room.glb');

                if (isRoom) {
                  model.rotation.x = -Math.PI / 2;
                  model.rotation.z = Math.PI;
                } else {
                  const offsetX = 0.0;
                  const offsetZ = -3.15;
                  model.position.set(item.position[0] + offsetX, item.position[1], item.position[2] + offsetZ);
                  model.rotation.set(item.rotation[0], item.rotation[1], item.rotation[2]);
                  model.scale.set(item.scale[0], item.scale[1], item.scale[2]);
                }

                model.traverse((child) => {
                  if (child.isMesh) {
                    if (isRoom) {
                      child.castShadow = false;
                      child.receiveShadow = true;
                    } else {
                      child.castShadow = true;
                      child.receiveShadow = true;
                      if (child.material && item.id !== 'wall_painting') {
                        const originalColor = child.material.color.clone();
                        child.material.color.r = originalColor.r * 0.8;
                        child.material.color.g = originalColor.g * 0.8;
                        child.material.color.b = originalColor.b * 0.8;
                        child.material.needsUpdate = true;
                      }
                    }
                  }
                });

                scene.add(model);
                loadedCount++;
                updateProgress(loadedCount);

                if (loadedCount === totalItems) {
                  const box = new THREE.Box3().setFromObject(scene);
                  const center = box.getCenter(new THREE.Vector3());
                  const size = box.getSize(new THREE.Vector3());

                  const maxDim = Math.max(size.x, size.y, size.z);
                  const fov = camera.fov * (Math.PI / 180);
                  let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));

                  camera.position.set(center.x + cameraZ * 0.5, center.y + cameraZ * 0.5, center.z + cameraZ);

                  const adjustedCenter = center.clone();
                  adjustedCenter.x -= 0.5;
                  camera.lookAt(adjustedCenter);
                  controls.target.copy(adjustedCenter);

                  const interiorLight = new THREE.PointLight(0xfff5e6, 2.5, 15);
                  interiorLight.position.copy(center);
                  interiorLight.position.y += 1.5;
                  scene.add(interiorLight);

                  window.defaultCameraPosition = camera.position.clone();
                  window.defaultCameraTarget = adjustedCenter.clone();

                  document.getElementById('loading').style.display = 'none';
                  document.getElementById('hint').style.display = 'block';
                  document.getElementById('reset-view').style.display = 'block';

                  window.parent.postMessage({ type: 'loaded' }, '*');
                }

                loadNext(index + 1);
              },
              null,
              function (error) {
                console.error('Error loading:', item.name);
                loadedCount++;
                updateProgress(loadedCount);
                loadNext(index + 1);
              }
            );
          }

          loadNext(0);

          camera.position.set(4.5, 2.5, 10.5);
          camera.lookAt(0, 0, 0);

          window.resetCamera = function() {
            if (window.defaultCameraPosition && window.defaultCameraTarget) {
              camera.position.copy(window.defaultCameraPosition);
              camera.lookAt(window.defaultCameraTarget);
              controls.target.copy(window.defaultCameraTarget);
            }
            controls.update();
          };

          function animate() {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
          }
          animate();

          window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
          });
        </script>
      </body>
    </html>
  `


  return (
    <div className={`relative w-full h-full bg-neutral-50 rounded-2xl overflow-hidden ${className}`}>
      <iframe
        ref={iframeRef}
        srcDoc={htmlContent}
        className="w-full h-full border-0"
        title="3D Room Viewer"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
      />
    </div>
  )
}
