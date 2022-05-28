import loopMachine from "./LoopMachine.js";

let clock = new THREE.Clock();
let n = 0
loopMachine.addCallback(() => {
    n = clock.getDelta();
    clock.delta = n
})

let getDelta = () => {
    return n
}

export { clock, getDelta }