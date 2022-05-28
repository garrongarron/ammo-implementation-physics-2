import Ammo from "./Ammo.js";
import gravityConstant from "./GravityContrant.js";

// Physics variables
let physicsWorld
let transformAux1
function initPhysics() {

    // Physics configuration
    // const collisionConfiguration = new Ammo.btSoftBodyRigidBodyCollisionConfiguration();
    const collisionConfiguration    = new Ammo.btDefaultCollisionConfiguration();                               
    const dispatcher                = new Ammo.btCollisionDispatcher(collisionConfiguration);
    const broadphase                = new Ammo.btDbvtBroadphase();
    const solver                    = new Ammo.btSequentialImpulseConstraintSolver();
    // const softBodySolver = new Ammo.btDefaultSoftBodySolver();
    
    // physicsWorld = new Ammo.btSoftRigidDynamicsWorld(dispatcher, broadphase, solver, collisionConfiguration, softBodySolver);
    physicsWorld = new Ammo.btDiscreteDynamicsWorld(dispatcher, broadphase, solver, collisionConfiguration);
    physicsWorld.setGravity(new Ammo.btVector3(0, gravityConstant, 0));
    // physicsWorld.getWorldInfo().set_m_gravity(new Ammo.btVector3(0, gravityConstant, 0));

    transformAux1 = new Ammo.btTransform();

}

export default initPhysics

export { physicsWorld, transformAux1 }