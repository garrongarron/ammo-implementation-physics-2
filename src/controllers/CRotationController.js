
class CRotationController {
    constructor(peerId) {
        this.peerId = peerId
        this.cRotation = null
        this.speed = .005 //0.05
    }
    init(characterController) {
        this.cRotation = characterController.state.cRotation
        this.rotation = characterController.character.rotation
    }
    tick() {
        const lerp = 0.2
        this.rotation.x = THREE.MathUtils.lerp(this.rotation.x, this.cRotation.x, lerp) || this.rotation.x
        this.rotation.y = THREE.MathUtils.lerp(this.rotation.y, this.cRotation.y, lerp) || this.rotation.y;
        this.rotation.z = THREE.MathUtils.lerp(this.rotation.z, this.cRotation.z, lerp) || this.rotation.z
    }
}

const cRotationController = new CRotationController()

export default cRotationController

export { CRotationController }