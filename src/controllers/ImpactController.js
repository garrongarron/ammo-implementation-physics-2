import sphere from '../basic/shapes/Sphere.js';
import hitSystem from '../scenes/files-scene4/HitSystem.js';
import spawner from '../scenes/files-scene4/Spawner.js';
import broadcaster from '../services/Broadcaster.js';
import nick from '../services/nick.js';
import { mode } from './ModeController.js';

class ImpactController {
    constructor(peerId) {
        this.peerId = peerId
        this.raycaster = new THREE.Raycaster()
        this.array = []
        this.origin = new THREE.Vector3()
        this.direction = new THREE.Vector3(0, 1, 0)
        this.state = {}
    }

    init(characterController) {
        this.direction = characterController.state.target
        this.state = characterController.state
        this.state.raycastImpact = false
    }

    setArray(array) {
        this.array = array
        console.log('array', this.array);
    }

    hit() {
        let origin = this.state.ray.getWorldPosition(new THREE.Vector3())
        sphere.position.copy(origin)
        let direction = origin.clone().multiplyScalar(-1).add(this.state.target).normalize()
        this.raycaster.set(origin, direction)
        const hitableList = Object.values(hitSystem.hitableContainer).map(headeHitables => {
            return headeHitables
        })
        const intersects = this.raycaster.intersectObjects(hitableList)[0];
        if (intersects) {
            const headShot = intersects.object.name.replace('headHitable-', '')
            if(this.peerId != nick) {
                broadcaster.send({headShot})
            }
            //locally
            spawner.getCustomController(headShot).hPController.addValue(-20)
        }
    }
    tick() {
        if (this.state.raycastImpact == true) {
            this.state.raycastImpact = false
            this.hit()
        }
    }
}

const impactController = new ImpactController()

export default impactController

export { ImpactController }