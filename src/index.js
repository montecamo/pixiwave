// Option 1: Import the entire three.js core library.
import * as THREE from "three";

import { makeWave, makeSea, shakeSea, getSeaDepth } from "./sea";
import { makeStepper } from "./stepper";
import {
  makePoint,
  makeRectangle,
  makeShape,
  makeShapeUtils,
  getShape,
  getPointX,
  getPointY,
  makeRectangleUtils,
} from "./shapes";
import { makeShapeLayerCalculator, getMaxWaveDepth } from "./waveDepth";

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

camera.position.z = 100;
camera.position.y = 0;
camera.position.x = 10;

const size = 1;

const spacing = 1.3;

var grid = new THREE.Object3D();
const boxes = [];
const rectUtils = makeRectangleUtils();

const SQUARE = 40;

const geo = new THREE.BoxBufferGeometry(size, size, size);
const mat = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
// for (let i = 0; i < SQUARE * SQUARE; i++) {
// const box = new THREE.Mesh(geo, mat);
// boxes.push(box);
// grid.add(box);
// }

scene.add(grid);

grid.rotation.x += 2;

const wave = makeWave((x) => Math.sin(x * 100) * 10);
const stepper = makeStepper(0.001);

const baseShape = makeShape(
  makeRectangle(makePoint(0, 0), SQUARE - 1, SQUARE - 1),
  "rectangle"
);
const baseUtils = makeShapeUtils(baseShape);
const [topLeft] = baseUtils.getExtremePoints(getShape(baseShape));
const topLeftX = getPointX(topLeft);
const topLeftY = getPointX(topLeft);

const waveShape = makeShape(
  makeRectangle(makePoint(0, -50), SQUARE - 1, SQUARE - 1),
  "rectangle"
);

const maxSeaDepth = getMaxWaveDepth(baseShape, waveShape);
let sea = makeSea(maxSeaDepth + 1);

const calc = makeShapeLayerCalculator(waveShape);
console.warn("cac");
console.warn("calc", calc(makePoint(0.5, -0.5)));

const animate = function () {
  setTimeout(() => {
    requestAnimationFrame(animate);
  }, 30);

  sea = shakeSea(sea)(wave(stepper()));

  grid.clear();

  for (var y = topLeftY; y < topLeftY + SQUARE; y++) {
    for (var x = topLeftX; x < topLeftX + SQUARE; x++) {
      const point = makePoint(x, y);
      const depth = maxSeaDepth - calc(point);

      const box = new THREE.Mesh(geo, mat);

      box.position.x = x * spacing;
      box.position.y = y * spacing;

      box.position.z = sea[depth];

      grid.add(box);
    }
  }

  renderer.render(scene, camera);
};

animate();
