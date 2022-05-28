class HittableController {
    constructor(peerId) {
        this.peerId = peerId
        this.state = null
        this.character = null
        this.speed = 1.8
        this.bone = new THREE.Group()
        this.hitableObject = new THREE.Group()
    }
    init(characterController) {
        this.state = characterController.state
        this.character = characterController.character
        this.hitableObject.position.copy(this.bone.getWorldPosition(new THREE.Vector3()))
        this.hitableObject.position.y += 0.1
        this.bone.attach(this.hitableObject)
    }
    setCharacterBone(bone){
        this.bone = bone
    }
    setHitableObject(hitableObject){
        this.hitableObject = hitableObject
    }
    tick() {
       
    }
}

const hittableController = new HittableController()

export default hittableController

export { HittableController }