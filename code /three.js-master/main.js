
var renderer, scene, camera, mesh;

init();


function init(){
    // on initialise le moteur de rendu
    renderer = new THREE.WebGLRenderer();

    // si WebGL ne fonctionne pas sur votre navigateur vous pouvez utiliser le moteur de rendu Canvas à la place
    // renderer = new THREE.CanvasRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.getElementById('container').appendChild(renderer.domElement);

    // on initialise la scène
    scene = new THREE.Scene();
	
	 // on initialise la camera que l’on place ensuite sur la scène
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.set(0, 0, 1000);
	renderer.render(scene, camera);
	//ajout du sol
	var geometry = new THREE.CubeGeometry( window.innerWidth*0.90, 100, 0);
	var material = new THREE.MeshBasicMaterial( {color: 0x660000,  wireframeLinewidth: 5});
	var cube = new THREE.Mesh( geometry, material );
	//il faut savoir que les positions se font depuis  le centre de l'écran
	cube.position.setX(0)
	//donc ici - (la hauteur de l'ecran divisé par environ 2)
	cube.position.setY(-1*window.innerHeight/2.2);
	scene.add( cube );
	


 // on ajoute une lumière blanche
    var lumiere = new THREE.DirectionalLight( 0xffffff, 1.0 );
    lumiere.position.set( 0, 0, 400 );
    scene.add( lumiere );
	    //la camera s'ajoute toujours après les objets
    scene.add(camera);
	
    
	
	//////////////////////////////////////////////////////////////////////////////////
	//		create a Plane for THREEx.HtmlMixer				//
	//////////////////////////////////////////////////////////////////////////////////
	

	// create the iframe element
	var domElement	= document.createElement('iframe')
	domElement.src	= 'boutons.html';
	domElement.style.border	= 'none'
	
	window.addEventListener('resize', onResize, false)


}

	//////////////////////////////////////////////////////////////////////////////////
	//		handle resize							//
	//////////////////////////////////////////////////////////////////////////////////

	function onResize(){
		// notify the renderer of the size change
		renderer.setSize( window.innerWidth, window.innerHeight )
		// update the camera
		camera.aspect	= window.innerWidth / window.innerHeight
		camera.updateProjectionMatrix()		
	}

	


