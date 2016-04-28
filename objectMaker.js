//création afficheur Level
function makeInfoLevel(){

	infoLvl = document.createElement('div');
    infoLvl.style.position = 'absolute';
    infoLvl.style.top = '10px';
    infoLvl.style.width = '100%';
    infoLvl.style.textAlign = 'left';
    infoLvl.style.fontSize = '25px';
    infoLvl.innerHTML = 'Level 1';
    container.appendChild(infoLvl);
	
	return infoLvl;
}

//création afficheur Score
function makeScore(){

	infoScore = document.createElement('div');
    infoScore.style.position = 'absolute';
    infoScore.style.top = '10px';
    infoScore.style.right = '30px';
    infoScore.style.width = '100%';
    infoScore.style.textAlign = 'right';
    infoScore.style.fontSize = '25px';
    infoScore.innerHTML = 'Score : '+score;
    container.appendChild(infoScore);
	
	return infoScore;

}

//création camera
function makeCamera(){
	// on initialise la camera que l’on place ensuite sur la scène
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set(0, 0, 1500);
    scene.add(camera);
    container = document.createElement('div');
    document.body.appendChild(container);
	
	return camera;
}

//création du parterre
function makeFloor(scene, world){
	var mass = 0;
	var geometry = new THREE.CubeGeometry(window.innerWidth * 1.3, 100, 200);
    var material = new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture('texture-herbe.png')});
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.setX(30);
    mesh.position.setY(-600);
    var edges = new THREE.EdgesHelper(mesh, 0x000000);
    scene.add(mesh);
    scene.add(edges);

    var boxShape = new CANNON.Box(new CANNON.Vec3(window.innerWidth * 1.3 / 2, 50, 100));
    var box = new CANNON.Body({mass: mass, shape: boxShape});
    box.position.copy(mesh.position);
    world.add(box);
	
	return mesh;

}


//création d'un projectile sous forme de sphere
function makeProjectile(scene, world){
	//création Projectile
    var geometrySphere = new THREE.SphereGeometry(50, 32, 10);
    var materialSphere = new THREE.MeshBasicMaterial({color: "#2194ce"});
    sphere = new THREE.Mesh(geometrySphere, materialSphere);
    sphere.position.setX(-600);
    sphere.position.setY(0);

    scene.add(sphere);
	
	var mass = 5, radius = 50;
    var sphereShape = new CANNON.Sphere(radius);
    var missile = new CANNON.Body({mass: mass, shape: sphereShape});
    missile.position.copy(sphere.position);
    world.add(missile);
	
	return missile;
}

//crée le support sur lequel est posé la balle au départ
function makeSupportProjectile(scene, world){
	// Cylinder Geometry params : CylinderGeometry(radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded, thetaStart, thetaLength)
    var geometryPilier = new THREE.CylinderGeometry(20, 20, 550, 16);
    var materialPilier = new THREE.MeshBasicMaterial({color: 0xfff000});
    var cylinderPilier = new THREE.Mesh(geometryPilier, materialPilier);

    cylinderPilier.position.setX(-600);
    cylinderPilier.position.setY(-300);

    var edgesPiller = new THREE.EdgesHelper(cylinderPilier, 0x000000);

    scene.add(cylinderPilier);
    scene.add(edgesPiller);
}

//cree une obstacle ayant une couleur
function makeObstacleColor(scene, world, height, width, posX, posY, color){
	var mass = 0;
	var obstacle = new THREE.CubeGeometry(height, width, 100);
    var obsMaterial ;
	
	obsMaterial= new THREE.MeshBasicMaterial({color: color});
    
	var mesh = new THREE.Mesh(obstacle, obsMaterial);
    mesh.position.setX(posX);
    mesh.position.setY(posY);
    var edges = new THREE.EdgesHelper(mesh, 0x000000);
    scene.add(mesh);
    scene.add(edges);

    var boxShape = new CANNON.Box(new CANNON.Vec3(height/2, width/2, 50));
    var box = new CANNON.Body({mass: mass, shape: boxShape});
    box.position.copy(mesh.position);
    world.add(box);
	
	return obstacle;
	
}

//cree une obstacle ayant une texture
function makeObstacleTexture(scene, world, height, width, posX, posY, texture){
	var mass = 0;
	var obstacle = new THREE.CubeGeometry(height, width, 100);
    var obsMaterial ;

	obsMaterial = new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture(texture)});
	
	var mesh = new THREE.Mesh(obstacle, obsMaterial);
    mesh.position.setX(posX);
    mesh.position.setY(posY);
    var edges = new THREE.EdgesHelper(mesh, 0x000000);
    scene.add(mesh);
    scene.add(edges);

    var boxShape = new CANNON.Box(new CANNON.Vec3(height/2, width/2, 50));
    var box = new CANNON.Body({mass: mass, shape: boxShape});
    box.position.copy(mesh.position);
    world.add(box);
	
	return obstacle;
	
}


function makeEnemy(scene, world, height, width, posX, posY, color, enemies, numEnemy) {

	var mass = 0;
	//var enemy = new THREE.CubeGeometry( height, width, 100 );
	var enemy = new THREE.CylinderGeometry( 0, width, height, 4, 1 );

	var enemyMaterial= new THREE.MeshBasicMaterial({color: color});
    
	var mesh = new THREE.Mesh(enemy, enemyMaterial);
    mesh.position.setX(posX);
    mesh.position.setY(posY);
	
    var edges = new THREE.EdgesHelper(mesh, 0x000000);
    scene.add(mesh);
    scene.add(edges);
	
	
	
    var boxShape = new CANNON.Box(new CANNON.Vec3(height/2, width/2, 50));
	boxShape.collisionResponse =true;
    var box = new CANNON.Body({mass: mass, shape: boxShape});
    box.position.copy(mesh.position);
	
	box.addEventListener('collide', function(event){
        scene.remove(mesh);
        scene.remove(edges);
        score+=100;
        infoScore.innerHTML = 'Score : '+score;
        world.remove(box);
        enemies.pop(numEnemy);
	});
    var e = {};
    e.mesh = mesh;
    e.edges = edges;
    e.box = box;
    enemies[numEnemy] = e;
	numEnemy++;
    world.add(box);
	return numEnemy;
}
