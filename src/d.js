/* eslint-disable */
import * as THREE from 'three';

export class Sphere {
  constructor(section) {
    this.scene = new THREE.Scene();

    var textureLoader = new THREE.TextureLoader();
    textureLoader.crossOrigin = true;
    textureLoader.load('https://s3-us-west-2.amazonaws.com/s.cdpn.io/53148/4268-bump.jpg', (texture) => {

      this.setCamera();

      this.setMesh(texture);

      this.addLight();

      this.setRenderer(section);

      this.animate();

      document.addEventListener("keydown", this.rotateByKeyEvent, false);
    });
  }

  setCamera = () => {
    this.camera = new THREE.PerspectiveCamera(10, 900 / 500, 0.0001, 10000);
    //this.camera.position.z = 150;

    this.cubeCamera = new THREE.CubeCamera( 1, 100000, 128 );
  };

  setMesh = (texture) => {
    var color = new THREE.Color( "#0fffff" );

    // apply the texture as a bump map
    //this.material = new THREE.MeshPhongMaterial( {color: color.getHex(), bumpMap: texture} );
    this.material = new THREE.MeshLambertMaterial( { color: 0xffffff, envMap: this.cubeCamera.renderTarget } );
    this.geometry = new THREE.SphereGeometry( 7, 32, 32 );

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.mesh);

    //this.mesh.setVisible( false );
    this.cubeCamera.position.copy( this.mesh.position );
  };

  addLight = () => {
    var light = new THREE.DirectionalLight(0xfFFFff, 0.5);
    light.position.set(1000, 0, 2500);

    this.scene.add(light);
  };

  setRenderer = (container) => {
    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setSize(900, 500);

    this.cubeCamera.update( this.renderer, this.scene );

    //this.mesh.setVisible(true);
    container.appendChild(this.renderer.domElement);
  };

  animate = () => {
    requestAnimationFrame(this.animate);
    this.renderer.render(this.scene, this.camera);
  };

  rotateByKeyEvent = (e) => {
    var keyCode = e.keyCode;

    if(keyCode===37) {
      this.mesh.rotation.y += 0.1;
    } else if (keyCode===39) {
      this.mesh.rotation.y -= 0.1;
    } else if (keyCode===38) {
      this.mesh.rotation.x += 0.1;
    } else if (keyCode===40) {
      this.mesh.rotation.x -= 0.1;
    }
  };
}
