import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import {
  BACKGROUND_COLOR,
  AMBIENT_LIGHT_COLOR,
  SPOT_LIGHT_COLOR,
  BOX_COLOR,
} from "./constants";

export class ThreeRenderer {
  constructor(el) {
    this.el = el;
  }

  init() {
    this.size = 0;
    this.boxes = [];

    this.addScene();
    this.addCamera();
    this.addRenderer();
    this.addAmbientLight();
    this.addControls();
    this.addDirectionalLight();
    this.addFloor();

    this.mount();
    window.addEventListener("resize", this.onResize.bind(this));
  }

  addDirectionalLight() {
    this.directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    this.directionalLight.castShadow = true;
    this.directionalLight.position.set(0, 1, 0);

    this.directionalLight.shadow.camera.far = 1000;
    this.directionalLight.shadow.camera.near = -100;

    this.directionalLight.shadow.camera.left = -40;
    this.directionalLight.shadow.camera.right = 40;
    this.directionalLight.shadow.camera.top = 20;
    this.directionalLight.shadow.camera.bottom = -20;
    this.directionalLight.shadow.camera.zoom = 1;
    this.directionalLight.shadow.camera.needsUpdate = true;

    const targetObject = new THREE.Object3D();
    targetObject.position.set(-50, -82, 40);
    this.directionalLight.target = targetObject;

    this.scene.add(this.directionalLight);
    this.scene.add(this.directionalLight.target);
  }

  addScene() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(BACKGROUND_COLOR);
  }

  addCamera() {
    this.camera = new THREE.PerspectiveCamera(
      20,
      this.getWidth() / this.getHeight(),
      1,
      1000
    );
    this.camera.position.set(-100, 100, -100);
  }

  addControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.04;
  }

  addAmbientLight() {
    const light = new THREE.AmbientLight(AMBIENT_LIGHT_COLOR, 0.5);
    this.scene.add(light);
  }

  addSpotLight() {
    const spotLight = new THREE.SpotLight(SPOT_LIGHT_COLOR);
    spotLight.position.set(100, 250, 150);
    spotLight.castShadow = true;

    this.scene.add(spotLight);
  }

  addRenderer() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.setSize(this.getWidth(), this.getHeight());
  }

  getHeight() {
    return this.el.clientHeight;
  }

  getWidth() {
    return this.el.clientWidth;
  }

  mount() {
    this.el.appendChild(this.renderer.domElement);
  }

  clearScene() {
    this.scene.remove(this.mesh);

    this.boxes = [];
  }

  addBoxes(points) {
    const size = 1;
    const height = 5;
    const material = new THREE.MeshLambertMaterial({
      color: BOX_COLOR,
    });

    const geometry = new THREE.BoxBufferGeometry(size, height, size);
    geometry.translate(0, 2.5, 0);
    this.mesh = this.getBox(geometry, material, this.size * this.size);
    this.scene.add(this.mesh);

    points.forEach(({ x, y }, i) => {
      if (!this.boxes[x]) {
        this.boxes[x] = [];
      }

      const pivot = new THREE.Object3D();
      this.boxes[x][y] = pivot;

      pivot.scale.set(1, 0.001, 1);
      pivot.position.set(x * 0.5, height * 0.5, y * 0.5);

      pivot.updateMatrix();
      this.mesh.setMatrixAt(i, pivot.matrix);
    });

    this.mesh.instanceMatrix.needsUpdate = true;
  }

  updateBoxes(points) {
    const size = Math.sqrt(points.length);

    if (this.size !== size) {
      this.size = size;
      this.clearScene();
      this.addBoxes(points);
    }

    points.forEach(({ x, y, z }, i) => {
      this.boxes[x][y].scale.y = Math.abs(z * 0.1);

      this.boxes[x][y].updateMatrix();
      this.mesh.setMatrixAt(i, this.boxes[x][y].matrix);

      this.mesh.instanceMatrix.needsUpdate = true;
    });
  }

  addFloor() {
    const planeGeometry = new THREE.PlaneBufferGeometry(500, 500);
    const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.35 });

    const floor = new THREE.Mesh(planeGeometry, planeMaterial);

    planeGeometry.rotateX(-Math.PI / 2);

    floor.position.y = 2;
    floor.receiveShadow = true;

    this.scene.add(floor);
  }

  getBox(geometry, material, count) {
    const mesh = new THREE.InstancedMesh(geometry, material, count);
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    return mesh;
  }

  addGrid() {
    const divisions = this.size;
    const gridHelper = new THREE.GridHelper(size, divisions);

    gridHelper.position.set(0, 0, 0);
    gridHelper.material.opacity = 0;
    gridHelper.material.transparent = true;

    this.scene.add(gridHelper);
  }

  render() {
    this.controls.update();

    this.renderer.render(this.scene, this.camera);
  }

  onResize() {
    const width = this.getWidth();
    const height = this.getHeight();

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }
}
