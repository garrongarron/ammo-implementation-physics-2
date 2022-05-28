import spawner from "../scenes/files-scene4/Spawner.js"
import nick from "../services/nick.js"
import { SlideBar } from "../UI/SlideBar.js"
import { mode } from "./ModeController.js"

class HPController {
    constructor(peerId) {
        this.peerId = peerId
        this.hp = 100
        this.hpBar = new SlideBar('hp')
    }
    init(characterController) {
        if (this.peerId == nick) {
            this.hpBar.start()
            this.hpBar.setValue(this.hp)
        }
    }
    addValue(value) {
        this.hp += value
        this.hp = Math.min(100, this.hp)
        this.hp = Math.max(0, this.hp)
        //////// Comportamiento
        const state = spawner.getCustomController(this.peerId).characterController.state
        if (this.hp <= 0) {
            state.mode = mode.DEATH
        } else {
            state.mode = mode.HITTED
        }
        //////// Comportamiento
        this.hpBar.setValue(this.hp)

    }

    tick() {

    }
}

const hPController = new HPController()

export default hPController

export { HPController }