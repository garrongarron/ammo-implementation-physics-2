import eventBus from "./basic/EventBus.js";
import keyCode from "./basic/KeyCode.js";
import scene from "./basic/Scene.js";
import BallCreator from "./physics/helper/BallCreator.js";
import BoxCreator from "./physics/helper/BoxCreator.js";
import collisionPhysicsContactPear from "./physics/helper/CollisionPhysicsContactPear.js";
import collisionPhysicsContactTest from "./physics/helper/CollisionPhysicsContactTest.js";



class GameController {
    constructor() {
        this.state = null
    }
    init(characterController) {
        eventBus.subscribe('physicsReady', ()=>{
            const ball = new BallCreator({isRigidBody: true})
            let obj = ball.createBall()
            scene.add(obj)
            const ground = new BoxCreator({isRigidBody: true, isKinematic: true, autoStatic: false})
            ground.params.pos.x = 0
            ground.params.pos.y = -2
            ground.params.scale.x = 4
            ground.params.scale.z = 4
            let obj2 = ground.createBox()
            scene.add(obj2)
            collisionPhysicsContactTest.setupContactResultCallback()
            collisionPhysicsContactPear.setupContactPairResultCallback()
            eventBus.subscribe('keyListener', (params) => {
                const [keyCode_, flag, keys] = params
                if(keyCode_ == keyCode.ENTER && flag) {
                    console.log('enter')
                    collisionPhysicsContactTest.heckContact(obj)
                }
                if(keyCode_ == keyCode.SPACE && flag) {
                    console.log('space', 'jump')
                    collisionPhysicsContactPear.jump(obj, obj2)
                }
            })
        })
    }
    tick() {
        
    }
}

const gameController = new GameController()

export default gameController

export { GameController }