import nick from "../services/nick.js"
import { mode } from "./ModeController.js"

class HittedController {
    constructor(peerId) {
        this.peerId = peerId
        this.inProgress = false
        this.state = {}
        this.steteBackup = null
    }
    init(characterController) {
        this.state = characterController.state
    }
    hitted() {
        setTimeout(() => {
            this.inProgress = false
            this.state.mode = this.stateBackup
        }, 500);
    }
    tick() {
        if (this.state.mode == mode.HITTED ) {
            this.inProgress = true
            this.hitted()
        } else {
            this.stateBackup = this.state.mode
        }
    }
}

const hittedController = new HittedController()

export default hittedController

export { HittedController }