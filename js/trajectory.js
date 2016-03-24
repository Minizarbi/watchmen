var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var orig = new THREE.Vector3(-2, 0, 0);
var speed = new THREE.Vector3(5, 5, 0);
var gravity = -10;
var timeStep = 1.0 / 60.0;
var pointNumber = 60;

function createPointArray(origPoint, origSpeed, gravity, timeStep, pointNumber) {
	var pointArray = [];
	var point = origPoint.clone();
	var speed = origSpeed.clone();
	for (var i = 0; i < pointNumber; i++) {
		pointArray.push(point.clone());
		point.x += speed.x * timeStep;
		point.y += speed.y * timeStep;
		/* point.z doesn't change */
		speed.y += gravity * timeStep;
	}

	return pointArray;
}

var curve = new THREE.SplineCurve3(createPointArray(orig, speed, gravity, timeStep, pointNumber));

var geometry = new THREE.Geometry();
geometry.vertices = curve.getPoints(60);
geometry.computeLineDistances();
var material = new THREE.LineDashedMaterial({ color: 0xffffff, linewidth: 2, scale: 5, dashSize: 1, gapSize: 0.5 });
var trajectory = new THREE.Line(geometry, material);

scene.add(trajectory);

camera.position.z = 5;

function render() {
	requestAnimationFrame(render);
	renderer.render(scene, camera);
}
render();
