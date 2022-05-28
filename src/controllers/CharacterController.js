import loopMachine from "../basic/LoopMachine.js"
import scene from "../basic/Scene.js"

class CharacterController {
    constructor(peerId) {
        this.peerId = peerId
        this.controller = {}
        this.character = null
        this.state = {}
    }
    addController(controller) {
        this.controller[controller.constructor.name] = controller
    }
    removeController() {
        delete this.controller[controller.constructor.name]
    }
    addCharacter(character) {
        this.character = character
    }
    start() {
        Object.keys(this.controller).forEach(key => {
            this.controller[key].init(this)
        });
        loopMachine.addCallback(this.tick)
    }
    tick = () => {
        Object.keys(this.controller).forEach(key => {
            this.controller[key].tick()
        });
    }
    stop() {
        Object.keys(this.controller).forEach(key => {
            if(this.controller[key].hasOwnProperty('stop')){
                this.controller[key].stop(this)
            }
        });
        loopMachine.removeCallback(this.tick)
        this.controller = {}
        setTimeout(() => {
            scene.remove(this.character)
            console.log('quitando modelo de la escena',this.peerId )
        }, 3000);
        console.log('stopping CharacterController from ',this.peerId )
    }
}

const characterController = new CharacterController()

export default characterController

export { CharacterController }