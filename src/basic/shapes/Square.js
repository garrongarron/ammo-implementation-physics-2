const geometry = new THREE.BoxGeometry( );
const material = new THREE.MeshBasicMaterial( { color: 0x00FFFF } );
// const material = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );

const square = new THREE.Mesh( geometry, material );
square.castShadow = true;
square.receiveShadow = true; 

export default square