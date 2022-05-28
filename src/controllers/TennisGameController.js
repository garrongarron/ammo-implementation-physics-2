import eventBus from "../basic/EventBus.js";
import keyCode from "../basic/KeyCode.js";
import { ammoPromise } from "../physics/Ammo.js";
import spawner from "../scenes/files/Spawner.js"
import nick from "../services/nick.js"

class TennisGameController {
    constructor() {
        this.ball = null
        this.ballBox = new THREE.Box3();
        this.ground = new THREE.Box3();
        this.ground.setFromCenterAndSize(new THREE.Vector3(), new THREE.Vector3(11, .2, 24))
        this.prevY = null
        this.goingUp = false
        this.queue = []
    }
    init() {
        ammoPromise.then(() => {
            this.ball = spawner.getCustomController(nick).physicsController.ball
        })
        eventBus.subscribe('keyListener', (params) => {
            const [code, flag, keys] = params
            if (keyCode.KEY_P == code) {
                const body = spawner.getCustomController(nick).physicsController.ball.userData.physicsBody
                let worldTrans = body.getWorldTransform();
                worldTrans.setOrigin(new Ammo.btVector3(0, 5, 0));
                body.setLinearVelocity(new Ammo.btVector3(0, 0, -1));
                body.setWorldTransform(worldTrans);
                body.clearForces();
            }
        })
    }
    hitBall() {
        const body = spawner.getCustomController(nick).physicsController.ball.userData.physicsBody
        const ball = spawner.getCustomController(nick).physicsController.ball
        const force = .8
        let z = -1 * THREE.MathUtils.clamp(ball.position.z, -force, force)
        body.setLinearVelocity(new Ammo.btVector3(0, .5, z));
        body.applyCentralImpulse(new Ammo.btVector3((Math.random() - 0.5) * .1, .5, z));
    }
    up() {
        if (this.ball.position.z < 0) {
            this.hitBall()
        }
        console.log(this.ball.position.z > 0 ? "RED" : "GREEN", this.ball.position.z);
        this.queue.unshift(this.ball.position.z > 0 ? "RED" : "GREEN")
        if (this.queue[0] == this.queue[1]) {
            console.error("LOOSE", this.queue[0]);
        }
        this.queue.length = 2
    }
    tick() {
        if (this.ball == null) return
        this.ballBox.setFromObject(this.ball)
        if (this.ground.intersectsBox(this.ballBox)) {
            if (this.prevY < this.ball.position.y && !this.goingUp) {
                this.goingUp = true
                this.up()
            }
            if (this.prevY > this.ball.position.y && this.goingUp) {
                this.goingUp = false
            }
            this.prevY = this.ball.position.y
        }

    }
}

const tennisGameController = new TennisGameController()

export default tennisGameController

export { TennisGameController }