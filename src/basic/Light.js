import scene from "./Scene.js";

const light = new THREE.AmbientLight( 0x202020 ); // soft white light

const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.3 );
light.add( directionalLight );

directionalLight.position.set(0,10,5)
directionalLight.castShadow = true; // default false


//Set up shadow properties for the light
directionalLight.shadow.mapSize.width = 512; // default
directionalLight.shadow.mapSize.height = 512; // default
directionalLight.shadow.camera.near = 0.5; // default
directionalLight.shadow.camera.far = 20; // default

const size = 25
directionalLight.shadow.camera.left = -size; // default
directionalLight.shadow.camera.bottom = -size; // default
directionalLight.shadow.camera.top = size; // default
directionalLight.shadow.camera.right = size; // default

const targetObject = new THREE.Object3D();
scene.add(targetObject);

targetObject.position.set(0,0,0)

directionalLight.target = targetObject;

// const helper = new THREE.CameraHelper( directionalLight.shadow.camera );
// scene.add( helper );

export default light