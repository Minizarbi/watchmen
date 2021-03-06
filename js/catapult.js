var gravity = -10;

/* Create world with gravity */
var world = new CANNON.World();
world.gravity.set(0,gravity,0);

/* Use default algorithm to compute collisions */
world.broadphase = new CANNON.NaiveBroadphase();

var mass = 5, radius = 0.2;
var sphereShape = new CANNON.Sphere(radius);
var missile = new CANNON.Body({mass: mass, shape: sphereShape});
missile.position.set(0,0,0);
world.add(missile);

/* Time step in seconds */
var timeStep = 1.0 / 60.0;

/* Catapult strength in % */
var catapultStrength = 0;

/* Variables to save the mouse state */
var mouse = {x: 0, y: 0};
var pressed = false;


var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.BoxGeometry(1, 0.1, 0.1);
var material = new THREE.MeshBasicMaterial({color: 0xFFFFFF});
var stick = new THREE.Mesh(geometry, material);

stick.position.x = -0.5;

geometry = new THREE.CylinderGeometry(radius + 0.1, radius, 0.1);
var bucket = new THREE.Mesh(geometry, material);

bucket.position.x = -1;

/* Using an object to change the rotation center */
var catapult = new THREE.Object3D();
catapult.add(stick);
catapult.add(bucket);

catapult.rotation.z = - Math.PI / 4;

scene.add(catapult);

geometry = new THREE.SphereGeometry(radius);
var ballMaterial = new THREE.MeshBasicMaterial({color: 0xFF0000});
var ball = new THREE.Mesh(geometry, ballMaterial);
ball.position.copy(missile.position);

catapult.position.x = -2;

camera.position.z = 5;

/*
 * Function to change the catapult color when selected = true
 */
function selectCatapult(selected) {
	if (selected) {
		material.setValues({color: 0x00FF00});
	} else {
		material.setValues({color: 0xFFFFFF});
	}
}

function updatePhysics() {
	world.step(timeStep);
	ball.position.copy(missile.position);
}

function render() {
	requestAnimationFrame(render);
	updatePhysics();
	renderer.render(scene, camera);
}
render();

function onMouseDown(event) {
	/* Freeze the missile */
	missile.sleep();

	/* Stick the missile to end of the stick */
	scene.remove(ball);
	catapult.add(ball);
	missile.position.set(-1, 0, 0);

	/* Set variables to help moving catapult */
	mouse.x = event.clientX;
	mouse.y = event.clientY;
	pressed = true;

	/* Set minimal catapult strength */
	catapultStrength = 0;

	/* Paint the catapult */
	selectCatapult(true);
}

function onMouseUp(event) {
	/* Set the catapult to initial state */
	catapult.rotation.z = - Math.PI / 4;
	
	/* Unstick the missile from stick */
	catapult.updateMatrixWorld();
	var vector = new THREE.Vector3();
	vector.setFromMatrixPosition(ball.matrixWorld);
	catapult.remove(ball);
	missile.position.copy(vector);
	ball.position.copy(vector);
	scene.add(ball);

	/* Unfreeze the missile */
	missile.wakeUp();

	/* Set the missile speed depending on the catapult strength
	Here 10 is arbitrary value */
	missile.velocity = new CANNON.Vec3(10 * catapultStrength, 10 * catapultStrength, 0);
	
	/* Unpaint the catapult */
	selectCatapult(false);
	
	pressed = false;
}

function onMouseMoved(event) {
	if (pressed) {
		var dist = Math.sqrt(Math.pow(mouse.x - event.clientX, 2) +	Math.pow(mouse.y - event.clientY, 2));
		catapultStrength = (Math.min(dist, renderer.domElement.width / 2) * 2 / renderer.domElement.width);
		catapult.rotation.z = - Math.PI / 4 + catapultStrength * (Math.PI / 4);
		//render();
	}
}

renderer.domElement.addEventListener('mousedown', onMouseDown, false);
renderer.domElement.addEventListener('mouseup', onMouseUp, false);
renderer.domElement.addEventListener('mousemove', onMouseMoved, false);
