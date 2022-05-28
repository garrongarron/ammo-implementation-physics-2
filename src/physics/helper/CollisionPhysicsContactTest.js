import Ammo, { ammoPromise } from "../Ammo.js";
import { physicsWorld } from "../InitPhysics.js";


/**
 * Contact Manifold Check
 */

class CollisionPhysicsContactTest {
    constructor(){
        this.cbContactResult = null;
    }
    heckContact(ball) {
        physicsWorld.contactTest(ball.userData.physicsBody, this.cbContactResult);
    }

    setupContactResultCallback() {
        ammoPromise.then(() => {
            this.cbContactResult = new Ammo.ConcreteContactResultCallback();

            this.cbContactResult.addSingleResult = function (cp, colObj0Wrap, partId0, index0, colObj1Wrap, partId1, index1) {

                let contactPoint = Ammo.wrapPointer(cp, Ammo.btManifoldPoint);

                const distance = contactPoint.getDistance();

                if (distance > 0) return;

                let colWrapper0 = Ammo.wrapPointer(colObj0Wrap, Ammo.btCollisionObjectWrapper);
                let rb0 = Ammo.castObject(colWrapper0.getCollisionObject(), Ammo.btRigidBody);

                let colWrapper1 = Ammo.wrapPointer(colObj1Wrap, Ammo.btCollisionObjectWrapper);
                let rb1 = Ammo.castObject(colWrapper1.getCollisionObject(), Ammo.btRigidBody);

                let threeObject0 = rb0.threeObject;
                let threeObject1 = rb1.threeObject;

                let tag, localPos, worldPos

                if (threeObject0.userData.tag != "ball") {

                    tag = threeObject0.userData.tag;
                    localPos = contactPoint.get_m_localPointA();
                    worldPos = contactPoint.get_m_positionWorldOnA();

                } else {

                    tag = threeObject1.userData.tag;
                    localPos = contactPoint.get_m_localPointB();
                    worldPos = contactPoint.get_m_positionWorldOnB();

                }

                let localPosDisplay = { x: localPos.x(), y: localPos.y(), z: localPos.z() };
                let worldPosDisplay = { x: worldPos.x(), y: worldPos.y(), z: worldPos.z() };

                console.log({ tag, localPosDisplay, worldPosDisplay });

            }
        });
    }
}

const collisionPhysicsContactTest = new CollisionPhysicsContactTest()

export default collisionPhysicsContactTest

export { CollisionPhysicsContactTest }