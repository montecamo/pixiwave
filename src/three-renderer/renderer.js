/*
  Taken and rewritten from https://codepen.io/neuboi/pen/QWKNdxo
*/

import {
  Color,
  DirectionalLight,
  Object3D,
  PCFSoftShadowMap,
  WebGLRenderer,
  SpotLight,
  AmbientLight,
  PerspectiveCamera,
  Scene,
  Raycaster,
  Vector2,
  BoxBufferGeometry,
  MeshLambertMaterial,
  Mesh,
  ShadowMaterial,
  PlaneBufferGeometry,
  DynamicDrawUsage,
  InstancedMesh,
  GridHelper,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { onSingleClick } from '../utils';

import {
  BACKGROUND_COLOR,
  AMBIENT_LIGHT_COLOR,
  SPOT_LIGHT_COLOR,
  BOX_COLOR,
  ACTIVE_BOX_COLOR,
} from './constants';

export class ThreeRenderer {
  constructor(el) {
    this.el = el;
  }

  init() {
    this.size = 0;
    this.lastInstanceId = undefined;
    this.boxes = [];
    this.color = new Color(BOX_COLOR);
    this.activeColor = new Color(ACTIVE_BOX_COLOR);
    this.backgroundColor = new Color(BACKGROUND_COLOR);

    this.addScene();
    this.addCamera();
    this.addRenderer();
    this.addAmbientLight();
    this.addControls();
    this.addDirectionalLight();
    this.addFloor();
    this.addMouse();
    this.addRaycaster();

    this.mount();
    window.addEventListener('resize', this.onResize.bind(this));
  }

  addDirectionalLight() {
    this.directionalLight = new DirectionalLight(0xffffff, 1);
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
    this.directionalLight.shadow.bias = -0.00009;

    const targetObject = new Object3D();
    targetObject.position.set(-50, -82, 40);
    this.directionalLight.target = targetObject;

    this.scene.add(this.directionalLight);
    this.scene.add(this.directionalLight.target);
  }

  addScene() {
    this.scene = new Scene();
    this.scene.background = this.backgroundColor;
  }

  addCamera() {
    this.camera = new PerspectiveCamera(
      20,
      this.getWidth() / this.getHeight(),
      1,
      1000
    );
    this.camera.position.set(-100, 100, 100);
  }

  addControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.04;
  }

  addAmbientLight() {
    const light = new AmbientLight(AMBIENT_LIGHT_COLOR, 0.5);
    this.scene.add(light);
  }

  addSpotLight() {
    const spotLight = new SpotLight(SPOT_LIGHT_COLOR);
    spotLight.position.set(100, 250, 150);
    spotLight.castShadow = true;

    this.scene.add(spotLight);
  }

  addRenderer() {
    this.renderer = new WebGLRenderer({ antialias: true });
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = PCFSoftShadowMap;
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
    this.scene.remove(this.gridHelper);

    this.boxes = [];
  }

  addMouse() {
    this.mouse = new Vector2(1, 1);

    window.addEventListener('pointermove', this.onMouseMove.bind(this), true);
  }

  onMouseMove(event) {
    event.preventDefault();

    this.mouse.x = (event.clientX / this.getWidth()) * 2 - 1;
    this.mouse.y = -(event.clientY / this.getHeight()) * 2 + 1;
  }

  addRaycaster() {
    this.raycaster = new Raycaster();
  }

  addBoxes(points) {
    const size = 1;
    const height = 5;
    const material = new MeshLambertMaterial();

    const geometry = new BoxBufferGeometry(size, height, size);
    geometry.translate(0, 2.5, 0);
    this.mesh = this.getBox(geometry, material, this.size * this.size);
    this.scene.add(this.mesh);

    points.forEach(({ x, y }, i) => {
      if (!this.boxes[x]) {
        this.boxes[x] = [];
      }

      const pivot = new Object3D();
      this.boxes[x][y] = pivot;

      pivot.position.set(x, height, y);
      pivot.scale.set(1, 20, 1);

      pivot.updateMatrix();
      this.mesh.setMatrixAt(i, pivot.matrix);
      this.mesh.setColorAt(i, this.color);
    });

    this.updateColors(points.map(() => undefined));

    this.mesh.instanceMatrix.needsUpdate = true;
  }

  updateBoxes(points) {
    const size = Math.sqrt(points.length);

    if (this.size !== size) {
      this.size = size;
      this.clearScene();
      this.addGrid();
      this.addBoxes(points);
    }

    points.forEach(({ x, y, z }, i) => {
      this.boxes[x][y].scale.y = z * 0.1 + 0.001;

      this.boxes[x][y].updateMatrix();
      this.mesh.setMatrixAt(i, this.boxes[x][y].matrix);
      this.mesh.setColorAt(i, this.colors[i]);
    });

    this.mesh.instanceMatrix.needsUpdate = true;
    this.mesh.instanceColor.needsUpdate = true;
  }

  updateColors(colors) {
    this.colors = colors.map((color) => {
      if (color) {
        return new Color(color);
      }

      return this.color;
    });
  }

  updateBackgroundColor(color) {
    this.scene.background = new Color(color);
  }

  addFloor() {
    const planeGeometry = new PlaneBufferGeometry(500, 500);
    const planeMaterial = new ShadowMaterial({ opacity: 0.35 });

    const floor = new Mesh(planeGeometry, planeMaterial);

    planeGeometry.rotateX(-Math.PI / 2);

    floor.position.y = 5;
    floor.receiveShadow = true;

    this.scene.add(floor);
  }

  getBox(geometry, material, count) {
    const mesh = new InstancedMesh(geometry, material, count);
    mesh.instanceMatrix.setUsage(DynamicDrawUsage);
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    return mesh;
  }

  addGrid() {
    const divisions = this.size;
    this.gridHelper = new GridHelper(this.size, divisions);

    this.gridHelper.position.set(0, 0, 0);
    this.gridHelper.material.opacity = 0;
    this.gridHelper.material.transparent = true;

    this.scene.add(this.gridHelper);
  }

  clearLastIntersection() {
    document.body.style.cursor = 'default';

    this.mesh.setColorAt(this.lastInstanceId, this.color);

    this.lastInstanceId = undefined;

    this.mesh.instanceColor.needsUpdate = true;
  }

  handleIntersection() {
    this.raycaster.setFromCamera(this.mouse, this.camera);

    const intersection = this.raycaster.intersectObject(this.mesh);

    this.clearLastIntersection();

    if (intersection.length > 0) {
      const instanceId = intersection[0].instanceId;

      this.mesh.setColorAt(instanceId, this.activeColor);
      this.lastInstanceId = instanceId;
      this.mesh.instanceColor.needsUpdate = true;

      document.body.style.cursor = 'pointer';
    }
  }

  getHoveredBoxCoordinates() {
    if (this.lastInstanceId !== undefined) {
      return {
        x: this.lastInstanceId % this.size,
        y: Math.floor(this.lastInstanceId / this.size),
      };
    }

    return undefined;
  }

  onClick(cb) {
    onSingleClick(() => {
      cb(this.getHoveredBoxCoordinates());
    });
  }

  getBackgroundColor() {
    return BACKGROUND_COLOR;
  }

  render() {
    this.controls.update();

    this.handleIntersection();

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
