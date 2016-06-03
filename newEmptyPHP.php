<?php //WARNING if log out times during fight ship will be left stranded 
?>
<!DOCTYPE html>
<html>
<head>
<?php
include 'scripts/sql.php';
include 'scripts/security.php';
include "scripts/shipInfo.php";
$ship = new ship($con, $ShipCode);
if(isset($_GET['won'])){
	if($_GET['won']=="true"){
		mysqli_query($con,"UPDATE ships SET Helium=" . ($ship['Helium']+100) . " WHERE ShipCode=" . $ship['ShipCode']);
		echo "<script>window.location.replace('orbit.php');</script>";
	}
}

?>
    <title>Introduction to Computer Graphics</title>  
 <!-- include javascript libraries -->
    <script src="js/three.js"></script>
	<script src="js/THREEx.KeyboardState.js"></script>
        <script src="ships/liberator/build.js"></script>
	
    <script>
	var start = false;
	var scene;
        var spacing=3;
	 //declare a truly global variable to hold weather the user has just shot
	 var justshot=false;
	 //declare the score
	 var score=0;
	 //has the user won?
	 var won = false;
	var dead = false;
	var health = <?php echo $ship->getSheilding(); ?>;
	 var frameRate = 1;
	 var frameCount = 0;
	//function to update the position of objects based on their velocity and position
	function UpdatePosition(asteroid){
	asteroid.object.position.x+=asteroid.velocity.x;
	asteroid.object.position.y+=asteroid.velocity.y;
	asteroid.object.position.z+=asteroid.velocity.z;
	}
	//Function to reverce the velocity if cirtai bounds are hit

	function Collision(position1,position2,r){
	//calculate the distancew the objects are appart and compare it to the distance their surfaces would be appart if they were only just touching
	//find differnces in position vector
	var dx=position1.x-position2.x;
	var dy=position1.y-position2.y;
	var dz=position1.z-position2.z;
	//sum of the squares
	var Exyz = Math.pow(dx,2) + Math.pow(dy,2) + Math.pow(dz,2);
	if(Math.sqrt(Exyz) < r){
	return true;
	}else{
	return false;
	}
	}



	function MoveAlians(alian){
	//variable if they all need to change direction
	var change=false;
	for(x=0;x<alian.length;x++){
		for(z=0;z<alian[x].length;z++){
			alian[x][z].mesh.position.add(alian[x][z].velocity);
                        //alian[x][z].camera.position = alian[x][z].mesh.position;
		if(alian[x][z].mesh.position.x>7*spacing || alian[x][z].mesh.position.x<-7*spacing){
		change= true;
		}
		}
	}
	//if they need to change direction change their direction
	if(change){
	for(x=0;x<alian.length;x++){
		for(z=0;z<alian[x].length;z++){
		alian[x][z].velocity.x = alian[x][z].velocity.x*-1;
		}
	}
	}
	}//end of move alian function
        function renderAlians(alian,renderer,scene){
	for(x=0;x<alian.length;x++){
		for(z=0;z<alian[x].length;z++){
                    alian[x][z].mesh.visible = false;
                    alian[x][z].camera.updateCubeMap( renderer, scene );
                    alian[x][z].mesh.visible = true;
                }
            }
        }

	//function to toggle the justshot
	function Canshoot(){justshot=false;}
	window.onload = function() {
	//define the roation of the camera
	var Crotation = 0.35;//20* in rad
	var pi = 3.1415926;
	var Arotation = pi/2;
	//define all bullits
	var bullit = new Array();
	//set difficulty
	var difficulty =0.001;

        document.getElementById('infoBox').top = window.innerHeight/2-100;
        document.getElementById('infoBox').left = window.innerWidth/2-100;
	

  timeCalculations();
//runLoader();
function update() {
	frameCount++;
	if(keyboard.pressed(" ")&&!dead){
		start=true;
		document.getElementById('infoBoxParent').hidden = true;
	}
	if(start&&!dead){
		ingameUpdate();
	}
}//end function
		//function for the in game mechanics
		function ingameUpdate(){

			//ANIMATE THE SHIP
			liberator.rotation.z+=0.01;

			
			//BULLITS
			//add a bullit when the user presses space
			//define bulit length outsideof if pressed space so alians can shoot
			var blength=bullit.length;
			if(keyboard.pressed("space")){
			if(justshot==false){
			//make new bullit
			bullit[blength] = createBullit(spaceShip.position,true);
			scene.add(bullit[blength].object);
			//stop bullits being produced too quickly
			justshot=true;
			document.getElementById('laser').play()
			setTimeout("Canshoot()",1000);
			}
			}


			
			
			//COLLITIONS
			for(i=0;i<bullit.length;i++){
				//loop the bullits
				if(bullit[i].own){
				//bullit alian collitions
				for(x=0;x<alians.length;x++){
					//X loop alians
					for(z=0;z<alians[x].length;z++){
					//Y loop alians
					//if both objects are actually there
					if(bullit[i].shown && alians[x][z].shown){
					//I'm guessing the sum of the radi is about 2
					if(Collision(bullit[i].object.position,alians[x][z].mesh.position,1)){
					//the objects have collided
					scene.remove(bullit[i].object);
					bullit[i].shown = false;
					scene.remove(alians[x][z].mesh);
					alians[x][z].shown = false;
					score+=10;
					document.getElementById('hit').play()
					document.getElementById("scorecard").innerHTML = "Score: " + score;
					won=false;
					}//End of if collided
					}//end of if there
					}//end of Z loop
				}//end of X loop
				}else{
				//bullit human collisions
				if(Collision(bullit[i].object.position,spaceShip.position,1) && health<5){
				document.getElementById('die').play()
				document.getElementById('infoBox').innerHTML = "<h1>You have lost too much shielding!</h1><p>Your commander has ordered you to retreat as you have lost too much sheilding. It is military policy that you cannot fight with your shielding bellow 5%</p><br /><a href='orbit.php'><input type='button' value='Back to orbit' /></a>";
				document.getElementById('infoBoxParent').hidden = false;
				start= false;
				dead=true;
				}
				if(Collision(bullit[i].object.position,spaceShip.position,1) && health!=0){
				health = health-5;
				document.getElementById('health').width=health*2.5 + "px";
				document.getElementById('healthTXT').innerHTML = health;
				var xmlhttp;
				if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
					xmlhttp=new XMLHttpRequest();
				}else{// code for IE6, IE5
					xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
				}
				xmlhttp.onreadystatechange=function(){
					if (xmlhttp.readyState==4 && xmlhttp.status==200){
						var resp = xmlhttp.responseText;
						//take the responce and put it in the class box
					}
					}
				xmlhttp.open("GET","scripts/combat/hit.php" ,true);
				xmlhttp.send();
				}
				}
			}//end of I loop
			//GAME OVER!
			if(score==300 && won==false){
			//won=true;
			document.getElementById('infoBox').innerHTML = "<h1>You have won!</h1><p>You have been rewareded 100 Helium for your efforts</p><br /><a href='combat.php?won=true'><input type='button' value='Back to orbit' /></a>";
			document.getElementById('infoBoxParent').hidden = false;
			
			var xmlhttp;
			if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
				xmlhttp=new XMLHttpRequest();
			}else{// code for IE6, IE5
				xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
			}
			xmlhttp.onreadystatechange=function(){
				if (xmlhttp.readyState==4 && xmlhttp.status==200){
					var resp = xmlhttp.responseText;
					//take the responce and put it in the class box
					document.getElementById("console").innerHTML = 	document.getElementById("console").innerHTML + '<br />' +  resp;
		
				}
				}
			xmlhttp.open("GET","scripts/combat/won.php" ,true);
			xmlhttp.send();
			
			
			}
			

				
	}
	
		//Render Loop
		function render() {
			//Call the update function
			update();
                        //renderAlians(alians,renderer,scene);
                        for(x=0;x<alians.length;x++){
                            for(z=0;z<alians[x].length;z++){
                                alians[x][z].mesh.visible = false;
                            }
                        }
                        mirrorWingCamera.position = alians[5][1].mesh.position;
                        mirrorWingCamera.updateCubeMap( renderer, scene );
                        for(x=0;x<alians.length;x++){
                            for(z=0;z<alians[x].length;z++){
                                alians[x][z].mesh.visible = true;
                            }
                        }
			//Re-draw the scene
			renderer.render(scene, camera);
			//Re-call the render function when the next frame is ready to be drawn
			requestAnimationFrame(render);
		}
		requestAnimationFrame(render);

    };
    </script>
</head>
<body>

<audio id=laser>
    <source src="http://headstart.cs.aston.ac.uk/projects/2013_July/team5/sound/laserSHORT.wav">
</audio>
<audio id=hit>
    <source src="http://headstart.cs.aston.ac.uk/projects/2013_July/team5/sound/hit.wav">
</audio>
<audio id=die>
    <source src="http://headstart.cs.aston.ac.uk/projects/2013_July/team5/sound/dying.wav">
</audio>
<audio id=pendulum>
    <source src="http://headstart.cs.aston.ac.uk/projects/2013_July/team5/sound/slam.mp3">
</audio>
</body>
</html>
