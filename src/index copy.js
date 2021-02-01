// Option 1: Import the entire three.js core library.
import * as THREE from "three";
import Stats from "stats.js";

import { makeWave, makeWaveShaker, getWaveHeight } from "./wave";
import {
  makePoint,
  makeRectangle,
  makeCircle,
  makeShape,
  makeShapeUtils,
  getShape,
  getPointX,
  getPointY,
} from "./shapes";
import {
  makeShapeLayerCalculator,
  getMaxWaveLength,
  makeStepper,
  makeSinusoid,
} from "./utils";

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

camera.position.z = 300;
camera.position.y = 0;
camera.position.x = 10;

const size = 1;

const spacing = 6;

var grid = new THREE.Object3D();
const boxes = [];

const SQUARE = 61;

const geo = new THREE.BoxBufferGeometry(size, size, size);
const mat = new THREE.MeshPhongMaterial({ color: 0x00ff00 });

scene.add(grid);

grid.rotation.x += 2;

const baseShape = makeShape(
  makeRectangle(makePoint(0, 0), SQUARE - 1, SQUARE - 1),
  "rectangle"
);
const baseUtils = makeShapeUtils(baseShape);
const [topLeft] = baseUtils.getExtremePoints(getShape(baseShape));
const topLeftX = getPointX(topLeft);
const topLeftY = getPointX(topLeft);

// const waveShape = makeShape(
// makeRectangle(makePoint(0, 0), SQUARE - 1, SQUARE - 1),
// "rectangle"
// );

const waveShape = makeShape(makeCircle(makePoint(-60, -60), 4), "circle");
// const waveShape2 = makeShape(makeCircle(makePoint(+25, 0), 1), "circle");
// const waveShape3 = makeShape(makeCircle(makePoint(0, -25), 1), "circle");
// const waveShape4 = makeShape(makeCircle(makePoint(0, 25), 1), "circle");

// const waveShape = makeShape(makeRectangle(makePoint(0, 0), 1, 30), "rectangle");

const stepper = makeStepper(0.001);

const maxWaveDepth = getMaxWaveLength(baseShape, waveShape);
let wave = makeWave(maxWaveDepth + 1);

const shakeWave = makeWaveShaker(makeSinusoid(220, 1), stepper);

const calc = makeShapeLayerCalculator(waveShape);

const animate = function () {
  setTimeout(() => {
    requestAnimationFrame(animate);
  }, 30);

  wave = shakeWave(wave);

  grid.clear();

  for (var y = topLeftY; y < topLeftY + SQUARE; y++) {
    for (var x = topLeftX; x < topLeftX + SQUARE; x++) {
      const point = makePoint(x, y);
      const position = maxWaveDepth - calc(point);

      const box = new THREE.Mesh(geo, mat);

      box.position.x = x * spacing;
      box.position.y = y * spacing;

      box.position.z = getWaveHeight(wave)(position);

      grid.add(box);
    }
  }

  renderer.render(scene, camera);
};

animate();

var stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
console.warn("stats", stats);
document.body.appendChild(stats.dom);

function animatestats() {
  stats.begin();

  // monitored code goes here

  stats.end();

  requestAnimationFrame(animatestats);
}

requestAnimationFrame(animatestats);
