import keyListener from "../basic/KeyListener.js"
import mouse from "../basic/Mouse.js"
import broadcaster from "../services/Broadcaster.js"

class BroadcasterController {
    constructor() {
        this.state = {}
    }
    init(characterController) {
        this.state = characterController.state.rotation
        keyListener.setCaster(this.keyCaster)
        mouse.setCaster(this.mouseCaster)
    }
    keyCaster = (params) =>{
        const [keyCode, flag, keys] = params
        broadcaster.send({keyListenerEvent:{keyCode, flag, keys}})
    }
    mouseCaster(params){
        broadcaster.send({mouse:params})
    }
    tick() {
        
    }
}

const broadcasterController = new BroadcasterController()

export default broadcasterController

export { BroadcasterController }