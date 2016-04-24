var renderer, scene, camera, mesh, sphere, speedX, speedY, initialX, initialY, mouseDragg, line, onMovement, point;
var missile, timeStep, gravity, world;
var trajectory;
var enemies;
var anime=true;
var level = 1;
var score = 0;

init();
animate();

function init() {
    gravity = -1000;
	
    /* Create world with gravity */
    world = new CANNON.World();
    world.gravity.set(0, gravity, 0);

    /* Use default algorithm to compute collisions */
    world.broadphase = new CANNON.NaiveBroadphase();
	var mass;
    /* Time step in seconds */
    timeStep = 1.0 / 60.0;

    // on initialise le moteur de rendu sur le canvas game
    renderer = new THREE.WebGLRenderer({canvas: document.getElementById("game")});

    // si WebGL ne fonctionne pas sur votre navigateur vous pouvez utiliser le moteur de rendu Canvas à la place
    // renderer = new THREE.CanvasRenderer();
    renderer.setSize(window.innerWidth * 0.98, window.innerHeight * 0.85);
    document.getElementById('container').appendChild(renderer.domElement);
    renderer.setClearColor(0xcef0f9, 1);
	
    // on initialise la scène
    scene = new THREE.Scene();

    camera = makeCamera();
	
	var infoLvl = makeInfoLevel();
	var infoScore = makeScore();

	initLevel(level, scene,world);

    //est-on en train de bouger la balle avec le click enfoncé ? 
    mouseDragg = false;

    //garde les informations X et Y au moment où l'on lance la balle
    initialX = 0;
    initialY = 0;

    //la balle est-elle en mouvement ?
    onMovement = false;

    
    // ajout des evenement souris
    document.addEventListener('mousedown', onDocumentMouseDown, false);
    document.addEventListener('mouseup', onDocumentMouseUp, false);
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    // on ajoute une lumière blanche
    var lumiere = new THREE.DirectionalLight(0xffffff, 1.0);
    lumiere.position.set(0, 0, 400);
    scene.add(lumiere);


    var material = new THREE.LineDashedMaterial({
        color: 0x663300,
        linewidth: 2,
        scale: 1,
        dashSize: 20,
        gapSize: 20
    });
    trajectory = TRAJECTORY(scene, gravity, timeStep, 120, material);

    renderer.render(scene, camera);

}

function onDocumentMouseDown(event) {
    var vector = new THREE.Vector3();
    vector.set(( event.clientX / window.innerWidth ) * 2 - 1, -(event.clientY / window.innerHeight ) * 2 + 1, 0);
    vector.unproject(camera);
    var dir = vector.sub(camera.position).normalize();
    var distance = -camera.position.z / dir.z;
    pos = camera.position.clone().add(dir.multiplyScalar(distance));
    if (pos.x > -700 && pos.x < -500 && pos.y > -100 && pos.y < 100) {

        mouseDragg = true;

        sphere.position.x = pos.x;
        sphere.position.y = pos.y;
        trajectory.setOrigPoint(pos);
        onMovement = false;
        /*
        point.position.x = pos.x;
        point.position.y = pos.y;
        */

        
        renderer.render(scene, camera);
    }
}

function onDocumentMouseUp(event) {
    var vector = new THREE.Vector3();
    vector.set(( event.clientX / window.innerWidth ) * 2 - 1, -(event.clientY / window.innerHeight ) * 2 + 1, 0);
    vector.unproject(camera);
    var dir = vector.sub(camera.position).normalize();
    var distance = -camera.position.z / dir.z;
    //var pos = camera.position.clone().add(dir.multiplyScalar(distance));
    speedX = (-600 - pos.x) * 5;
    speedY = (0 - pos.y) * 5;
    onMovement = true;

    scene.remove(line);
    renderer.render(scene, camera);

    if (mouseDragg) {
        mouseDragg = false;
        missile.velocity = new CANNON.Vec3(speedX, speedY, 0);
    }
}

function onDocumentMouseMove(event) {
    if (mouseDragg) {
        var vector = new THREE.Vector3();
        vector.set(( event.clientX / window.innerWidth ) * 2 - 1, -(event.clientY / window.innerHeight ) * 2 + 1, 0);
        vector.unproject(camera);
        var dir = vector.sub(camera.position).normalize();
        var distance = -camera.position.z / dir.z;
        pos = camera.position.clone().add(dir.multiplyScalar(distance));
        if (pos.x < -900) {
            pos.x = -900;
        } else if (pos.x > -200) {
            pos.x = -200;
        }
        if (pos.y < -400) {
            pos.y = -400;
        } else if (pos.y > 400) {
            pos.y = 400;
        }
        sphere.position.x = pos.x;
        sphere.position.y = pos.y;

        missile.position.x = pos.x;
        missile.position.y = pos.y;

        speedX = (-600 - pos.x) * 5;
        speedY = (0 - pos.y) * 5;

        trajectory.setOrigPoint(pos.x, pos.y, 0);
        trajectory.setOrigSpeed(speedX, speedY, 0);
        trajectory.changeTrajectory();

        renderer.render(scene, camera);
    }
}

function animate() {
	
	requestAnimationFrame(animate);
	if(anime){
		if (onMovement) {
			updatePhysics();
		}
	
		renderer.render(scene, camera);
	}
}

function updatePhysics() {
    world.step(timeStep);
    sphere.position.copy(missile.position);
}

function save() {
	var file = new ActiveXObject("Scripting.FileSystemObject");
	var a = file.CreateTextFile("c:\Desktop\avancement.txt", true);
	a.WriteLine(level+score);
	a.Close();
}

function load(){

	var fileSystem=new ActiveXObject("Scripting.FileSystemObject");
	var monfichier=fileSystem.OpenTextFile("c:\Desktop\avancement.txt", 1 ,true);
	level = monfichier.Read(1);
	var all = monfichier.ReadAll();
	score = all.substr(1, all.length-2);
	initLevel(level, scene,world);
	infoScore=makeScore();
	monFichier.Close();

}