import * as THREE from './node_modules/three/build/three.module.js';
import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls.js';
import { MTLLoader } from './node_modules/three/examples/jsm/loaders/MTLLoader.js';
import { OBJLoader } from './node_modules/three/examples/jsm/loaders/OBJLoader.js';

const container = document.getElementById('app');
const loadingEl = document.getElementById('loading');

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222);

const camera = new THREE.PerspectiveCamera(
  45,
  container.clientWidth / container.clientHeight,
  0.1,
  1000
);
camera.position.set(0, 5, 15);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

const hemiLight = new THREE.HemisphereLight(0xffffff, 0x222222, 1.0);
hemiLight.position.set(0, 20, 0);
scene.add(hemiLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
dirLight.position.set(10, 20, 10);
scene.add(dirLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enablePan = true;
controls.target.set(0, 0, 0);

let model = null;

const mtlLoader = new MTLLoader();
mtlLoader.setPath('./models/');
mtlLoader.load(
  'fotou.mtl',
  (materials) => {
    materials.preload();

    const objLoader = new OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('./models/');

    objLoader.load(
      'fotou.obj',
      (obj) => {
        model = obj;

        obj.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        const box = new THREE.Box3().setFromObject(obj);
        const size = new THREE.Vector3();
        box.getSize(size);
        const maxDim = Math.max(size.x, size.y, size.z) || 1;
        const scale = 10 / maxDim;
        obj.scale.setScalar(scale);

        box.setFromObject(obj);
        const center = box.getCenter(new THREE.Vector3());
        obj.position.sub(center);

        scene.add(obj);

        if (loadingEl) {
          loadingEl.style.display = 'none';
        }
      },
      (xhr) => {
        if (loadingEl) {
          if (xhr.total) {
            const percent = ((xhr.loaded / xhr.total) * 100).toFixed(0);
            loadingEl.textContent = `正在加载模型... ${percent}%`;
          } else {
            loadingEl.textContent = '正在加载模型...';
          }
        }
      },
      (error) => {
        console.error('OBJ 加载失败:', error);
        if (loadingEl) {
          loadingEl.textContent = '模型加载失败，请检查控制台日志和本地服务器设置。';
        }
      }
    );
  },
  undefined,
  (error) => {
    console.error('MTL 加载失败:', error);
    if (loadingEl) {
      loadingEl.textContent = '材质加载失败，请检查文件路径。';
    }
  }
);

window.addEventListener('resize', () => {
  const width = container.clientWidth;
  const height = container.clientHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
});

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();
