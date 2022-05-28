import broadcaster from "../services/Broadcaster.js"
import nick from "../services/nick.js"

class MouseRotationController {
    constructor(peerId) {
        this.peerId = peerId
        this.rotation = null
        this.prevRotation = null
        this.speed = .005
        this.camera = null
    }
    init(characterController) {
        this.state = characterController.state
        if (!this.state.hasOwnProperty('cRotation')) {
            this.state.cRotation = { x: 0, y: 0, z: 0 }
        }
    }
    setCamera(camera) {
        this.camera = camera
    }
    tick() {
        this.state.cRotation.y = -this.state.mouse.acumulated.x * this.speed
    }
}

const mouseRotationController = new MouseRotationController()

export default mouseRotationController

export { MouseRotationController }