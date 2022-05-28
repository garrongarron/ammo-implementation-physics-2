import sounds from "../../sounds/Audios.js"
import triggerBurst from "../particle-system/triggerBurst.js"
import broadcaster from "../services/Broadcaster.js"
import nick from "../services/nick.js"
import gunBar from "../UI/GunBar.js"
import impactController from "./ImpactController.js"
// import info from "../UI/Info.js"
import { mode } from "./ModeController.js"

class WeaponController {
    constructor(peerId) {
        this.peerId = peerId
        this.state = {}
        this.character = null
        this.speed = .07
        this.ySensibility = 0.001
        this.rightHand = null
        this.ray = null
        this.n = 0
        this.coolDown = 0
    }
    init(characterController) {
        this.state = characterController.state
        this.state.ray = this.ray///
        if (this.peerId != nick) return
        this.character = characterController.character
        this.rightHand.attach(this.weapon)
        if (this.peerId == nick) {
            document.removeEventListener('mousedown', this.shotWithValidation)
            document.addEventListener('mousedown', this.shotWithValidation)
        }
        sounds.setVolume('impact', .125)
    }
    setRay(ray) {
        this.ray = ray
    }
    setWeapon(weapon) {
        this.weapon = weapon
    }
    setChest(chest) {
        this.chest = chest;
    }
    setRightHand(rightHand) {
        this.rightHand = rightHand;
    }
    stop = () => {
        document.removeEventListener('mousedown', this.shotWithValidation)
    }

    shotWithValidation = () => {
        if (this.state.mode != mode.SHOOTER) return
        if (this.coolDown > 0) return
        this.coolDown = 1
        gunBar.setValue(1)
        setTimeout(() => {
            this.coolDown = 0
        }, 1000)

        if (this.peerId == nick) {
            broadcaster.send({ shot: this.state.target })
            this.state.raycastImpact = true
        }
        this.shot()
        // triggerBurst(this.state.target)
    }

    shot() {
        sounds.play('impact')
        clearTimeout(this.n)
        // this.ray.children[0].material = redMaterial
        this.ray.visible = true
        this.n = setTimeout(() => {
            // this.ray.children[0].material = whiteMaterial
            this.ray.visible = false
        }, 200);
    }

    tick() {
        this.weapon.position.copy(this.rightHand.position)
        this.weapon.position.y = 2 + this.state.mouse.acumulated.y / 150
        if (this.state.mode != mode.FALLING) {
            this.chest.rotation.x = this.state.mouse.acumulated.y / 2000
        }
        if (this.state.mouse.delta.x == 0) this.weapon.lookAt(this.state.target)
        this.ray.lookAt(this.state.target)
    }
}

const weaponController = new WeaponController()

export default weaponController

export { WeaponController }