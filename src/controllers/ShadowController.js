class ShadowController {
    constructor() {
        this.position = null
        this.directionalLight = null
        this.vector = null
    }
    init(characterController) {
        this.position = characterController.character.position
        this.directionalLight.target = characterController.character
    }
    setDirectionalLight(directionalLight) {
        this.directionalLight = directionalLight
    }
    setVector(vector) {
        this.vector = vector
    }
    tick() {
        this.directionalLight.position.copy(this.position.clone().add(this.vector))
    }
}

const shadowController = new ShadowController()

export default shadowController

export { ShadowController }