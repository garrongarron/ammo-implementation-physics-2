// import { mode } from "./ModeController.js"

import camera from "../basic/Camera.js"

class CameraController {
    constructor() {
        this.character = null
        // this.radio = 1.75
        // this.height = 1.5
        // this.heightTarget = 1.2
        // this.angle = 5 * Math.PI / 180
        // this.angleSensibility = 0.1
        // this.ahead = 20
        this.camera = null
        this.state = null
        // this.y = 0
    }
    init(characterController) {
        this.character = characterController.character
        this.state = characterController.state
        this.camera = camera
    }

    tick() {
        // this.camera.lookAt(this.character.position)
        this.camera.lookAt(0,-2,0)
    }
}

const cameraController = new CameraController()

export default cameraController

export { CameraController }