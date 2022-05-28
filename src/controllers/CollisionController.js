import scene from "../basic/Scene.js";

class CollisionController {
    constructor(peerId) {
        this.peerId = peerId
        this.character = null
        this.box = new THREE.Box3();
        this.boxHelper = null// new THREE.BoxHelper( object, 0xffff00 );
    }
    init(characterController) {
        this.character = characterController.character
        
        this.boxHelper = new THREE.Box3Helper(this.box, 0xffff00 );
        scene.add(this.boxHelper)
    }
    tick() {
        const center = this.character.position.clone()
        center.y += .8
        this.box.setFromCenterAndSize (center, new THREE.Vector3(.25, 1.6, .25))
    }
}

const collisionController = new CollisionController()

export default collisionController

export { CollisionController }