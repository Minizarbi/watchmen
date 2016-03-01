
var renderer, scene, camera, mesh;

init();
animate();

function init(){
    // on initialise le moteur de rendu
    renderer = new THREE.WebGLRenderer();

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

                var infoLvl = document.createElement( 'div' );
                infoLvl.style.position = 'absolute';
                infoLvl.style.top = '10px';
                infoLvl.style.width = '100%';
                infoLvl.style.textAlign = 'left';
				infoLvl.style.fontSize ='25px';
                infoLvl.innerHTML = 'Level 1';
                container.appendChild( infoLvl );
				
				var infoScore = document.createElement( 'div' );
                infoScore.style.position = 'absolute';
                infoScore.style.top = '10px';
				infoScore.style.right = '30px';
                infoScore.style.width = '100%';
                infoScore.style.textAlign = 'right';
				infoScore.style.fontSize ='25px';
                infoScore.innerHTML = 'Score : 0';
                container.appendChild( infoScore );
    // on créé un  cube au quel on définie un matériau puis on l’ajoute à la scène
    /*var geometry = new THREE.CubeGeometry( 200, 200, 200 );
    var material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );
    mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );*/

        // on créé la sphère et on lui applique une texture sous forme d’image
        var geometry = new THREE.CubeGeometry(window.innerWidth*1.3, 100, 200 );
        var material = new THREE.MeshBasicMaterial( { color:"#2194ce" } );
        mesh = new THREE.Mesh( geometry, material );
		mesh.position.setX(30);
		mesh.position.setY(-600);
		
		edges = new THREE.EdgesHelper(  mesh, 0x000000 );
		
		scene.add(  mesh );
		scene.add( edges );
		
		var mouseDragg=false;
		/*
		  var shape = new THREE.TextGeometry("Level 1", {font: 'helvetiker'});
		var wrapper = new THREE.MeshNormalMaterial({color: 0x00ff00});
		var words = new THREE.Mesh(shape, wrapper);
		words.position.setX(0);
		
		scene.add(words);
*/
		document.addEventListener( 'mousedown', onDocumentMouseDown, false );
		document.addEventListener( 'mouseup', onDocumentMouseUp, false );
		document.addEventListener('mousemove',onDocumentMouseMove, false);
        // on ajoute une lumière blanche
        var lumiere = new THREE.DirectionalLight( 0xffffff, 1.0 );
        lumiere.position.set( 0, 0, 400 );
        scene.add( lumiere );
		 var texture = THREE.TextureLoader('texture-herbe.png', {}, function() {
    renderer.render(scene)});
 renderer.render( scene, camera );
 
}

function onDocumentMouseDown( event ) {
				mouseDragg= true;
				mesh.rotation.x = ( event.clientX - window.innerWidth/2 );
				mesh.rotation.y = ( event.clientY - window.innerHeight/2 );
}

function onDocumentMouseUp( event ) {
				mouseDragg= false;
				mesh.rotation.x = ( event.clientX - window.innerWidth/2 );
				mesh.rotation.y = ( event.clientY - window.innerHeight/2 );
}

function onDocumentMouseMove( event ) {
			if(mouseDragg==true){	
				mesh.rotation.x = ( event.clientX - window.innerWidth/2 );
				mesh.rotation.y = ( event.clientY - window.innerHeight/2 );
			}
}

function animate(){
    requestAnimationFrame( animate );
	
    //mesh.rotation.x += 0.01;

    renderer.render( scene, camera );
}
