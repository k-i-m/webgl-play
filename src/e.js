/* eslint-disable */
import * as THREE from 'three';
import OrbitControlsC from 'three-orbit-controls';

const OrbitControls = OrbitControlsC(THREE);

export class Cube {
  constructor(section) {
    this.scene = new THREE.Scene();

    this.setCamera();

    this.setMesh();

    this.addLight();

    this.setRenderer(section);

    this.animate();
  }

  setCamera = () => {
    this.camera = new THREE.PerspectiveCamera(100, 900 / 500, 0.0001, 1000);
    this.camera.position.z = 30;

    this.controls = new OrbitControls( this.camera );
    this.controls.autoRotate = true;
  };

  setMesh = () => {
    var color = new THREE.Color( "#0fffff" );
    //this.material = new THREE.MeshBasicMaterial( {color: color.getHex(), wireframe: true} );
    this.material = new THREE.MeshNormalMaterial();
    // this.material = new THREE.MeshPhongMaterial( {color: color.getHex()} ); //MeshLambertMaterial

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
    this.renderer.setSize(900, 500);

    container.appendChild(this.renderer.domElement);
  };

  animate = () => {
    requestAnimationFrame(this.animate);

    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  };
}
