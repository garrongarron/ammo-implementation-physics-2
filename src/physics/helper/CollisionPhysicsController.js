import Ammo from "../Ammo.js";
import { physicsWorld } from "../InitPhysics.js";


/**
 * Contact Manifold Check
 */

class CollisionPhysicsController {
    constructor() {
        this.state = { physicsReady : false }
    }
    init(characterController) {
        this.state = characterController.state
        if (!this.state?.physicsReady) this.state.physicsReady = false
    }
    tick() {
        if (!this.state.physicsReady) return
        let dispatcher = physicsWorld.getDispatcher();
        let numManifolds = dispatcher.getNumManifolds();

        for (let i = 0; i < numManifolds; i++) {

            let contactManifold = dispatcher.getManifoldByIndexInternal(i);

            let rb0 = Ammo.castObject(contactManifold.getBody0(), Ammo.btRigidBody);
            let rb1 = Ammo.castObject(contactManifold.getBody1(), Ammo.btRigidBody);
            let threeObject0 = rb0.threeObject;
            let threeObject1 = rb1.threeObject;
            if (!threeObject0 && !threeObject1) continue;
            let userData0 = threeObject0 ? threeObject0.userData : null;
            let userData1 = threeObject1 ? threeObject1.userData : null;
            let tag0 = userData0 ? userData0.tag : "none";
            let tag1 = userData1 ? userData1.tag : "none";

            let numContacts = contactManifold.getNumContacts();

            for (let j = 0; j < numContacts; j++) {

                let contactPoint = contactManifold.getContactPoint(j);
                let distance = contactPoint.getDistance();

                if (distance > 0.0) continue;

                let velocity0 = rb0.getLinearVelocity();
                let velocity1 = rb1.getLinearVelocity();
                let worldPos0 = contactPoint.get_m_positionWorldOnA();
                let worldPos1 = contactPoint.get_m_positionWorldOnB();
                let localPos0 = contactPoint.get_m_localPointA();
                let localPos1 = contactPoint.get_m_localPointB();

                console.log({
                    manifoldIndex: i,
                    contactIndex: j,
                    distance: distance,
                    object0: {
                        tag: tag0,
                        velocity: { x: velocity0.x(), y: velocity0.y(), z: velocity0.z() },
                        worldPos: { x: worldPos0.x(), y: worldPos0.y(), z: worldPos0.z() },
                        localPos: { x: localPos0.x(), y: localPos0.y(), z: localPos0.z() }
                    },
                    object1: {
                        tag: tag1,
                        velocity: { x: velocity1.x(), y: velocity1.y(), z: velocity1.z() },
                        worldPos: { x: worldPos1.x(), y: worldPos1.y(), z: worldPos1.z() },
                        localPos: { x: localPos1.x(), y: localPos1.y(), z: localPos1.z() }
                    }
                });


            }

        }
    }
}

const collisionPhysicsController = new CollisionPhysicsController()

export default collisionPhysicsController

export { CollisionPhysicsController }