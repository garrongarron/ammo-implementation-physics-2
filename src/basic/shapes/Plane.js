const geometry = new THREE.PlaneGeometry( 1, 1 );
// const material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.FrontSide} );
// const material = new THREE.MeshPhongMaterial( {color: 0x279227, side: THREE.FrontSide} );
const material = new THREE.MeshBasicMaterial( {color: 0x00ff00, side: THREE.FrontSide} );


const plane = new THREE.Mesh( geometry, material );
plane.transparent = true
plane.rotation.x -= Math.PI *.5 
// plane.castShadow = true;
// plane.receiveShadow = true; 
// plane.position.y = -10;

export default plane