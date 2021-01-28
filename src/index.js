// Option 1: Import the entire three.js core library.
import * as THREE from "three";

import { makeWave, makeSea, shakeSea } from "./sea";
import { makeStepper } from "./stepper";
import { makePoint, makeRectangle, makeRectangleUtils } from "./shapes";
import { makePointDepthCalculator } from "./calcPointDepth";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);
window.three = THREE;

// const cube1 = new THREE.Mesh(new THREE.BoxGeometry( 1, 1, 1 ), new THREE.MeshPhongMaterial( {color: 0x00ff00} ));
// scene.add(cube1);

const color = 0xffffff;
const intensity = 1;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(-1, 2, 4);
scene.add(light);

camera.position.z = 250;
camera.position.y = 0;
camera.position.x = 40;

const size = 1;

const spacing = 1.3;

var grid = new THREE.Object3D();
const boxes = [];

const SQUARE = 100;

const geo = new THREE.BoxBufferGeometry(size, size, size);
const mat = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
for (let i = 0; i < SQUARE * SQUARE; i++) {
  const box = new THREE.Mesh(geo, mat);
  boxes.push(box);
  grid.add(box);
}

scene.add(grid);

grid.rotation.x += 2;

const wave = makeWave((x) => Math.sin(x * 100) * 10);
const stepper = makeStepper(0.001);
let sea = makeSea(SQUARE);

const rectangle = makeRectangle(0, 0, SQUARE, SQUARE);
const calc = makePointDepthCalculator(rectangle, makeRectangleUtils());

const animate = function () {
  setTimeout(() => {
    requestAnimationFrame(animate);
  }, 30);

  sea = shakeSea(sea)(wave(stepper()));

  for (var i = 0; i < SQUARE; i++) {
    for (var j = 0; j < SQUARE; j++) {
      const point = makePoint(j, i);
      const depth = calc(point);

      const box = boxes[i * SQUARE + j];

      box.position.x = j * spacing;
      box.position.y = i * spacing;

      box.position.z = Math.abs(sea[depth]);

      grid.add(box);
    }
  }

  renderer.render(scene, camera);
};

animate();
