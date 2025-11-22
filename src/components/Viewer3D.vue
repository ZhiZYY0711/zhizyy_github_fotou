<script setup>
import { onMounted, onBeforeUnmount, ref, watch, defineExpose } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'

const containerRef = ref(null)
const wrapperRef = ref(null)
const loadingText = ref('正在加载模型...')
const showGrid = ref(true)
const enableLighting = ref(true)

let scene, camera, renderer, controls
let model = null
let animationId = null
let resizeObserver = null
let gridHelper = null
let lights = []

// Initial camera position
const initialCameraPosition = new THREE.Vector3(0, 5, 15)
const initialTarget = new THREE.Vector3(0, 0, 0)

const init = () => {
  const container = containerRef.value
  if (!container) return

  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x111111)

  const width = container.clientWidth
  const height = container.clientHeight

  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
  camera.position.copy(initialCameraPosition)

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(width, height)
  container.appendChild(renderer.domElement)

  // Lights
  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x222222, 1.0)
  hemiLight.position.set(0, 20, 0)
  scene.add(hemiLight)
  lights.push(hemiLight)

  const dirLight = new THREE.DirectionalLight(0xffffff, 1.2)
  dirLight.position.set(10, 20, 10)
  scene.add(dirLight)
  lights.push(dirLight)

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
  scene.add(ambientLight)
  lights.push(ambientLight)

  // Grid
  gridHelper = new THREE.GridHelper(20, 20, 0x444444, 0x222222)
  if (showGrid.value) {
    scene.add(gridHelper)
  }

  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.05
  controls.enablePan = true
  controls.target.copy(initialTarget)

  loadModel()
  
  resizeObserver = new ResizeObserver(() => {
    onResize()
  })
  resizeObserver.observe(container)
}

const loadModel = () => {
  const mtlLoader = new MTLLoader()
  mtlLoader.setPath('/models/')
  mtlLoader.load(
    'fotou.mtl',
    (materials) => {
      materials.preload()

      const objLoader = new OBJLoader()
      objLoader.setMaterials(materials)
      objLoader.setPath('/models/')

      objLoader.load(
        'fotou.obj',
        (obj) => {
          model = obj

          obj.traverse((child) => {
            if (child.isMesh) {
              child.castShadow = true
              child.receiveShadow = true
            }
          })

          const box = new THREE.Box3().setFromObject(obj)
          const size = new THREE.Vector3()
          box.getSize(size)
          const maxDim = Math.max(size.x, size.y, size.z) || 1
          const scale = 10 / maxDim
          obj.scale.setScalar(scale)

          box.setFromObject(obj)
          const center = box.getCenter(new THREE.Vector3())
          obj.position.sub(center)

          scene.add(obj)

          loadingText.value = ''
        },
        (xhr) => {
          if (xhr.total) {
            const percent = ((xhr.loaded / xhr.total) * 100).toFixed(0)
            loadingText.value = `正在加载模型... ${percent}%`
          } else {
            loadingText.value = '正在加载模型...'
          }
        },
        (error) => {
          console.error('OBJ 加载失败:', error)
          loadingText.value = '模型加载失败'
        }
      )
    },
    undefined,
    (error) => {
      console.error('MTL 加载失败:', error)
      loadingText.value = '材质加载失败'
    }
  )
}

// Watchers for toggles
watch(showGrid, (val) => {
  if (val) scene.add(gridHelper)
  else scene.remove(gridHelper)
})

watch(enableLighting, (val) => {
  lights.forEach(light => {
    light.visible = val
  })
})

// Control Actions
const resetCamera = () => {
  controls.reset()
  camera.position.copy(initialCameraPosition)
  controls.target.copy(initialTarget)
}

const zoomIn = () => {
  // Move camera closer to target
  const direction = new THREE.Vector3()
  camera.getWorldDirection(direction)
  camera.position.addScaledVector(direction, 2)
}

const zoomOut = () => {
  // Move camera away from target
  const direction = new THREE.Vector3()
  camera.getWorldDirection(direction)
  camera.position.addScaledVector(direction, -2)
}

const toggleFullscreen = () => {
  const el = wrapperRef.value
  if (!document.fullscreenElement) {
    el.requestFullscreen().catch(err => {
      console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
    });
  } else {
    document.exitFullscreen();
  }
}

// View Presets
const setCameraView = (viewName) => {
  const distance = 15
  
  switch(viewName) {
    case 'front':
      camera.position.set(0, 0, distance)
      break
    case 'back':
      camera.position.set(0, 0, -distance)
      break
    case 'left':
      camera.position.set(-distance, 0, 0)
      break
    case 'right':
      camera.position.set(distance, 0, 0)
      break
    case 'top':
      camera.position.set(0, distance, 0)
      break
    case 'bottom':
      camera.position.set(0, -distance, 0)
      break
  }
  controls.target.set(0, 0, 0)
  controls.update()
}

defineExpose({ setCameraView })

const onResize = () => {
  const container = containerRef.value
  if (!container || !camera || !renderer) return
  const w = container.clientWidth
  const h = container.clientHeight
  camera.aspect = w / h
  camera.updateProjectionMatrix()
  renderer.setSize(w, h)
}

const animate = () => {
  animationId = requestAnimationFrame(animate)
  controls && controls.update()
  renderer && renderer.render(scene, camera)
}

onMounted(() => {
  init()
  animate()
})

onBeforeUnmount(() => {
  if (resizeObserver) resizeObserver.disconnect()
  if (animationId) cancelAnimationFrame(animationId)
  if (renderer) {
    renderer.dispose()
  }
})
</script>

<template>
  <div ref="wrapperRef" class="viewer-wrapper">
    <div ref="containerRef" class="canvas-container"></div>
    
    <!-- Overlays -->
    <div class="overlay-top-left">当前模式：3D视图</div>
    
    <div class="overlay-top-right">
      <button title="复位" @click="resetCamera">↺</button>
      <button title="放大" @click="zoomIn">+</button>
      <button title="缩小" @click="zoomOut">-</button>
      <button title="全屏" @click="toggleFullscreen">⛶</button>
    </div>

    <div class="overlay-bottom-left">
      <div class="axis-indicator">
        <span style="color: red">—— X</span><br>
        <span style="color: green">—— Y</span>
      </div>
    </div>

    <div class="overlay-bottom-center">
      <label><input type="checkbox" v-model="showGrid"> 网格</label>
      <label><input type="checkbox" v-model="enableLighting"> 光照</label>
    </div>

    <div v-if="loadingText" class="loading">{{ loadingText }}</div>
  </div>
</template>

<style scoped>
.viewer-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  background: #000;
  overflow: hidden;
}

.canvas-container {
  width: 100%;
  height: 100%;
}

.canvas-container :deep(canvas) {
  display: block;
}

.loading {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.7);
  padding: 10px 20px;
  border-radius: 4px;
  color: #fff;
}

/* Overlays */
.overlay-top-left {
  position: absolute;
  top: 20px;
  left: 20px;
  background: rgba(0, 0, 0, 0.6);
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
  color: #fff;
}

.overlay-top-right {
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.overlay-top-right button {
  background: transparent;
  border: none;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
}

.overlay-top-right button:hover {
  background: rgba(255, 255, 255, 0.1);
}

.overlay-bottom-left {
  position: absolute;
  bottom: 20px;
  left: 20px;
  pointer-events: none;
}

.overlay-bottom-center {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.6);
  padding: 5px 15px;
  border-radius: 20px;
  display: flex;
  gap: 15px;
  color: #fff;
  font-size: 12px;
}

.overlay-bottom-center label {
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
}
</style>
