class CollectableController {
    constructor(peerId) {
        this.peerId = peerId
        this.collectables = []
        this.characterCollisioner = null
        this.group = new THREE.Group()
        this.collectableBox = new THREE.Box3();
        this.callback = null
    }
    init(characterController) {
        setTimeout(() => {
            this.characterCollisioner = characterController.controller['CollisionController'].box
        }, 1000);
    }
    setArray(array){
        this.collectables = array
    }
    setCallback(callback){
        this.callback = callback
    }
    tick() {
        if(this.characterCollisioner === null) return
        this.collectables.forEach(collectableObj => {
            this.collectableBox.setFromObject(collectableObj)
            if(this.characterCollisioner.intersectsBox(this.collectableBox)){
                this.callback(collectableObj, this.peerId)
            }
        })
    }
}

const collectableController = new CollectableController()

export default collectableController

export { CollectableController }