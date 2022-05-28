import mouse from "../basic/Mouse.js"
import broadcaster from "../services/Broadcaster.js"
import nick from "../services/nick.js"

class MouseController {
    constructor(peerId) {
        this.peerId = peerId
        this.state = {}
        this.mouse = peerId == nick ? mouse : {acumulated:{x:0,y:0}, delta:{x:0,y:0}}
        if (this.peerId == nick) {
            let n = null
            let pila = null
            this.mouse.setCaster((params) => {
                clearTimeout(n)
                pila = params
                n = setTimeout(() => {
                    pila = null
                }, 100)
            })
            setInterval(() => {
                if(pila) broadcaster.send({mouse:pila})
                pila = null
            }, 250);
            

        } 
    }
    init(characterController) {
        this.state = characterController.state
        this.state.mouse = this.mouse
    }
    setMouse(mouse){
        this.state.mouse = mouse
    }
    tick() {
        
    }
}

const mouseController = new MouseController()

export default mouseController

export { MouseController }