const geometry = new THREE.SphereGeometry( .1, 8, 8 );
const material = new THREE.MeshBasicMaterial( { color: 0x0000ff } );
const bullet = new THREE.Mesh( geometry, material );
bullet.name = 'bullet'

export default bullet