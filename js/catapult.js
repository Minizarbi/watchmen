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

/* Using an object to change the rotation center */
var catapult = new THREE.Object3D();
catapult.add(stick);

catapult.rotation.z = - Math.PI / 4;

scene.add(catapult);

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

function render() {
	requestAnimationFrame(render);
	renderer.render(scene, camera);
}
render();

function onMouseDown(event) {
	selectCatapult(true);
	mouse.x = event.clientX;
	mouse.y = event.clientY;
	pressed = true;
}

function onMouseUp(event) {
	selectCatapult(false);
	/* var dist = Math.sqrt(Math.pow(mouse.x - event.clientX, 2) +	Math.pow(mouse.y - event.clientY, 2)); */
	catapult.rotation.z = - Math.PI / 4;
	//render();
	pressed = false;
}

function onMouseMoved(event) {
	if (pressed) {
		var dist = Math.abs(mouse.x - event.clientX) + Math.abs(mouse.y - event.clientY);
		var strength = (Math.min(dist, renderer.domElement.width / 2) * 2 / renderer.domElement.width);
		catapult.rotation.z = - Math.PI / 4 + strength * (Math.PI / 4);
		//render();
	}
}

renderer.domElement.addEventListener('mousedown', onMouseDown, false);
renderer.domElement.addEventListener('mouseup', onMouseUp, false);
renderer.domElement.addEventListener('mousemove', onMouseMoved, false);
