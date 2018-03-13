/* eslint-disable */
import * as THREE from 'three';
import OrbitControlsC from 'three-orbit-controls';

export class Cube {
  constructor(section) {
    this.width = 900;
    this.height = 500;

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
    this.camera = new THREE.PerspectiveCamera(75, this.width / this.height, 0.0001, 1000);
    this.camera.position.x = 20;
    this.camera.position.y = 20;
    this.camera.position.z = 50;
    this.camera.rotation.y = 0.1;
    this.camera.rotation.x = -0.1;
  };

  setMesh = () => {
    var color = new THREE.Color( "#0fffff" );
    //this.material = new THREE.MeshBasicMaterial( {color: color.getHex(), wireframe: true} );
    this.material = new THREE.MeshNormalMaterial({wireframe: false});
    //this.material = new THREE.MeshPhongMaterial( {color: color.getHex()} ); //MeshLambertMaterial

    this.geometry = new THREE.BoxGeometry(20, 20, 20);

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);
  };

  addLight = () => {
    var light = new THREE.PointLight( 0xFFFFff );
    light.position.set( 10, 10, 25 );
    this.scene.add( light );

    light = new THREE.PointLight( 0xFFFFff );
    light.position.set( -100, 10, 25 );
    this.scene.add( light );

    light = new THREE.PointLight( 0xFFFFff );
    light.position.set( 100, 10, 25 );
    this.scene.add( light );
  };

  setRenderer = (container) => {
    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setSize(this.width, this.height);

    container.appendChild(this.renderer.domElement);
  };

  rotateX = (angle) => {
    this.mesh.rotation.x = angle;
  };

  rotateY = (angle) => {
    this.mesh.rotation.y = angle;
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