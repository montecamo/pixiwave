// Option 1: Import the entire three.js core library.
import * as THREE from "three";
import Stats from "stats.js";

import {
  makePoint,
  getPointX,
  getPointY,
  getPointZ,
  makeBasicBaseShape,
  makeBasicWaveShape,
} from "./abstractShapes";
import { makeSinusoid } from "./utils";

import { makeRenderer } from "./renderer";

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

const color = 0xffffff;
const intensity = 1;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(-1, 2, 4);
scene.add(light);

camera.position.z = 400;
camera.position.y = 0;
camera.position.x = 0;

var grid = new THREE.Object3D();

const geo = new THREE.BoxBufferGeometry(1, 1, 1);
const mat = new THREE.MeshPhongMaterial({ color: 0x00ff00 });

scene.add(grid);

grid.rotation.x += 2;

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

// CORE CODE

const centerPoint = makePoint(0, 0);
const sinusoid = makeSinusoid(20, 10);

const baseShape = makeBasicBaseShape(centerPoint, {
  type: "rectangle",
  size: 41,
});
const wave = makeBasicWaveShape(
  makePoint(-20, -20),
  { type: "circle" },
  sinusoid
);
const wave2 = makeBasicWaveShape(
  makePoint(20, 20),
  { type: "circle" },
  sinusoid
);

const SPACING = 10;

const coreRenderer = makeRenderer(baseShape);
coreRenderer.addWave(wave);

function loop() {
  grid.clear();

  coreRenderer.tick();
  coreRenderer.render((point) => {
    const box = new THREE.Mesh(geo, mat);

    box.position.x = getPointX(point) * SPACING;
    box.position.y = getPointY(point) * SPACING;

    box.position.z = -getPointZ(point);

    grid.add(box);
  });

  renderer.render(scene, camera);

  setTimeout(() => {
    requestAnimationFrame(loop);
  }, 30);
}

loop();
