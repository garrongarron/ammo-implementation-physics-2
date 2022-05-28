import { mode } from "./ModeController.js"

class GravityController {
    constructor() {
        this.character = null
        this.raycaster = new THREE.Raycaster()
        this.origin = new THREE.Vector3()
        this.direction = new THREE.Vector3(0, -1, 0)
        this.array = []
        this.state = {}
    }
    init(characterController) {
        this.character = characterController.character
        this.state = characterController.state

    }
    setArray(array) {
        this.array = array
        console.log('terrain', this.array)
    }
    tick() {
        
        this.origin.copy(this.character.position)
        this.origin.y += 1.5
        this.raycaster.set(this.origin, this.direction)
        const intersects = this.raycaster.intersectObjects(this.array)[0];
        if (intersects) {
            if(intersects.distance < 2 && this.state.mode == mode.FALLING) this.state.mode == mode.IDLE
            if (this.state.mode == mode.FALLING) return
            this.character.position.copy(intersects.point)
        }

    }
}

// const gravityController = new GravityController()

// export default gravityController

export { GravityController }