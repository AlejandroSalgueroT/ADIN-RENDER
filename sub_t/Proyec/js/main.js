let scene, camera, renderer, mixer, clock;

init();
animate();

function init() {
  const container = document.getElementById('container');
  scene = new THREE.Scene();
  scene.background = null; // Fondo transparente

  camera = new THREE.PerspectiveCamera(35, 200 / 260, 0.1, 100); // Usa el mismo aspect ratio que el canvas
  camera.position.set(0, 1.4, 1.2); // Más cerca y centrado

  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio); // Añade esta línea
  renderer.setSize(200, 260); // O el tamaño que uses
  document.getElementById('avatar-chatbox').appendChild(renderer.domElement);

  const light = new THREE.HemisphereLight(0xffffff, 0x444444);
  scene.add(light);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(1, 2, 3);
  scene.add(directionalLight);

  clock = new THREE.Clock();

  const loader = new THREE.GLTFLoader();
  loader.load('../../assets/models/avatar2.glb', function (gltf) {
    const model = gltf.scene;
    scene.add(model);
    window.avatarModel = model; // Guarda referencia global
    mixer = new THREE.AnimationMixer(model);
    gltf.animations.forEach((clip) => {
      mixer.clipAction(clip).play();
    });
  }, undefined, function (error) {
    console.error('Error cargando el modelo:', error);
  });

  window.addEventListener('resize', onWindowResize);
}

function animate() {
  requestAnimationFrame(animate);
  const delta = clock.getDelta();
  if (mixer) mixer.update(delta);
  renderer.render(scene, camera);
}

function onWindowResize() {
  const container = document.getElementById('container');
  camera.aspect = container.offsetWidth / container.offsetHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(container.offsetWidth, container.offsetHeight);
}

let currentAction = null;

function playAnimation(name) {
  if (!mixer) return;
  const clip = THREE.AnimationClip.findByName(mixer._root.animations, name);
  if (clip) {
    if (currentAction) currentAction.stop();
    currentAction = mixer.clipAction(clip);
    currentAction.reset().play();
  }
}

document.addEventListener('mouseup', function () {
  const selectedText = window.getSelection().toString().trim();
  const bubble = document.getElementById('thought-bubble');
  if (selectedText.length > 0) {
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(selectedText);
    utter.lang = 'en-GB';
    // Muestra el globo de pensamiento
    if (bubble) {
      bubble.textContent = selectedText;
      bubble.style.display = 'block';
    }
    // Guarda la rotación original y mira a la cámara
    if (window.avatarModel) {
      window.avatarModel._originalY = window.avatarModel.rotation.y;
      window.avatarModel.rotation.y = Math.PI;
    }
    utter.onend = function () {
      // Restaura la rotación original
      if (window.avatarModel && window.avatarModel._originalY !== undefined) {
        window.avatarModel.rotation.y = window.avatarModel._originalY;
      }
      // Oculta el globo de pensamiento
      if (bubble) bubble.style.display = 'none';
    };
    window.speechSynthesis.speak(utter);
  }
});