import camera from "./basic/Camera.js";
import { getDelta } from "./basic/Clock.js";
import light from "./basic/Light.js";
import loopMachine from "./basic/LoopMachine.js";
import renderer from "./basic/Renderer.js";
import resize from "./basic/Resize.js";
import scene from "./basic/Scene.js";
import customController from "./CustomController.js";
import Ammo, { ammoPromise } from "./physics/Ammo.js";
import createParalellepiped from "./physics/CreateParalellepiped.js";
import BallCreator from "./physics/helper/BallCreator.js";
import initPhysics, { physicsWorld } from "./physics/InitPhysics.js";
import updatePhysics from "./physics/UpdatePhysics.js";


var CONSTRAINT_DEBUG_SIZE = 0.1;


scene.add(light)
scene.add(camera)
camera.position.set(-17, 10, 0)
let hinge = null
const hingeConf = (pylonHeight, armLength, pylon, arm) => {
    // Hinge constraint to move the arm
    //0, 6*.5, 0 //from the center of the pylon
    const pivotA = new Ammo.btVector3(0, pylonHeight * 0.5, 0);
    //0, -.2, -7*.5 //from the center of the arm
    const pivotB = new Ammo.btVector3(0, - 0.2, -armLength * 0.5);
    const axis = new Ammo.btVector3(0, 1, 0);
    hinge = new Ammo.btHingeConstraint(
        pylon.userData.physicsBody,//fixed
        arm.userData.physicsBody,//rotated
        pivotA,
        pivotB,
        axis,
        axis,
        true
    );
    physicsWorld.addConstraint(hinge, true);
}
ammoPromise.then(() => {
    initPhysics()
    //write your code here
    const pos = new THREE.Vector3();
    const quat = new THREE.Quaternion();

    // Ground
    pos.set(0, - 0.5, 0);
    quat.set(0, 0, 0, 1);
    const ground = createParalellepiped(40, 1, 40, 0, pos, quat, new THREE.MeshPhongMaterial({ color: 0xFFFFFF }));
    ground.castShadow = true;
    ground.receiveShadow = true;

    const clothWidth = 4;
    const clothPos = new THREE.Vector3(0, 3, 7);
    const clothHeight = 3;
    const armMass = 2;
    const armLength = 3 + clothWidth;
    const pylonHeight = clothPos.y + clothHeight;//3+3
    const baseMaterial = new THREE.MeshPhongMaterial({ color: 0x606060 });
    pos.set(clothPos.x, 0.1, clothPos.z - armLength);
    quat.set(0, 0, 0, 1);
    console.log(pos)
    //BASE-BASE
    const base = createParalellepiped(1, 0.2, 1, 0, pos, quat, baseMaterial);
    base.castShadow = true;
    base.receiveShadow = true;

    camera.lookAt(
        0,
        3,
        0
    )

    //BASE-COLUMN
    pos.set(clothPos.x, 0.5 * pylonHeight, clothPos.z - armLength);
    const pylon = createParalellepiped(0.4, pylonHeight, 0.4, 0/*ESTATIC*/, pos, quat, baseMaterial);
    pylon.castShadow = true;
    pylon.receiveShadow = true;
    //BASE-ARM
    pos.set(clothPos.x, pylonHeight + 0.2, clothPos.z - 0.5 * armLength);
    const arm = createParalellepiped(0.4, 0.4, armLength + 0.4, armMass, pos, quat, baseMaterial);
    arm.castShadow = true;
    arm.receiveShadow = true;


    // hingeConf(pylonHeight, armLength, pylon, arm)


    var transformA = new Ammo.btTransform();
    var transformB = new Ammo.btTransform();

    transformA.setIdentity();
    transformB.setIdentity();

    // transformA.getBasis().setEulerZYX(0, 0, 0);
    transformA.setOrigin(new Ammo.btVector3(0, 3.2, 0));

    // transformB.getBasis().setEulerZYX(0, 0, 0);
    transformB.setOrigin(new Ammo.btVector3(0, 0, -3.5));

    var coneC = new Ammo.btConeTwistConstraint(
        pylon.userData.physicsBody,
        arm.userData.physicsBody,
        transformA,
        transformB
    );
    coneC.setLimit(-Math.PI / 16,0,0);
    physicsWorld.addConstraint(coneC, true);



    let armMovement = -1
    loopMachine.addCallback(() => {

        // Hinge control
        if (hinge) hinge.enableAngularMotor(true, 0.8 * armMovement, 50);

        // Step world
        const deltaTime = getDelta();
        updatePhysics(deltaTime)
    })
})




loopMachine.addCallback(() => {
    renderer.render(scene, camera)
})
loopMachine.start()
resize.start(renderer)
