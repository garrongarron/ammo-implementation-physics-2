import camera from "./basic/Camera.js";
import light from "./basic/Light.js";
import loopMachine from "./basic/LoopMachine.js";
import renderer from "./basic/Renderer.js";
import resize from "./basic/Resize.js";
import scene from "./basic/Scene.js";
import customController from "./CustomController.js";
import { ammoPromise } from "./physics/Ammo.js";
import BallCreator from "./physics/helper/BallCreator.js";
import initPhysics from "./physics/InitPhysics.js";
import updatePhysics from "./physics/UpdatePhysics.js";


scene.add(light)
scene.add(camera)

camera.lookAt(scene.position)


customController.start()


loopMachine.addCallback(() => {
    renderer.render(scene, camera)
})
loopMachine.start()
resize.start(renderer)

