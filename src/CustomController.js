import { CharacterController } from "./controllers/CharacterController.js";
import { KeyController } from "./controllers/KeyController.js";
import { PhysicsController } from "./controllers/PhysicsController.js";
import { GameController } from "./GameController.js";
import { CollisionPhysicsController } from "./physics/helper/CollisionPhysicsController.js";
import nick from "./services/nick.js";

class CustomController {
    constructor() {
        this.characterController = new CharacterController(nick);
        this.KeyController = new KeyController(nick);
        this.physicsController = new PhysicsController(nick);
        this.gameController = new GameController(nick);
        this.collisionPhysicsController = new CollisionPhysicsController(nick);
    }
    start() {
        this.characterController.addController(this.KeyController)
        this.characterController.addController(this.physicsController)
        this.characterController.addController(this.gameController)
        this.KeyController.keyListener.start()
        // this.characterController.addController(this.collisionPhysicsController)
        this.characterController.start()
    }
    stop() {}
}

const customController = new CustomController()

export default customController

export { CustomController }