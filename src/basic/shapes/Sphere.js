// const geometry = new THREE.SphereGeometry( .125, 8, 8 );
const geometry = new THREE.SphereGeometry( .2, 8, 8 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const sphere = new THREE.Mesh( geometry, material );
sphere.name = 'sphere'

export default sphere