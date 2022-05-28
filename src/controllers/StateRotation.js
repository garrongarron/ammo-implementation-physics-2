class StateRotation {
    constructor() {
        this.sRotation = null
        this.cRotation = null
        this.speed = .05
    }
    init(characterController) {
        this.sRotation = characterController.state.rotation
        this.cRotation = characterController.character.rotation
    }
    tick() {
        if (this.sRotation.y == 1) this.cRotation.y += this.speed
        if (this.sRotation.y == -1) this.cRotation.y -= this.speed
    }
}

const stateRotation = new StateRotation()

export default stateRotation

export { StateRotation }