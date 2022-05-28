import scene from "../basic/Scene.js";
import sky from "../basic/shapes/Sky.js";
import broadcaster from "../services/Broadcaster.js";
import nick from "../services/nick.js";

class RayCasterController {
    constructor(peerId) {
        this.peerId = peerId
        this.state = null
        this.raycaster = new THREE.Raycaster();
        this.raycaster.layers.set( 1 );
        this.array = []
        this.character = null
        this.pila = null
        this.lastMsg = null
        this.n = 0
        if (peerId != nick) {
            this.tick = () => { }
        }
    }
    init(characterController) {
        this.state = characterController.state
        this.state['target'] = new THREE.Vector3()
        setInterval(() => {
            if (this.pila && this.lastMsg != this.pila) broadcaster.send({ target: this.pila })
            this.lastMsg = this.pila
        }, 500);
        this.updateArray()
    }
    setCharacter(character) {
        this.character = character
    }
    updateArray() {
        this.array = scene.children.filter(el => {
            return el != this.character
        })
    }
    setCamera(camera) {
        this.camera = camera
    }
    setTarget(target) {
        this.state.target.set(target[0], target[1], target[2])
    }
    tick() {
        this.raycaster.setFromCamera(new THREE.Vector2(), this.camera);
        const intersects = this.raycaster.intersectObjects(this.array, true)[0];
        if (intersects) {
            this.state.target.copy(intersects.point)
            // broadcaster.send({target:intersects.point.toArray()})
            if (this.lastMsg != intersects.point.toArray()) {
                let msg = intersects.point.toArray()
                this.pila = msg
                clearTimeout(this.n)
                this.n = setTimeout(() => {
                    this.pila = null
                }, 100);
                this.lastMsg = intersects.point.toArray()
            }
        }
        sky.position.copy(this.character.position)
    }
}

const rayCasterController = new RayCasterController()

export default rayCasterController

export { RayCasterController }