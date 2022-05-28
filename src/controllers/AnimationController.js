import TransitionHandler from "../basic/animations/TransitionHandler.js"
import nick from "../services/nick.js"
import { mode } from "./ModeController.js"


class AnimationController {
    constructor(peerId) {
        this.peerId = peerId
        this.state = null
        this.transitionHandler = null
    }
    init(characterController) {
        this.state = characterController.state
        if (!this.transitionHandler) {
            this.transitionHandler = new TransitionHandler(characterController.character)
        }
        this.transitionHandler.start()
    }
    stop() {
        this.transitionHandler.stop()
    }
    tick() {
        if(this.peerId == nick) {
            // console.log('mode', this.state.mode)
        }
        if (this.state.mode == mode.DEATH) {
            this.transitionHandler.action(11, 1, true)
            return
        }
        if (this.state.mode == mode.HITTED) {
            this.transitionHandler.action(11, 1, false)
            return
        }
        if (this.state.mode == mode.FALLING) {
            this.transitionHandler.action(12, 1, false)
            return
        }
        if (this.state.mode == mode.IDLE) {
            if (this.state.translation.y == 1) {// console.log('2 adelante');
                this.transitionHandler.action(5, 1.2)
            } else if (this.state.translation.y == -1) {// console.log('1 atras');
                this.transitionHandler.action(6, 1.2)
            } else if (this.state.translation.x == -1) {// console.log('1 izquierda');
                this.transitionHandler.action(9, 1.2)
            } else if (this.state.translation.x == 1) {// console.log('1 Derecha');
                this.transitionHandler.action(10, 1.2)
            } else {// console.log('0 quieto');
                this.transitionHandler.action(4)
            }
        }
        if (this.state.mode == mode.SHOOTER) {
            if (1 == 2) {
            } else if (this.state.translation.x == 1) {// console.log('1 izquierda');
                this.transitionHandler.action(7, 1.2)
            } else if (this.state.translation.x == -1) {// console.log('1 derecha');
                this.transitionHandler.action(8, 1.2)
            } else if (this.state.translation.y == 1) {// console.log('2 adelante');
                this.transitionHandler.action(2, 1.2)
            } else if (this.state.translation.y == -1) {// console.log('1 atras');
                this.transitionHandler.action(1, 1.2)
            } else {// console.log('0 quieto');
                this.transitionHandler.action(3)
            }
        }
    }
}

const animationController = new AnimationController()

export default animationController

export { AnimationController }