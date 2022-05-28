class WallCollisionController {
    constructor() {
        this.walls = []
        this.emptyBox = new THREE.Box3();
        this.characterCollisioner = null
        this.character = null
        this.characterPrevPosition = new THREE.Vector3()
    }
    
    init(characterController) {
        this.character = characterController.character
        setTimeout(() => {
            this.characterCollisioner = characterController.controller['CollisionController'].box
        }, 1000);
    }
    setWalls(walls){
        this.walls = walls
    }
    tick() {
        if(this.characterCollisioner === null) return
        this.walls.forEach(collectableObj => {
            this.emptyBox.setFromObject(collectableObj)
            if(this.characterCollisioner.intersectsBox(this.emptyBox)){
                this.character.position.copy(this.characterPrevPosition)
                return
            }
        })
        this.characterPrevPosition.copy(this.character.position)
    }
}

const wallCollisionController = new WallCollisionController()

export default wallCollisionController

export { WallCollisionController }