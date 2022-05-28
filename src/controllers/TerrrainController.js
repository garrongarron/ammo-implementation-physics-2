import scene from "../basic/Scene.js"

class TerrainController {
    constructor() {
        this.target = null
        this.terrain = null
    }
    init(characterController) {
        this.terrain.start(scene)
    }
    setTarget(target){
        this.target = target
    }
    setTerrain(terrain){
        this.terrain = terrain
    }
    tick(){
        this.terrain.tick(this.target)
        // console.log('this.terrain.tick(this.target)')
    }
}

// const terrainController = new TerrainController()

// export default terrainController

export { TerrainController }