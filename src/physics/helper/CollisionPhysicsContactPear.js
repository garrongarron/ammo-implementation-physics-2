import Ammo from "../Ammo.js";
import { physicsWorld } from "../InitPhysics.js";


/**
 * Contact Manifold Check
 */

class CollisionPhysicsContactPear {
    constructor(){
        this.cbContactPairResult = null;
    }

    jump(objectA, objectB){
        this.cbContactPairResult.hasContact = false;
      
        physicsWorld.contactPairTest(objectA.userData.physicsBody, objectB.userData.physicsBody, this.cbContactPairResult);
      
        if( !this.cbContactPairResult.hasContact ) return;
      
        let jumpImpulse = new Ammo.btVector3( 0, 15, 0 );
      
        let physicsBody = objectA.userData.physicsBody;
        physicsBody.setLinearVelocity( jumpImpulse );
      
      }

    setupContactPairResultCallback(){

        this.cbContactPairResult = new Ammo.ConcreteContactResultCallback();
    
        this.cbContactPairResult.hasContact = false;
    
        this.cbContactPairResult.addSingleResult = function(cp, colObj0Wrap, partId0, index0, colObj1Wrap, partId1, index1){
    
            let contactPoint = Ammo.wrapPointer( cp, Ammo.btManifoldPoint );
    
            const distance = contactPoint.getDistance();
    
            if( distance > 0 ) return;
    
            this.hasContact = true;
    
        }
    
    }
}

const collisionPhysicsContactPear = new CollisionPhysicsContactPear()

export default collisionPhysicsContactPear

export { CollisionPhysicsContactPear }