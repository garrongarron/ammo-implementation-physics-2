import Ammo, { ammoPromise } from "../Ammo.js";
import FLAGS from "../Flags.js";
import { physicsWorld, transformAux1 as transform } from "../InitPhysics.js";
import rigidBodies from "../RigidBodies.js";
import STATE from "../State.js";


class BallCreator {
    constructor(argumentObj = {}) {
        this.arguments = {
            isRigidBody: false,
            isKinematic: false,
            autoStatic: true,
        }
        this.arguments = Object.assign(this.arguments, argumentObj)
        this.params = {
            pos: { x: 0, y: 0, z: 0 },
            radius: 1,
            quat: { x: 0, y: 0, z: 0, w: 1 },
            mass: 1,
            name: "ball",
            shadow: true,
            color: 0x800080
        }
        this.physics = {
            localInertia: null,
            rigidBody: null
        }
        this.object3d = null
    }

    #addRigidBody() {
        if (!physicsWorld) return console.error("Physics world is not initialized");
        (async () => {
            let a = await ammoPromise
            this.physics.rigidBody = new Ammo.btRigidBody(new Ammo.btRigidBodyConstructionInfo(
                this.params.mass,
                this.#getMotionState(),
                this.#getShape(),
                this.#getLocalInertia()
            ));

            this.physics.rigidBody.setFriction(4);
            this.physics.rigidBody.setRollingFriction(10);
            if(!this.arguments.autoStatic){
                this.physics.rigidBody.setActivationState(STATE.DISABLE_DEACTIVATION)
            }
            if(this.arguments.isKinematic){
                this.physics.rigidBody.setCollisionFlags( FLAGS.CF_KINEMATIC_OBJECT );
            }

            physicsWorld.addRigidBody(this.physics.rigidBody);
            rigidBodies.push(this.object3d);

            this.object3d.userData.physicsBody = this.physics.rigidBody;

            this.physics.rigidBody.threeObject = this.object3d;
        })()
    }
    createBall() {
        if (this.arguments.isRigidBody) this.#addRigidBody()
        this.object3d = new THREE.Mesh(
            new THREE.SphereBufferGeometry(this.params.radius),
            new THREE.MeshPhongMaterial({ color: this.params.color }));

        this.object3d.position.set(this.params.pos.x, this.params.pos.y, this.params.pos.z);
        if (this.params.shadow) {
            this.object3d.castShadow = true;
            this.object3d.receiveShadow = true;
        }
        this.object3d.userData.tag = this.params.name
        return this.object3d
    }


    #getMotionState() {
        transform.setIdentity();
        transform.setOrigin(new Ammo.btVector3(this.params.pos.x, this.params.pos.y, this.params.pos.z));
        transform.setRotation(new Ammo.btQuaternion(this.params.quat.x, this.params.quat.y, this.params.quat.z, this.params.quat.w));

        return new Ammo.btDefaultMotionState(transform);
    }

    #getShape() {
        let colShape = new Ammo.btSphereShape(this.params.radius);
        colShape.setMargin(0.05);
        colShape.calculateLocalInertia(this.params.mass, this.#getLocalInertia());
        return colShape;
    }

    #getLocalInertia() {
        if (this.physics.localInertia) return this.physics.localInertia
        this.physics.localInertia = new Ammo.btVector3(0, 0, 0);
        return this.physics.localInertia
    }
}

export default BallCreator