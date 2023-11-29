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

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft white light
scene.add(ambientLight);
// Create an MTLLoader instance
const mtlLoader = new THREE.MTLLoader();

// Load the material file
mtlLoader.load('OBJ.mtl', (materials) => {
  materials.preload(); // Preload materials for OBJLoader to use

  // Create an OBJLoader instance
  const objLoader = new THREE.OBJLoader();
  console.log(materials)
  // Set loaded materials to OBJLoader
  objLoader.setMaterials(materials);

  // Load the object file (OBJ)
 
  objLoader.load('OBJ.obj', (object) => {
    // Manipulate the loaded object if needed
    object.scale.set(0.5, 0.5, 0.5);
    object.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // child.material = new THREE.MeshBasicMaterial({ color: 0x365452 }); // Set a temporary white material
      }
    });
    // Add the object to your scene
    scene.add(object);
  });
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
