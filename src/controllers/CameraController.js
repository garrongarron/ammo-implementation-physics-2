import mouse from "../basic/Mouse.js"
import { mode } from "./ModeController.js"

class CameraController {
    constructor() {
        this.character = null
        this.radio = 1.75
        this.height = 1.5
        this.heightTarget = 1.2
        this.angle = 5 * Math.PI / 180
        this.angleSensibility = 0.1
        this.ahead = 20
        this.camera = null
        this.state = null
        this.y = 0
    }
    init(characterController) {
        this.character = characterController.character
        this.state = characterController.state
    }
    setCamera(camera) {
        this.camera = camera
    }
    tick() {

        if (this.state.angle.y == 1) this.angle -= this.angleSensibility
        if (this.state.angle.y == -1) this.angle += this.angleSensibility
        this.y = THREE.MathUtils.lerp(this.y, mouse.acumulated.y, 0.3)

        const rotation = this.character.rotation
        const position = this.character.position.clone()
        const radio = this.radio * (this.state.mode == mode.FALLING ? 2 : 1)
        this.camera.position.set(
            position.x - Math.sin(rotation.y + this.angle) * radio,
            position.y + this.height + .25 + this.y / 500,
            position.z - Math.cos(rotation.y + this.angle) * radio,
        )
        if (this.state.mode != mode.FALLING) {
            this.camera.position.y = THREE.MathUtils.clamp(this.camera.position.y, position.y + .5, position.y + 5)
        }

        const gap = rotation.y - 60 * 180 / Math.PI
        this.camera.lookAt(
            position.x + Math.sin(gap) * .5 /* this.ahead */,
            position.y + 1.5 - 0 * this.y / 50,
            position.z + Math.cos(gap) * .5 /* this.ahead **/
        )
        // console.log( Math.sin(rotation.y) * this.radio)
    }
}

const cameraController = new CameraController()

export default cameraController

export { CameraController }