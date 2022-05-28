import { getDelta } from "../basic/Clock.js"
import terrainSystem from "../basic/terrain/TerrainSystem.js"
import { mode } from "./ModeController.js"

class FallingController {
    constructor(peerId) {
        this.peerId = peerId
        this.character = null
        this.state = null
        this.inProgress = false
        this.speed = 1 //2.5
        this.y = 0
    }

    init(characterController) {
        this.character = characterController.character
        this.state = characterController.state
        setTimeout(() => {
            this.y = characterController.controller['CameraController'].y
            console.log(this.y)
        }, 1000);
    }

    tick() {
        if (this.inProgress == false && this.state.mode == mode.FALLING) {
            this.character.position.y = 200
            this.y = 220
            this.inProgress = true
        }
        if (this.inProgress == true && this.state.mode == mode.FALLING) {
            this.character.position.y -= .25
            if (this.character.position.y < terrainSystem.customNoiseGenerator(this.character.position.x, -this.character.position.z) + 2) {
                this.inProgress = false
                this.state.mode = mode.IDLE
            }
        }
    }
}

const fallingController = new FallingController()

export default fallingController

export { FallingController }