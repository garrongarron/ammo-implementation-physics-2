
//https://codepen.io/BagIdea/pen/LYRPZew
//https://www.youtube.com/watch?v=5NEh6MXO1mU


function Box(_sizeX = 1, _sizeY = 1, _sizeZ = 1, _color = 0xffffff){
	let geometry = new THREE.BoxGeometry(_sizeX, _sizeY, _sizeZ);
	let material = new THREE.MeshPhongMaterial({color: _color});
	return new THREE.Mesh(geometry, material);
}

function BoxBody(_sizeX = 0.5, _sizeY = 0.5, _sizeZ = 0.5, _mass = 1){
	let shape = new CANNON.Box(new CANNON.Vec3(_sizeX, _sizeY, _sizeZ));
	return new CANNON.Body({shape: shape, mass: _mass});
}

let skinColors = [
			0xe9c8bc,
			0xd69d70,
			0x88583b
		];

let clotingColors = [
	0x0055ff,
	0xFF5500,
	0x55ff00,
	0xeeeeee,
	0x222222
];

class Character{
	constructor(_x = 0, _y = 0, _z = 0){
		this.meshList = [];
		this.bodyList = [];
		this.jointList = [];
		
		let skin = skinColors[Math.floor(Math.random()*skinColors.length)];
		let shirt = clotingColors[Math.floor(Math.random()*clotingColors.length)];
		let pants = clotingColors[Math.floor(Math.random()*clotingColors.length)];
		let foot = clotingColors[Math.floor(Math.random()*clotingColors.length)];
		
		this.head = new Box(0.5, 0.5, 0.5, skin);
		this.head.position.set(0, 2.18, 0);
		this.head.position.x += _x;
		this.head.position.y += _y;
		this.head.position.z += _z;
		this.headBody = new BoxBody(0.25, 0.25, 0.25);
		this.headBody.position.copy(this.head.position);
		
		this.chest = new Box(0.6, 0.6, 0.3, shirt);
		this.chest.position.set(0, 1.61, 0);
		this.chest.position.x += _x;
		this.chest.position.y += _y;
		this.chest.position.z += _z;
		this.chestBody = new BoxBody(0.3, 0.3, 0.15);
		this.chestBody.position.copy(this.chest.position);
		
		this.hips = new Box(0.6, 0.3, 0.3, shirt);
		this.hips.position.set(0, 1.14, 0);
		this.hips.position.x += _x;
		this.hips.position.y += _y;
		this.hips.position.z += _z;
		this.hipsBody = new BoxBody(0.3, 0.15, 0.15);
		this.hipsBody.position.copy(this.hips.position);
		
		this.upperShoulderL = new Box(0.4, 0.2, 0.2, shirt);
		this.upperShoulderL.position.set(0.51, 1.8, 0);
		this.upperShoulderL.position.x += _x;
		this.upperShoulderL.position.y += _y;
		this.upperShoulderL.position.z += _z;
		this.upperShoulderLBody = new BoxBody(0.2, 0.1, 0.1);
		this.upperShoulderLBody.position.copy(this.upperShoulderL.position);
		
		this.lowerShoulderL = new Box(0.4, 0.2, 0.2, skin);
		this.lowerShoulderL.position.set(0.92, 1.8, 0);
		this.lowerShoulderL.position.x += _x;
		this.lowerShoulderL.position.y += _y;
		this.lowerShoulderL.position.z += _z;
		this.lowerShoulderLBody = new BoxBody(0.2, 0.1, 0.1);
		this.lowerShoulderLBody.position.copy(this.lowerShoulderL.position);
		
		this.handL = new Box(0.2, 0.2, 0.2, skin);
		this.handL.position.set(1.23, 1.8, 0);
		this.handL.position.x += _x;
		this.handL.position.y += _y;
		this.handL.position.z += _z;
		this.handLBody = new BoxBody(0.1, 0.1, 0.1);
		this.handLBody.position.copy(this.handL.position);
		
		this.upperShoulderR = new Box(0.4, 0.2, 0.2, shirt);
		this.upperShoulderR.position.set(-0.51, 1.8, 0);
		this.upperShoulderR.position.x += _x;
		this.upperShoulderR.position.y += _y;
		this.upperShoulderR.position.z += _z;
		this.upperShoulderRBody = new BoxBody(0.2, 0.1, 0.1);
		this.upperShoulderRBody.position.copy(this.upperShoulderR.position);
		
		this.lowerShoulderR = new Box(0.4, 0.2, 0.2, skin);
		this.lowerShoulderR.position.set(-0.92, 1.8, 0);
		this.lowerShoulderR.position.x += _x;
		this.lowerShoulderR.position.y += _y;
		this.lowerShoulderR.position.z += _z;
		this.lowerShoulderRBody = new BoxBody(0.2, 0.1, 0.1);
		this.lowerShoulderRBody.position.copy(this.lowerShoulderR.position);
		
		this.handR = new Box(0.2, 0.2, 0.2, skin);
		this.handR.position.set(-1.23, 1.8, 0);
		this.handR.position.x += _x;
		this.handR.position.y += _y;
		this.handR.position.z += _z;
		this.handRBody = new BoxBody(0.1, 0.1, 0.1);
		this.handRBody.position.copy(this.handR.position);
		
		this.upperLegL = new Box(0.2, 0.4, 0.2, pants);
		this.upperLegL.position.set(0.2, 0.78, 0);
		this.upperLegL.position.x += _x;
		this.upperLegL.position.y += _y;
		this.upperLegL.position.z += _z;
		this.upperLegLBody = new BoxBody(0.1, 0.2, 0.1);
		this.upperLegLBody.position.copy(this.upperLegL.position);
		
		this.lowerLegL = new Box(0.2, 0.4, 0.2, skin);
		this.lowerLegL.position.set(0.2, 0.36, 0);
		this.lowerLegL.position.x += _x;
		this.lowerLegL.position.y += _y;
		this.lowerLegL.position.z += _z;
		this.lowerLegLBody = new BoxBody(0.1, 0.2, 0.1);
		this.lowerLegLBody.position.copy(this.lowerLegL.position);
		
		this.footL = new Box(0.2, 0.12, 0.35, foot);
		this.footL.position.set(0.2, 0.08, 0.05);
		this.footL.position.x += _x;
		this.footL.position.y += _y;
		this.footL.position.z += _z;
		this.footLBody = new BoxBody(0.1, 0.06, 0.1525);
		this.footLBody.position.copy(this.footL.position);
		
		this.upperLegR = new Box(0.2, 0.4, 0.2, pants);
		this.upperLegR.position.set(-0.2, 0.78, 0);
		this.upperLegR.position.x += _x;
		this.upperLegR.position.y += _y;
		this.upperLegR.position.z += _z;
		this.upperLegRBody = new BoxBody(0.1, 0.2, 0.1);
		this.upperLegRBody.position.copy(this.upperLegR.position);
		
		this.lowerLegR = new Box(0.2, 0.4, 0.2, skin);
		this.lowerLegR.position.set(-0.2, 0.36, 0);
		this.lowerLegR.position.x += _x;
		this.lowerLegR.position.y += _y;
		this.lowerLegR.position.z += _z;
		this.lowerLegRBody = new BoxBody(0.1, 0.2, 0.1);
		this.lowerLegRBody.position.copy(this.lowerLegR.position);
		
		this.footR = new Box(0.2, 0.12, 0.35, foot);
		this.footR.position.set(-0.2, 0.08, 0.05);
		this.footR.position.x += _x;
		this.footR.position.y += _y;
		this.footR.position.z += _z;
		this.footRBody = new BoxBody(0.1, 0.06, 0.1525);
		this.footRBody.position.copy(this.footR.position);
		
		this.meshList.push(this.head);
		this.meshList.push(this.chest);
		this.meshList.push(this.hips);
		this.meshList.push(this.upperShoulderL);
		this.meshList.push(this.lowerShoulderL);
		this.meshList.push(this.handL);
		this.meshList.push(this.upperShoulderR);
		this.meshList.push(this.lowerShoulderR);
		this.meshList.push(this.handR);
		this.meshList.push(this.upperLegL);
		this.meshList.push(this.lowerLegL);
		this.meshList.push(this.footL);
		this.meshList.push(this.upperLegR);
		this.meshList.push(this.lowerLegR);
		this.meshList.push(this.footR);
		
		this.bodyList.push(this.headBody);
		this.bodyList.push(this.chestBody);
		this.bodyList.push(this.hipsBody);
		this.bodyList.push(this.upperShoulderLBody);
		this.bodyList.push(this.lowerShoulderLBody);
		this.bodyList.push(this.handLBody);
		this.bodyList.push(this.upperShoulderRBody);
		this.bodyList.push(this.lowerShoulderRBody);
		this.bodyList.push(this.handRBody);
		this.bodyList.push(this.upperLegLBody);
		this.bodyList.push(this.lowerLegLBody);
		this.bodyList.push(this.footLBody);
		this.bodyList.push(this.upperLegRBody);
		this.bodyList.push(this.lowerLegRBody);
		this.bodyList.push(this.footRBody);
		
		//Head to Chest
		this.jointList.push(new CANNON.ConeTwistConstraint(
			this.headBody,
			this.chestBody,
			{
				pivotA: new CANNON.Vec3(0,-0.25,0),
				pivotB: new CANNON.Vec3(0,0.3,0),
				axisA: CANNON.Vec3.UNIT_Y,
				axisB: CANNON.Vec3.UNIT_Y,
				angle: Math.PI/4,
				twistAngle: Math.PI/8
			}
		));
		
		//Chest to Hips
		this.jointList.push(new CANNON.ConeTwistConstraint(
			this.chestBody,
			this.hipsBody,
			{
				pivotA: new CANNON.Vec3(0,-0.3,0),
				pivotB: new CANNON.Vec3(0,0.075,0),
				axisA: CANNON.Vec3.UNIT_Y,
				axisB: CANNON.Vec3.UNIT_Y,
				angle: Math.PI/4,
				twistAngle: Math.PI/8
			}
		));
		
		//Chest to UpperShoulderL
		this.jointList.push(new CANNON.ConeTwistConstraint(
			this.chestBody,
			this.upperShoulderLBody,
			{
				pivotA: new CANNON.Vec3(0.3,0.25,0),
				pivotB: new CANNON.Vec3(-0.2,0,0),
				axisA: CANNON.Vec3.UNIT_X,
				axisB: CANNON.Vec3.UNIT_X,
				angle: Math.PI/3,
				twistAngle: Math.PI/8
			}
		));
		
		//UpperShoulderL to LowerShoulderL
		this.jointList.push(new CANNON.ConeTwistConstraint(
			this.upperShoulderLBody,
			this.lowerShoulderLBody,
			{
				pivotA: new CANNON.Vec3(0.2,0,0),
				pivotB: new CANNON.Vec3(-0.2,0,0),
				axisA: CANNON.Vec3.UNIT_X,
				axisB: CANNON.Vec3.UNIT_X,
				angle: Math.PI/4,
				twistAngle: Math.PI/8
			}
		));
		
		//LowerShoulderL to HandL
		this.jointList.push(new CANNON.ConeTwistConstraint(
			this.lowerShoulderLBody,
			this.handLBody,
			{
				pivotA: new CANNON.Vec3(0.2,0,0),
				pivotB: new CANNON.Vec3(-0.1,0,0),
				axisA: CANNON.Vec3.UNIT_X,
				axisB: CANNON.Vec3.UNIT_X,
				angle: Math.PI/8,
				twistAngle: Math.PI/8
			}
		));
		
		//Chest to UpperShoulderR
		this.jointList.push(new CANNON.ConeTwistConstraint(
			this.chestBody,
			this.upperShoulderRBody,
			{
				pivotA: new CANNON.Vec3(-0.3,0.25,0),
				pivotB: new CANNON.Vec3(0.2,0,0),
				axisA: CANNON.Vec3.UNIT_X,
				axisB: CANNON.Vec3.UNIT_X,
				angle: Math.PI/3,
				twistAngle: Math.PI/8
			}
		));
		
		//UpperShoulderR to LowerShoulderR
		this.jointList.push(new CANNON.ConeTwistConstraint(
			this.upperShoulderRBody,
			this.lowerShoulderRBody,
			{
				pivotA: new CANNON.Vec3(-0.2,0,0),
				pivotB: new CANNON.Vec3(0.2,0,0),
				axisA: CANNON.Vec3.UNIT_X,
				axisB: CANNON.Vec3.UNIT_X,
				angle: Math.PI/4,
				twistAngle: Math.PI/8
			}
		));
		
		//LowerShoulderR to HandR
		this.jointList.push(new CANNON.ConeTwistConstraint(
			this.lowerShoulderRBody,
			this.handRBody,
			{
				pivotA: new CANNON.Vec3(-0.2,0,0),
				pivotB: new CANNON.Vec3(0.1,0,0),
				axisA: CANNON.Vec3.UNIT_X,
				axisB: CANNON.Vec3.UNIT_X,
				angle: Math.PI/8,
				twistAngle: Math.PI/8
			}
		));
		
		//Hips to UpperLegL
		this.jointList.push(new CANNON.ConeTwistConstraint(
			this.hipsBody,
			this.upperLegLBody,
			{
				pivotA: new CANNON.Vec3(0.2,-0.15,0),
				pivotB: new CANNON.Vec3(0,0.2,0),
				axisA: CANNON.Vec3.UNIT_Y,
				axisB: CANNON.Vec3.UNIT_Y,
				angle: Math.PI/4,
				twistAngle: Math.PI/8
			}
		));
		
		//UpperLegL to LowerLegL
		this.jointList.push(new CANNON.HingeConstraint(
			this.upperLegLBody,
			this.lowerLegLBody,
			{
				pivotA: new CANNON.Vec3(0,-0.2,0),
				pivotB: new CANNON.Vec3(0,0.2,0),
				axisA: CANNON.Vec3.UNIT_X,
				axisB: CANNON.Vec3.UNIT_X,
				//angle: Math.PI/4,
				//twistAngle: Math.PI/8
			}
		));
		
		//LowerLegL to FootL
		this.jointList.push(new CANNON.ConeTwistConstraint(
			this.lowerLegLBody,
			this.footLBody,
			{
				pivotA: new CANNON.Vec3(0,-0.2,0),
				pivotB: new CANNON.Vec3(0,0.06,-0.04),
				axisA: CANNON.Vec3.UNIT_Y,
				axisB: CANNON.Vec3.UNIT_Y,
				angle: Math.PI/8,
				twistAngle: Math.PI/8
			}
		));
		
		//Hips to UpperLegR
		this.jointList.push(new CANNON.ConeTwistConstraint(
			this.hipsBody,
			this.upperLegRBody,
			{
				pivotA: new CANNON.Vec3(-0.2,-0.15,0),
				pivotB: new CANNON.Vec3(0,0.2,0),
				axisA: CANNON.Vec3.UNIT_Y,
				axisB: CANNON.Vec3.UNIT_Y,
				angle: Math.PI/4,
				twistAngle: Math.PI/8
			}
		));
		
		//UpperLegR to LowerLegR
		this.jointList.push(new CANNON.ConeTwistConstraint(
			this.upperLegRBody,
			this.lowerLegRBody,
			{
				pivotA: new CANNON.Vec3(0,-0.2,0),
				pivotB: new CANNON.Vec3(0,0.2,0),
				axisA: CANNON.Vec3.UNIT_Y,
				axisB: CANNON.Vec3.UNIT_Y,
				angle: Math.PI/4,
				twistAngle: Math.PI/8
			}
		));
		
		//LowerLegR to FootR
		this.jointList.push(new CANNON.ConeTwistConstraint(
			this.lowerLegRBody,
			this.footRBody,
			{
				pivotA: new CANNON.Vec3(0,-0.2,0),
				pivotB: new CANNON.Vec3(0,0.06,-0.04),
				axisA: CANNON.Vec3.UNIT_Y,
				axisB: CANNON.Vec3.UNIT_Y,
				angle: Math.PI/8,
				twistAngle: Math.PI/8
			}
		));
		
		//Custom Mesh
		this.eyeL = new Box(0.04, 0.04, 0.04, 0x000000);
		this.eyeL.position.set(0.11, 0.09, 0.25);
		this.eyeBrowL = new Box(0.13, 0.05, 0.04, 0x000000);
		this.eyeBrowL.position.set(0.12, 0.15, 0.25);
		this.eyeR = new Box(0.04, 0.04, 0.04, 0x000000);
		this.eyeR.position.set(-0.11, 0.09, 0.25);
		this.eyeBrowR = new Box(0.13, 0.05, 0.04, 0x000000);
		this.eyeBrowR.position.set(-0.12, 0.15, 0.25);
		this.mouth = new Box(0.2, 0.05, 0.04, 0xff5555);
		this.mouth.position.set(0, -0.15, 0.25);
		this.ear = new Box(0.65, 0.15, 0.05, skin);
		this.ear.position.set(0, 0, 0);
		this.hairT = new Box(0.4, 0.5, 0.6, 0x000000);
		this.hairT.position.set(0, 0.2, -0.1);
		this.hairB = new Box(0.6, 0.5, 0.35, 0x000000);
		this.hairB.position.set(0, 0.1, -0.2);
		
		this.head.add(this.eyeL);
		this.head.add(this.eyeBrowL);
		this.head.add(this.eyeR);
		this.head.add(this.eyeBrowR);
		this.head.add(this.mouth);
		this.head.add(this.ear);
		this.head.add(this.hairT);
		this.head.add(this.hairB);
	}
}

class Game{
	constructor(_bgColor = 0xe0e0e0){
		this.isStart = false;
		this.backgroundColor = _bgColor;
		this.pivot = new THREE.Object3D();
		this.dt = 1.0/60.0;
	}
	
	Init(){
		this.scene = new THREE.Scene();
		this.scene.background = new THREE.Color(this.backgroundColor);
		this.scene.fog = new THREE.Fog(0xe0e0e0, 0, 40);
		
		this.camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight, 0.01, 1000.0);
		
		this.pivot.add(this.camera);
		this.scene.add(this.pivot);
		
		this.renderer = new THREE.WebGLRenderer({antialias: true});
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.renderer.shadowMap.enabled = true;
		this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
		
		document.body.appendChild(this.renderer.domElement);
		window.game = this;
		window.addEventListener('resize', function(){
			this.game.camera.aspect = window.innerWidth/window.innerHeight;
			this.game.camera.updateProjectionMatrix();
			this.game.renderer.setSize(window.innerWidth, window.innerHeight);
		});
	}

	Add(obj){
		for(let mesh of obj.meshList){
			mesh.castShadow = true;
			mesh.receiveShadow = true;
			this.scene.add(mesh);
		}
		
		for(let body of obj.bodyList){
			this.world.addBody(body);
		}
		
		for(let joint of obj.jointList){
			this.world.addConstraint(joint);
		}
	}
	
	Update = () => {
		requestAnimationFrame(this.Update);
		if(this.isStart){
			for(let i = 0; i < this.playerList.length; i++){
				for(let a = 0; a < this.playerList[i].bodyList.length; a++){
					this.playerList[i].meshList[a].position.copy(this.playerList[i].bodyList[a].position);
				this.playerList[i].meshList[a].quaternion.copy(this.playerList[i].bodyList[a].quaternion);
				}
			}
			
			this.pivot.rotation.y += 0.005;
			this.world.step(this.dt);
			this.renderer.render(this.scene, this.camera);
		}
	}
	
	Start(){
		//Setup Scene
		this.camera.position.set(0, 2.5, 15);
		this.camera.lookAt(0, 1, 0);
		
		this.grid = new THREE.GridHelper(20, 20, 0x00ff00, 0xff5555);
		this.grid.material.opacity = 0.5;
		this.grid.material.transparent = true;
		this.scene.add(this.grid);
		
		let floor = new THREE.Mesh(
			new THREE.PlaneBufferGeometry(300, 300, 50, 50),
			new THREE.MeshPhongMaterial({color: 0xe0e0e0})
		);
		floor.receiveShadow = true;
		floor.rotation.x = -Math.PI/2;
		this.scene.add(floor);
		
		this.scene.add(new THREE.AmbientLight(0xffffff, 0.4));
		
		let dirLight = new THREE.DirectionalLight(0xffffff, 1);
		dirLight.castShadow = true;
		dirLight.position.set(5, 10, 5);
		this.scene.add(dirLight);
		
		//Setup Physic
		this.world = new CANNON.World();
		this.world.gravity.set(0, -5, 0);
		this.world.broadphase = new CANNON.NaiveBroadphase();
		this.world.solver.tolerance = 0.001;
		
		let groundBody = new CANNON.Body({shape: new CANNON.Plane(), mass: 0});
		groundBody.quaternion.setFromAxisAngle(
			new CANNON.Vec3(1, 0, 0),
			-Math.PI/2
		);
		this.world.addBody(groundBody);
		
		//Create Game
		this.playerList = [];
		
		for(let i = 0; i < 20; i++){
			let player = new Character(Math.random()*8-4, i*30+20, Math.random()*8-4);
			this.Add(player);
			this.playerList.push(player);
		}
		
		this.isStart = true;
		this.Update();
	}
}

let game = new Game();
game.Init();
game.Start();