class RemoteController {
    constructor(peerId) {
        this.peerId = peerId
        this.state = {}
    }
    init(characterController) {
        this.state = characterController.state
    }

    setTranslation(translation) {
        this.state.translation = { ...this.state.translation, ...translation }
    }

    setCRotation(cRotation) {
        this.state.cRotation.x = cRotation.x || this.state.cRotation.x
        this.state.cRotation.y = cRotation.y || this.state.cRotation.y
        this.state.cRotation.z = cRotation.z || this.state.cRotation.z
    }

    setAngle(angle) {
        this.state.angle = { ...this.state.angle, ...angle }
    }

    tick() {

    }
}

const remoteController = new RemoteController()

export default remoteController

export { RemoteController }