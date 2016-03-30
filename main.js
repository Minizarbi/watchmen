
var renderer, scene, camera, mesh, sphere, speedX, speedY, initialX, initialY,mouseDragg, line,onMovement,point;

init();
animate();

function init(){
    // on initialise le moteur de rendu sur le canvas game
    renderer = new THREE.WebGLRenderer({canvas: document.getElementById("game")});

    // si WebGL ne fonctionne pas sur votre navigateur vous pouvez utiliser le moteur de rendu Canvas à la place
    // renderer = new THREE.CanvasRenderer();
    renderer.setSize( window.innerWidth*0.98, window.innerHeight*0.85 );
    document.getElementById('container').appendChild(renderer.domElement);
    renderer.setClearColor( 0xffffff, 1 );
    // on initialise la scène
    scene = new THREE.Scene();

    // on initialise la camera que l’on place ensuite sur la scène
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.set(0, 0, 1500);
    scene.add(camera);
    container = document.createElement( 'div' );
    document.body.appendChild( container );
    //création afficheur lvl
    var infoLvl = document.createElement( 'div' );
    infoLvl.style.position = 'absolute';
    infoLvl.style.top = '10px';
    infoLvl.style.width = '100%';
    infoLvl.style.textAlign = 'left';
    infoLvl.style.fontSize ='25px';
    infoLvl.innerHTML = 'Level 1';
    container.appendChild( infoLvl );
    //création afficheur Score
    var infoScore = document.createElement( 'div' );
    infoScore.style.position = 'absolute';
    infoScore.style.top = '10px';
    infoScore.style.right = '30px';
    infoScore.style.width = '100%';
    infoScore.style.textAlign = 'right';
    infoScore.style.fontSize ='25px';
    infoScore.innerHTML = 'Score : 0';
    container.appendChild( infoScore );

	var edges ; 
	var obstacle =  new THREE.CubeGeometry( 250 , 250 ,100 ) ;
	var obsMaterial = new THREE.MeshBasicMaterial( { map : THREE.ImageUtils.loadTexture('bois.jpeg') } ) ; 
	mesh = new THREE.Mesh( obstacle, obsMaterial );
	mesh.position.setX(60);
    mesh.position.setY(-400);
	scene.add(  mesh );
	obstacle =  new THREE.CubeGeometry( 250 , 250 ,100 ) ;
	obsMaterial = new THREE.MeshBasicMaterial( { map : THREE.ImageUtils.loadTexture('bois.jpeg') } ) ; 
	mesh = new THREE.Mesh( obstacle, obsMaterial );
	mesh.position.setX(325);
    mesh.position.setY(-400);
	scene.add(  mesh );
	obstacle =  new THREE.CubeGeometry( 250 , 250 ,100 ) ;
	obsMaterial = new THREE.MeshBasicMaterial( { map : THREE.ImageUtils.loadTexture('bois.jpeg') } ) ; 
	mesh = new THREE.Mesh( obstacle, obsMaterial );
	mesh.position.setX(625);
    mesh.position.setY(-400);
	scene.add(  mesh );
	obstacle =  new THREE.CubeGeometry( 250 , 50 ,100 ) ;
	obsMaterial = new THREE.MeshBasicMaterial( { color : "#ce873e" } ) ; 
	mesh = new THREE.Mesh( obstacle, obsMaterial );
	mesh.position.setX(875);
    mesh.position.setY(-300);
    edges = new THREE.EdgesHelper(  mesh, 0x000000 );
	scene.add(  mesh );
	scene.add( edges );
	
	obstacle =  new THREE.CubeGeometry( 50 , 250 ,100 ) ;
	obsMaterial = new THREE.MeshBasicMaterial( { color : "#ce873e" } ) ; 
	mesh = new THREE.Mesh( obstacle, obsMaterial );
	mesh.position.setX(775);
    mesh.position.setY(-400);
    edges = new THREE.EdgesHelper(  mesh, 0x000000 );
	scene.add(  mesh );
	scene.add( edges );
	
	
	obstacle =  new THREE.CubeGeometry( 50 , 250 ,100 ) ;
	obsMaterial = new THREE.MeshBasicMaterial( { color : "#ce873e" } ) ; 
	mesh = new THREE.Mesh( obstacle, obsMaterial );
	mesh.position.setX(975);
    mesh.position.setY(-150);
    edges = new THREE.EdgesHelper(  mesh, 0x000000 );
	scene.add(  mesh );
	scene.add( edges );
	
	obstacle =  new THREE.CubeGeometry( 250 , 50 ,100 ) ;
	obsMaterial = new THREE.MeshBasicMaterial( { color : "#ce873e" } ) ; 
	mesh = new THREE.Mesh( obstacle, obsMaterial );
	mesh.position.setX(875);
    mesh.position.setY(-50);
    edges = new THREE.EdgesHelper(  mesh, 0x000000 );
	scene.add(  mesh );
	scene.add( edges );
	
	obstacle =  new THREE.CubeGeometry( 50 , 250 ,100 ) ;
	obsMaterial = new THREE.MeshBasicMaterial( { color : "#ce873e" } ) ; 
	mesh = new THREE.Mesh( obstacle, obsMaterial );
	mesh.position.setX(775);
    mesh.position.setY(-150);
    edges = new THREE.EdgesHelper(  mesh, 0x000000 );
	scene.add(  mesh );
	scene.add( edges );
	
	
	obstacle =  new THREE.CubeGeometry( 50 , 250 ,100 ) ;
	obsMaterial = new THREE.MeshBasicMaterial( { color : "#ce873e" } ) ; 
	mesh = new THREE.Mesh( obstacle, obsMaterial );
	mesh.position.setX(975);
    mesh.position.setY(-400);
    edges = new THREE.EdgesHelper(  mesh, 0x000000 );
	scene.add(  mesh );
	scene.add( edges );
	
	obstacle =  new THREE.CubeGeometry( 250 , 250 ,100 ) ;
	obsMaterial = new THREE.MeshBasicMaterial( { map : THREE.ImageUtils.loadTexture('bois.jpeg') } ) ; 
	mesh = new THREE.Mesh( obstacle, obsMaterial );
	mesh.position.setX(625);
    mesh.position.setY(-150);
    edges = new THREE.EdgesHelper(  mesh, 0x000000 );
	scene.add(  mesh );
	scene.add( edges );
	
	
	
    // on créé la cube et on lui applique une texture sous forme d’image
    var geometry = new THREE.CubeGeometry(window.innerWidth*1.3, 100, 200 );
    var material = new THREE.MeshBasicMaterial( { map : THREE.ImageUtils.loadTexture('texture-herbe.png') } );
    mesh = new THREE.Mesh( geometry, material );
    mesh.position.setX(30);
    mesh.position.setY(-600);

    edges = new THREE.EdgesHelper(  mesh, 0x000000 );

    scene.add(  mesh );
    scene.add( edges );

    var geometrySphere = new THREE.SphereGeometry( 50, 32, 10 );
    var materialSphere = new THREE.MeshBasicMaterial( {color: "#2194ce" } );
    sphere = new THREE.Mesh(  geometrySphere, materialSphere );
    sphere.position.setX(-600);
    sphere.position.setY(0);

    scene.add( sphere );
    //est-on en train de bouger la balle avec le click enfoncé ? 
    mouseDragg=false;
    //garde les informations X et Y au moment où l'on lance la balle
    initialX=0;
    initialY=0;
    var geometry = new THREE.Geometry();
    point =new THREE.Vector2( -600, 0 );
    geometry.vertices.push(
    new THREE.Vector2( -600, 0 )

    );
    geometry.vertices.push(point);
    geometry.computeLineDistances();
    var lineMaterial = new THREE.LineBasicMaterial({color: 0x000000});
    line = new THREE.Line( geometry,  material );
    scene.add(line);
    //la balle est-elle en mouvement ?
    onMovement=false;

    document.addEventListener( 'mousedown', onDocumentMouseDown, false );
    document.addEventListener( 'mouseup', onDocumentMouseUp, false );
    document.addEventListener('mousemove',onDocumentMouseMove, false);
    // on ajoute une lumière blanche
    var lumiere = new THREE.DirectionalLight( 0xffffff, 1.0 );
    lumiere.position.set( 0, 0, 400 );
    scene.add( lumiere );

    renderer.render( scene, camera );
	
	
}

function onDocumentMouseDown( event ) {
    mouseDragg= true;
    var vector = new THREE.Vector3();
    vector.set(( event.clientX / window.innerWidth ) * 2 - 1,-(event.clientY / window.innerHeight ) * 2 + 1,0 );
    vector.unproject( camera );
    var dir = vector.sub( camera.position ).normalize();
    var distance = - camera.position.z / dir.z;
    var pos = camera.position.clone().add( dir.multiplyScalar( distance ) );
    sphere.position.x=pos.x;
    sphere.position.y=pos.y;
    onMovement=false;
    point.position.x=pos.x;
    point.position.y=pos.y;
}


function onDocumentMouseUp( event ) {
    mouseDragg= false;

    var vector = new THREE.Vector3();
    vector.set(( event.clientX / window.innerWidth ) * 2 - 1,-(event.clientY / window.innerHeight ) * 2 + 1,0 );
    vector.unproject( camera );
    var dir = vector.sub( camera.position ).normalize();
    var distance = - camera.position.z / dir.z;
    var pos = camera.position.clone().add( dir.multiplyScalar( distance ) );
    initialX=pos.x;
    initialY=pos.y;
    speedX=(-600-initialX)/20;
    speedY=(0-initialY)/20;
    onMovement=true;
}

function onDocumentMouseMove( event ) {
    if(mouseDragg==true){	
	var vector = new THREE.Vector3();
	vector.set(( event.clientX / window.innerWidth ) * 2 - 1,-(event.clientY / window.innerHeight ) * 2 + 1,0 );
	vector.unproject( camera );
	var dir = vector.sub( camera.position ).normalize();
	var distance = - camera.position.z / dir.z;
	var pos = camera.position.clone().add( dir.multiplyScalar( distance ) );

	sphere.position.x= pos.x;
	sphere.position.y= pos.y;
	point.position.x=pos.x;
	point.position.y=pos.y;
    }
}

function animate(){
    requestAnimationFrame( animate );
    if(onMovement){
	var oldX=sphere.position.x;
	var oldY=sphere.position.y;

	sphere.position.x=oldX+speedX;

	sphere.position.y=oldY+speedY;
    }
    renderer.render( scene, camera );
}

