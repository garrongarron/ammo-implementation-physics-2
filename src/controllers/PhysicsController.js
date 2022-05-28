import { getDelta } from "../basic/Clock.js"
import eventBus from "../basic/EventBus.js"
import { ammoPromise } from "../physics/Ammo.js"
import initPhysics from "../physics/InitPhysics.js"
import updatePhysics from "../physics/UpdatePhysics.js"

class PhysicsController {
    constructor() {
        this.state = { physicsReady : false }
    }
    init(characterController) {
        this.state = characterController.state
        if (!this.state?.physicsReady) this.state.physicsReady = false
        ammoPromise.then(() => {
            initPhysics()
            this.state.physicsReady = true
            eventBus.dispatch('physicsReady', true)
        })
    }
    tick() {
        if (this.state.physicsReady) {
            updatePhysics(getDelta());
        }
    }
}

const physicsController = new PhysicsController()

export default physicsController

export { PhysicsController }
