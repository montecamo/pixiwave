import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export class ThreeRenderer {
  init() {
    this.backgroundColor = 0xed1a21;
    this.ambientLightColor = 0xffffff;
    this.spotLightColor = 0xffffff;
    this.boxColor = 0x1a63ed;
    this.angle = 0;
    this.gridSize = 100;
    this.col = this.gridSize;
    this.row = this.gridSize;
    this.velocity = 0.1;
    this.boxes = [];

    this.amplitude = -1;
    this.frequency = 0;
    this.waveLength = 242;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(this.backgroundColor);

    this.camera = new THREE.PerspectiveCamera(
      20,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    this.camera.position.set(-100, 100, -100);

    this.addRenderer();

    document.body.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.04;

    this.addAmbientLight();

    this.addDirectionalLight();

    this.addFloor();

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

  addAmbientLight() {
    const light = new THREE.AmbientLight(this.ambientLightColor, 0.5);
    this.scene.add(light);
  }

  addSpotLight() {
    this.spotLight = new THREE.SpotLight(this.spotLightColor);
    this.spotLight.position.set(100, 250, 150);
    this.spotLight.castShadow = true;
    this.scene.add(this.spotLight);
  }

  addRenderer() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  clearScene() {
    this.scene.remove(this.mesh);

    this.boxes = [];
  }

  addBoxes(points) {
    const size = 1;
    const height = 5;
    const material = new THREE.MeshLambertMaterial({
      color: this.boxColor,
    });

    const geometry = new THREE.BoxBufferGeometry(size, height, size);
    geometry.translate(0, 2.5, 0);
    this.mesh = this.getBox(geometry, material, this.row * this.col);
    this.scene.add(this.mesh);

    points.forEach(({ x, y }, i) => {
      if (!this.boxes[x]) {
        this.boxes[x] = [];
      }

      const pivot = new THREE.Object3D();
      this.boxes[x][y] = pivot;

      pivot.scale.set(1, 0.001, 1);
      pivot.position.set(
        x - this.gridSize * 0.5,
        height * 0.5,
        y - this.gridSize * 0.5
      );

      pivot.updateMatrix();
      this.mesh.setMatrixAt(i, pivot.matrix);
    });

    this.mesh.instanceMatrix.needsUpdate = true;
  }

  updateCells(points) {
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

    this.floor = new THREE.Mesh(planeGeometry, planeMaterial);

    planeGeometry.rotateX(-Math.PI / 2);

    this.floor.position.y = 2;
    this.floor.receiveShadow = true;

    this.scene.add(this.floor);
  }

  getBox(geometry, material, count) {
    const mesh = new THREE.InstancedMesh(geometry, material, count);
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    return mesh;
  }

  addGrid() {
    const size = this.col;
    const divisions = size;
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
    const ww = window.innerWidth;
    const wh = window.innerHeight;

    this.camera.aspect = ww / wh;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(ww, wh);
  }
}
