import Ammo from './Ammo.js';
import createRigidBody from './CreateRigidBody.js';

const margin = 0.05;
function createBall( mass, pos, quat, material) {
    
    const threeObject = new THREE.Mesh( new THREE.SphereGeometry( .25, 8, 8 ), material);
    const shape = new Ammo.btSphereShape(.25);
    shape.setMargin(.05);

    createRigidBody(threeObject, shape, mass, pos, quat);
    
    return threeObject;
}
export default createBall