/* global window, jQuery, THREE */
$(document).ready(function(){
	var scene, camera, renderer, light,light2, controls;
	var wheel1, wheel2, wheel3, wheel4, deck, truck1, truck2, model;
	var skateboard = new THREE.Object3D();
	var canvasWidth = $('.webGLContainer').width();
	var canvasHeight = $('.webGLContainer').height();
	var object = new THREE.Object3D();
	var currentColor, currentMaterial;
	var loader, modelURL, modelGroup; //for collada import
	var arrObjects = [];
	var arrModel = [];
//$('.start-3d').click(function(){
    //$('.configurator').toggleClass('visible');
    init();
    console.log(object);
  //fitTo(20,0,5,20,0,0);
		animate();
    
    //});
function init(){
	// add scene-basics
    scene = new THREE.Scene();
    addCamera();
    addControls();
    addLight();
	addRenderer();
    addColorPads();
	// Axis Helper
	var axisHelper = new THREE.AxisHelper(1000);
	scene.add(axisHelper);
    // add objects
    load3DModel();
}
function animate(){
   	light.position.set(camera.position.x, camera.position.y, camera.position.z);
	requestAnimationFrame(animate);
  	renderer.render(scene, camera);
}
/******************************************* basic scene elements ******************************************/
function addCamera(){
  camera = new THREE.PerspectiveCamera(45, canvasWidth/canvasHeight, 0.1, 10000);
	camera.position.set(500,40,600);
	camera.lookAt(scene.position);
	scene.add(camera);
}
function addControls(){
    controls = new THREE.OrbitControls(camera);
    //controls.addEventListener( 'change', animate );
    controls.enabled = false;
    $('.webGLContainer').mouseover(function(){
            controls.enabled = true;
    });
    $('.webGLContainer').mouseout(function(){
        controls.enabled = false;
    });
}
function addLight(){
    light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(camera.position.x, camera.position.y,camera.position.z);
    scene.add( light );
}
function addRenderer(){
    renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setSize(canvasWidth,canvasHeight);
	renderer.setClearColor(0xffffff,1);
	$(".webGLContainer").append(renderer.domElement);
}
/****** colorpads are not included in the webGL-scene but to each select-field for the attributes ******** */
function addColorPads(){
        var arrColor = [];
        $('.options .Farbe select option').each(function(){
            arrColor.push($(this).val());
        });
        $('.options').children().not('.Farbe').not('.Material').each(function(){
            var html = "<div class='color-container'>";
                $.each(arrColor, function(){
                    html += "<div class='color' id='"+this+"' style='background:#"+this.slice(2,8)+"'></div>"
                });
                html += "</div>";
            $(this).append(html);
        });
}
/*---------------------------------------------------------------------------------------------------------*/
/**************************************** 3d models ********************************************************/
// works only for single model objects
function load3DModel(){
		loader = new THREE.ColladaLoader();
        loader.options.convertUpAxis = true;
        loader.load('files/martin/3d/board.dae', function(collada){
            var board = collada.scene;
            console.log(board);
            var deckPos = board.children[0].position;
            var deckRot = board.children[0].rotation;
            deck = board.children[0].children[0];
            deck.position.set(deckPos.x, deckPos.y, deckPos.z);
            deck.rotation.x = deckRot.x;
            deck.rotation.y = deckRot.y;
            deck.rotation.z = deckRot.z;
            
            
            var truck1Pos = board.children[1].position;
            var truck1Rot = board.children[1].rotation;
            var truck1Geo = board.children[1].geometry;
            var truck1Mat = board.children[1].material;
            truck1 = new THREE.Mesh(truck1Geo, truck1Mat);
            truck1.position.set(truck1Pos.x, truck1Pos.y, truck1Pos.z);
            truck1.rotation.x = truck1Rot.x;
            truck1.rotation.y = truck1Rot.y;
            truck1.rotation.z = truck1Rot.z;
            
            var truck2Pos = board.children[2].position;
            var truck2Rot = board.children[2].rotation;
            truck2 = board.children[2].children[0];
            truck2.position.set(truck2Pos.x, truck2Pos.y, truck2Pos.z);
            truck2.rotation.x = truck2Rot.x;
            truck2.rotation.y = truck2Rot.y;
            truck2.rotation.z = truck2Rot.z;
            
            var wheel1Pos = board.children[3].position;
            var wheel1Rot = board.children[3].rotation;
            wheel1 = board.children[3].children[0];
            wheel1.position.set(wheel1Pos.x, wheel1Pos.y, wheel1Pos.z);
            wheel1.rotation.x = wheel1Rot.x;
            wheel1.rotation.y = wheel1Rot.y;
            wheel1.rotation.z = wheel1Rot.z;
            
            var wheel2Pos = board.children[4].position;
            var wheel2Rot = board.children[4].rotation;
            wheel2 = board.children[4].children[0];
            wheel2.position.set(wheel2Pos.x, wheel2Pos.y, wheel2Pos.z);
            wheel2.rotation.x = wheel2Rot.x;
            wheel2.rotation.y = wheel2Rot.y;
            wheel2.rotation.z = wheel2Rot.z;
            
            var wheel3Pos = board.children[5].position;
            var wheel3Rot = board.children[5].rotation;
            wheel3 = board.children[5].children[0];
            wheel3.position.set(wheel3Pos.x, wheel3Pos.y, wheel3Pos.z);
            wheel3.rotation.x = wheel3Rot.x;
            wheel3.rotation.y = wheel3Rot.y;
            wheel3.rotation.z = wheel3Rot.z;
            
            var wheel4Pos = board.children[6].position;
            var wheel4Rot = board.children[6].children[0];
            wheel4 = board.children[6].children[0];
            wheel4.position.set(wheel4Pos.x, wheel4Pos.y, wheel4Pos.z);
            wheel4.rotation.x = wheel4Rot.x;
            wheel4.rotation.y = wheel4Rot.y;
            wheel4.rotation.z = wheel4Rot.z;
            
            
            wheel1 = board.children[3].children[0];
            wheel2 = board.children[4].children[0];
            wheel3 = board.children[5].children[0];
            wheel4 = board.children[6].children[0];
            
            object.add(deck);
            object.add(truck1);
            object.add(truck2);
            object.add(wheel1);
            object.add(wheel2);
            object.add(wheel3);
            object.add(wheel4);
        });
        scene.add(object);
        
}
/*---------------------------------------------------------------------------------------------------------*/
/**************************************** get 3d models ****************************************************/
function getObjects(){
		var arrHelper = [];
		$('.options div[class^="3D"]').each(function(){
				arrHelper.push($(this).find('option:selected').val());
		});
		return arrHelper;
}
/*---------------------------------------------------------------------------------------------------------*/
/************************* change 3d models after configuration was changed ********************************/
function changeDeck(url){
    //var postion = object.children[0].position;
    //var rotation = object.children[0].rotation;
    var board = object.children[0];
    var position = board.children[0].position;
    var rotation = board.children[0].rotation;
    board.remove(board.children[0]);
    
    loader = new THREE.ColladaLoader();
    loader.options.convertUpAxis = true;
    loader.load(url, function(collada){
        deck = collada.scene;
        console.log(deck);
        deck.position.set(position.x, position.y, position.z);
        deck.rotation.x = rotation.x;
        deck.rotation.y = rotation.y;
        deck.rotation.z = rotation.z;
        object.children[0].children.splice(0,0,deck);
        //wheelX, wheelY, wheelZ, truckX, truckY, truckZ
        if(url.indexOf('longboard')>0){
            fitTo(45.5,0,5,45,1.75,0);
        }
        else{
            fitTo(20,0,5,20,0,0);
        }
        
    });
    
    
}
function changeWheel(url){
    var color = object.children[1].material.color;
    object.children.splice(1,4);
    loader = new THREE.ColladaLoader();
    loader.options.convertUpAxis = true;
    loader.load(url, function(collada){
        modelGroup = collada.scene;
        model = modelGroup.children[modelGroup.children.length-1].children[0];
        var wheelGeo = model.geometry;
        var wheelMat = model.material;
        wheel1 = new THREE.Mesh(wheelGeo, wheelMat);
        wheel1.material.color.setRGB(color.r, color.g, color.b);
        wheel2 = new THREE.Mesh(wheelGeo, wheelMat);
        wheel3 = new THREE.Mesh(wheelGeo, wheelMat);
        wheel4 = new THREE.Mesh(wheelGeo, wheelMat);
        if(url.indexOf('longboard')>0){ 
            wheel1.name = 'longboard';
            
            wheel1.rotation.z = -Math.PI/2;
            wheel1.rotation.y = -Math.PI/128;
            wheel2.rotation.z = Math.PI/2;
            wheel2.rotation.y = Math.PI/128;
            wheel3.rotation.z = -Math.PI/2;
            wheel3.rotation.y = -Math.PI/128;
            wheel4.rotation.z = Math.PI/2;
            wheel4.rotation.y = Math.PI/128;
            
            object.children.splice(1,0, wheel1, wheel2, wheel3, wheel4);
            
            if(object.children[0].name == 'skateboard'){
                if(object.children[5].name == 'skateboard'){
                    fitTo(90,63,225,75,10,210);
                }
                else{
                    fitTo(110,53,220,0,40,210);
                }
            }
            else{
                if(object.children[5].name == 'skateboard'){
                    fitTo(90, 80, 545, 75, 25, 530);
                }
                else{
                    fitTo(110, 68, 540,0, 55, 530);
                }
                
            }
        }
        else if(url.indexOf('skateboard')>0){
        	wheel1.name = 'skateboard';
            
            wheel1.rotation.z = Math.PI/2;
            wheel2.rotation.z = -Math.PI/2;
            wheel3.rotation.z = Math.PI/2;
            wheel4.rotation.z = -Math.PI/2;
            
            object.children.splice(1,0, wheel1, wheel2, wheel3, wheel4);
            
            if(object.children[0].name == 'skateboard'){
                if(object.children[5].name == 'skateboard'){
                    fitTo(90,63,225,75,10,210);
                }
                else{
                    fitTo(110,53,220,0,40,210);
                }
            }
            else{
                if(object.children[5].name == 'skateboard'){
                    fitTo(90, 80, 545, 75, 25, 530);
                }
                else{
                    fitTo(110,68,545,0,55,530);
                }
            }
        }
    });
}
function changeTruck(url){
    var color = object.children[5].material.color;
    object.children.splice(5,6);
    loader = new THREE.ColladaLoader();
    loader.options.convertUpAxis = true;
    loader.load(url, function(collada){
        modelGroup = collada.scene;
        model = modelGroup.children[modelGroup.children.length-1].children[0];
       var truckGeo = model.geometry;
        var truckMat = model.material;
        truck1 = new THREE.Mesh(truckGeo, truckMat);
        truck2 = new THREE.Mesh(truckGeo, truckMat);
        truck1.material.color.setRGB(color.r, color.g, color.b);
       
        if(url.indexOf('longboard')>0){
            truck1.name = 'longboard';
            truck1.rotation.x = Math.PI*0.265;
            truck2.rotation.x = Math.PI*0.735;
             truck1.rotation.z = Math.PI;
            object.children.splice(5,6, truck1, truck2);
            if(object.children[0].name == 'skateboard'){
                fitTo(110,53,220,0,40,210);
            }
            else{
                fitTo(110, 68, 540, 0, 55, 530);
            }
        }
        if(url.indexOf('skateboard')>0){
             truck1.name = 'skateboard';
             truck1.scale.set(1,1,1);
             truck1.rotation.z = Math.PI/2;
             truck1.rotation.y = Math.PI;
             truck1.rotation.x = Math.PI/2;
             truck2.rotation.x = Math.PI/2;
			 truck2.rotation.y = Math.PI;
			 truck2.rotation.z = -Math.PI/2
             object.children.splice(5,6, truck1, truck2);
             if(object.children[0].name == 'skateboard'){
                fitTo(90,63,225,75,10,210);
             }
             else{
                fitTo(90, 80, 545, 75, 25, 530);
             }
        }
    });
}

function fitTo(wheelX, wheelY, wheelZ, truckX, truckY, truckZ){
    console.log(object.children);
    object.children[1].position.set(-truckX,truckY, truckZ);       //wheel1
	object.children[2].position.set(truckX,truckY, truckZ);      //wheel2
	object.children[3].position.set(wheelX,wheelY, wheelZ);       //wheel3
	object.children[4].position.set(wheelX,wheelY, -wheelZ);      //wheel4
	object.children[5].position.set(-wheelX,wheelY,wheelZ);      //truck1
	object.children[6].position.set(-wheelX,wheelY,-wheelZ);      //truck2
}

/*---------------------------------------------------------------------------------------------------------*/
/***************************** check for change of configuration *******************************************/
$('select').change(function(){
    attributeValue = $(this).val();
    attributeName = $(this).parent().parent().attr('class');
    if(attributeName == '3D-Model-Deck'){changeDeck(attributeValue); console.log(object);}
    else if(attributeName == '3D-Model-Wheel'){changeWheel(attributeValue);}
    else if(attributeName == '3D-Model-Achse'){changeTruck(attributeValue);}
});
/***********************************************************************************************************/
/*************************************** scene controls ****************************************************/
$('.control.frontal').click(function(){
	camera.position.set(0,0,1000);
	camera.lookAt(scene.position);
});
$('.control.bird').click(function(){
	camera.position.set(0,-1000,0);
	camera.lookAt(scene.position);
});
$('.control.side').click(function(){
	camera.position.set(1000,0,0);
    camera.lookAt(scene.position);
});
$('.control.iso').click(function(){
	camera.position.set(500,40,600);
	camera.lookAt(scene.position);
});

/*---------------------------------------------------------------------------------------------------------*/

$('.color').click(function(){
     
   var currentObject = $(this).parent().parent().attr('class');
   if(currentObject == '3D-Model-Deck'){
       object.children[0].material.color.setHex($(this).attr('id'));
      
   }
   else if(currentObject == '3D-Model-Wheel'){
        object.children[1].material.color.setHex($(this).attr('id'));
        object.children[2].material.color.setHex($(this).attr('id'));
        object.children[3].material.color.setHex($(this).attr('id'));
        object.children[4].material.color.setHex($(this).attr('id'));
   }
    else if(currentObject == '3D-Model-Achse'){
        object.children[5].material.color.setHex($(this).attr('id'));
        object.children[6].material.color.setHex($(this).attr('id'));
    }
});
$('.shiny').click(function(){
    var currentObject = $(this).parent().parent().attr('class');
    if(currentObject  == '3D-Model_Deck'){
       var currentColor = object.children[0].material.color;
       object.children[0].material = new THREE.MeshPhongMaterial({color: currentColor});
    }
    else if(currentObject == '3D-Model-Wheel'){
        var currentColor = object.children[1].material.color;
        object.children[1].material = new THREE.MeshPhongMaterial({color: currentColor});
        object.children[2].material = new THREE.MeshPhongMaterial({color: currentColor});
        object.children[3].material = new THREE.MeshPhongMaterial({color: currentColor});
        object.children[4].material = new THREE.MeshPhongMaterial({color: currentColor});
    }
    else if(currentObject == '3D-Model-Achse'){
        var currentColor = object.children[5].material.color;
        object.children[5].material = new THREE.MeshPhongMaterial({ color: currentColor});
        object.children[6].material = new THREE.MeshPhongMaterial({ color: currentColor});
        }
});
$('.rough').click(function(){
    var currentObject = $(this).parent().parent().attr('class');
    if(currentObject  == '3D-Model_Deck'){
       var currentColor = object.children[0].material.color;
       object.children[0].material = new THREE.MeshLambertMaterial({color: currentColor});
    }
    else if(currentObject == '3D-Model-Wheel'){
        var currentColor = object.children[1].material.color;
        object.children[1].material = new THREE.MeshLambertMaterial({color: currentColor});
        object.children[2].material = new THREE.MeshLambertMaterial({color: currentColor});
        object.children[3].material = new THREE.MeshLambertMaterial({color: currentColor});
        object.children[4].material = new THREE.MeshLambertMaterial({color: currentColor});
    }
    else if(currentObject == '3D-Model-Achse'){
        var currentColor = object.children[5].material.color;
        object.children[5].material = new THREE.MeshLambertMaterial({color: currentColor});
        object.children[6].material = new THREE.MeshLambertMaterial({color: currentColor});
    }
});
    

    
});
