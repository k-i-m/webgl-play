/* eslint-disable */
import * as THREE from 'three';
import ColladaLoader from 'three-collada-loader';

export class Elf {
  constructor(section) {
    this.width = 900;
    this.height = 700;

    this.THETA = 0;
    this.PHI = 0;
    this.dX = 0;
    this.dY = 0;
    this.AMORTIZATION = 0.95;
    this.drag = false;

    this.scene = new THREE.Scene();

    this.setCamera();

    this.setMesh();

    this.addLight();

    this.setRenderer(section);

    this.animate();

    this.renderer.domElement.addEventListener("mousedown", this.mouseDown, false);
    this.renderer.domElement.addEventListener("mouseup", this.mouseUp, false);
    this.renderer.domElement.addEventListener("mouseout", this.mouseUp, false);
    this.renderer.domElement.addEventListener("mousemove", this.mouseMove, false);
  }

  setCamera = () => {
    this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.1, 2000);
    this.camera.position.set( 8, 10, 8 );
    this.camera.lookAt( new THREE.Vector3( 0, 3, 0 ) );
  };

  setMesh = () => {
    var loader = new ColladaLoader();
    loader.load( './static/elf.dae', ( collada ) => {
      this.elf = collada.scene;
      this.scene.add(this.elf);
    } );

  };

  addLight = () => {
    var ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4 );
    this.scene.add( ambientLight );

    var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.8 );
    directionalLight.position.set( 1, 1, 0 ).normalize();
    this.scene.add( directionalLight );
  };

  setRenderer = (container) => {
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(this.width, this.height);

    container.appendChild(this.renderer.domElement);
  };

  rotateX = (angle) => {
    if (this.elf) {
      this.elf.rotation.x = angle;
    }
  };

  rotateY = (angle) => {
    if (this.elf) {
      this.elf.rotation.y = angle;
    }
  };

  animate = () => {
    requestAnimationFrame(this.animate);

    if (!this.drag) {
      this.dX = e(this.dX) ? 0 : this.dX * this.AMORTIZATION;
      this.dY = e(this.dY) ? 0 : this.dY * this.AMORTIZATION;

      this.THETA+=this.dX;
      this.PHI+=this.dY;
    }

    this.rotateY(this.THETA);
    this.rotateX(this.PHI);

    this.renderer.render(this.scene, this.camera);
  };

  mouseDown = (e) => {
    this.drag = true;
    this.old_x = e.pageX;
    this.old_y = e.pageY;

    e.preventDefault();
    return false;
  };

  mouseUp = () => {
    this.drag = false;
  };

  mouseMove = (e) => {
    e.preventDefault();

    if (!this.drag) return false;

    this.dX = (e.pageX - this.old_x)*2*Math.PI/this.width;
    this.dY = (e.pageY - this.old_y)*2*Math.PI/this.height;

    this.THETA+= this.dX;
    this.PHI+=this.dY;

    this.old_x = e.pageX;
    this.old_y = e.pageY;
  };
}

function e(value) {
  return (value > 0 && value < 0.001) || (value < 0 && value > -0.001);
}