const scene = new THREE.Scene();
const camera = new THREE.Camera();
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const ArToolkitSource = new THREEx.ArToolkitSource({
  sourceType: 'webcam'
});

ArToolkitSource.init(() => {
  setTimeout(() => {
    ArToolkitSource.onResizeElement();
  }, 2000);
});

const ArToolkitContext = new THREEx.ArToolkitContext({
  cameraParametersUrl: 'camera_para.dat',
  detectionMode: 'color_and_matrix'
});

ArToolkitContext.init(() => {
  camera.projectionMatrix.copy(ArToolkitContext.getProjectionMatrix());
});

const ArMarkerControls = new THREEx.ArMarkerControls(ArToolkitContext, camera, {
  type: 'pattern',
  patternUrl: 'pattern-apple.patt',
  changeMatrixMode: 'cameraTransformMatrix'
});

const loader = new THREE.GLTFLoader();
const url = 'apple.glb'; // Replace with the path to your 3D model

let model;

loader.load(url, (gltf) => {
  model = gltf.scene;
  model.scale.set(0.005, 0.005, 0.005);
  scene.add(model);
});

// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshNormalMaterial({
//   transparent: true,
//   opacity: 0.5,
//   side: THREE.DoubleSide
// });
// const cube = new THREE.Mesh(geometry, material);
// cube.position.y = geometry.parameters.height / 2;
// scene.add(cube);

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);

  if (ArToolkitSource.ready) {
    if (ArToolkitContext.arController !== null) {
      ArToolkitContext.update(ArToolkitSource.domElement);
      scene.visible = camera.visible;
      renderer.render(scene, camera);
    }
  }
}

animate();
