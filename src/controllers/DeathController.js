import spawner from "../scenes/files-scene4/Spawner.js"
import broadcaster from "../services/Broadcaster.js"
import { mode } from "./ModeController.js"

class DeathController {
    constructor(peerId) {
        this.peerId = peerId
        this.die = false
        this.state = {}
    }
    init(characterController) {
        this.state = characterController.state
        this.character = characterController.character
    }
    death() {
        const cooldown = Math.round(this.character.animations[11].duration * 1000) - 500 //100
        console.log(cooldown)
        setTimeout(() => {
            spawner.getCustomController(this.peerId).animationController.transitionHandler.stop()
            spawner.getCustomController(this.peerId).stop()
        }, cooldown);
        broadcaster.send({die: this.peerId})
    }
    tick() {
        if (this.state.mode == mode.DEATH && !this.die) {
            this.die = true
            this.death()
        }
    }
}

const deathController = new DeathController()

export default deathController

export { DeathController }