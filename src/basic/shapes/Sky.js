const geometry = new THREE.SphereGeometry( 500, 8, 8 );
const material = new THREE.MeshBasicMaterial( { color: 0x87CEEB , side: THREE.BackSide} );
material.opacity = 0
material.transparent = true
const sky = new THREE.Mesh( geometry, material );
sky.name = 'sky'
sky.layers.enable( 1 );
export default sky