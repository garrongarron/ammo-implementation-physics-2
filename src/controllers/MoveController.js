import { getDelta } from "../basic/Clock.js"
import { mode } from "./ModeController.js"

class MoveController {
    constructor() {
        this.state = null
        this.character = null
        this.speed = 12//2.5
    }
    init(characterController) {
        this.state = characterController.state
        this.character = characterController.character
    }
    tick() {
        const position = this.character.position
        const rotation = this.character.rotation
        let speed = this.speed * getDelta()
        if (this.state.mode == mode.FALLING)  {
            speed = 30 * getDelta()
        }
        if (this.state.translation.y == 1) {
            position.x += Math.sin(rotation.y) * speed
            position.z += Math.cos(rotation.y) * speed
        }
        if (this.state.translation.y == -1) {
            position.x -= Math.sin(rotation.y) * speed
            position.z -= Math.cos(rotation.y) * speed
        }
        if (this.state.translation.x == 1) {
            position.x += Math.sin(rotation.y + Math.PI / 2) * speed
            position.z += Math.cos(rotation.y + Math.PI / 2) * speed
        }
        if (this.state.translation.x == -1) {
            position.x += Math.sin(rotation.y - Math.PI / 2) * speed
            position.z += Math.cos(rotation.y - Math.PI / 2) * speed
        }
    }
}

const moveController = new MoveController()

export default moveController

export { MoveController }