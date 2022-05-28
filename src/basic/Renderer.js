const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMappingExplosure = 8.3

const canvas = renderer.domElement

renderer.setClearColor(0x222222);


export default renderer

export { canvas }