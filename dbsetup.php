<?php
error_reporting(E_ALL);
ini_set("display_errors",1);
// Create connection to database
$con=mysqli_connect("localhost","root","space(11)");
// Check connection
if (mysqli_connect_errno($con))
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }
// Create database
$sql="CREATE DATABASE invaders";
if (mysqli_query($con,$sql))
  {
  echo "Database my_db created successfully";
  }
else
  {
  echo "Error creating database: " . mysqli_error($con);
  }
mysqli_close($con);
include 'scripts/sql.php';
// Create main table
$sql="CREATE TABLE users(FID INT,Name TEXT, CurrentShip INT,Experiance INT, PRIMARY KEY (FID))";
// Execute query
if (mysqli_query($con,$sql))
  {
  echo "Table Users created successfully<br/>";
  mysqli_query($con,"INSERT INTO users (FID,Name,CurrentShip,Experiance) VALUES (738392784,'James Hylands',1,0)");
  }
else
  {
  echo "Error creating table: " . mysqli_error($con);
  }

// Create questions table
$sql="CREATE TABLE ships(ShipCode INT AUTO_INCREMENT,ShipType INT, ShipName TEXT, OwnerID INT, Metal INT, Helium INT, Uranium INT, Electricity INT, Bombs INT, Location INT, Sheilding INT, ShipsDestroyed INT, ShotsFired INT, PRIMARY KEY (ShipCode))";
// Execute query
if (mysqli_query($con,$sql))
  {
  echo "Table persons created successfully<br/>";
  mysqli_query($con,"INSERT INTO ships (ShipType,OwnerID,ShipName,Metal,Helium,Uranium,Electricity,Bombs,Location,Sheilding) VALUES (1,738392784,'Liberator',100,100,100,100,0,3,100)");
  }
else
  {
  echo "Error creating table: " . mysqli_error($con);
  }
// Create questions table
$sql="CREATE TABLE shipTypes(shipType INT AUTO_INCREMENT, BuildCode TEXT, MetalCost INT, HeliumCost INT, UraniumCost INT, ElectricalCost INT, Storage INT, Battery INT, HeliumConsumption INT, UraniumConsumption INT, ElectricConsumption INT, SolarEffecientcy FLOAT,LaserPower INT , PlasmaPower INT, BombStorageCapacity INT, Sheilding INT, PRIMARY KEY (ShipType))";
// Execute query
if (mysqli_query($con,$sql))
  {
  echo "Table persons created successfully<br/>";
  $QRY = "INSERT INTO shipTypes (BuildCode,MetalCost,HeliumCost,UraniumCost,ElectricalCost,Storage,Battery,HeliumConsumption,UraniumConsumption,ElectricConsumption,SolarEffecientcy,LaserPower,PlasmaPower,BombStorageCapacity,Sheilding) VALUES('
	var Geometry1 = new THREE.SphereGeometry(2,32,32);
	var Material1 = new THREE.MeshPhongMaterial({color:0x0000FF,side:THREE.DoubleSide});
	var comp1 = new THREE.Mesh(Geometry1,Material1);
	comp1.position.x=-1;
	var Geometry2 = new THREE.CylinderGeometry(1,1,5,32);
	var Material2 = new THREE.MeshPhongMaterial({color:0xc0c0c0});
	var comp2 = new THREE.Mesh(Geometry2,Material2);
	comp2.position.x=3;
	comp2.rotation.z = Math.PI/2;
	var Geometry3 = new THREE.CylinderGeometry(0,1,2,32);
	var comp3 = new THREE.Mesh(Geometry3,Material2);
	comp3.position.x=6;
	comp3.rotation.z=-Math.PI/2;
	var Geometry4 = new THREE.PlaneGeometry(5,1);
	var comp4 = new THREE.Mesh(Geometry4,Material2);
	comp4.rotation.z = Math.PI/4;
	comp4.position  = new THREE.Vector3(3,2,0);
	var comp5 = new THREE.Mesh(Geometry2,Material2);
	comp5.position = new THREE.Vector3(3,4,0);
	comp5.rotation.z=-Math.PI/2;
	var comp6 = new THREE.Mesh(Geometry3,Material2);
	comp6.position = new THREE.Vector3(6,4,0);
	comp6.rotation.z=-Math.PI/2;
	var Geometry7 = new THREE.SphereGeometry(1,32,32);
	var comp7 = new THREE.Mesh(Geometry7,Material2);
	comp7.position = new THREE.Vector3(0.5,4,0);
	var Geometry8 = new THREE.PlaneGeometry(5,1);
	var comp8 = new THREE.Mesh(Geometry8,Material2);
	comp8.rotation.z = -Math.PI/4;
	comp8.rotation.x = -Math.PI/4;
	comp8.position = new THREE.Vector3(3,-1.4,1.4);
	var Geometry9 = new THREE.PlaneGeometry(5,1,32,32);
	var comp9 = new THREE.Mesh(Geometry9,Material2);
	comp9.rotation.z = -Math.PI/4;
	comp9.rotation.x = Math.PI/4;
	comp9.position = new THREE.Vector3(3,-1.4,-1.4);
	var Geometry10 = new THREE.SphereGeometry(1,32,32);
	var comp10 = new THREE.Mesh(Geometry10,Material2);
	comp10.position = new THREE.Vector3(0.5,-2.8,2.8);
	var comp11 = new THREE.Mesh(Geometry10,Material2);
	comp11.position = new THREE.Vector3(0.5,-2.8,-2.8);
	var comp12 = new THREE.Mesh(Geometry2,Material2);
	comp12.position = new THREE.Vector3(6,-2.8,-2.8);
	comp12.rotation.z=-Math.PI/2;
	var comp13 = new THREE.Mesh(Geometry2,Material2);
	comp13.position = new THREE.Vector3(6,-2.8,2.8);
	comp13.rotation.z=Math.PI/2;
	var comp14 = new THREE.Mesh(Geometry2,Material2);
	comp14.position = new THREE.Vector3(3,-2.8,2.8);
	comp14.rotation.z=-Math.PI/2;
	var comp15 = new THREE.Mesh(Geometry2,Material2);
	comp15.position = new THREE.Vector3(3,-2.8,-2.8);
	comp15.rotation.z=-Math.PI/2;
	spaceShip.add(comp1);
	spaceShip.add(comp2);
	spaceShip.add(comp3);
	spaceShip.add(comp4);
	spaceShip.add(comp5);
	spaceShip.add(comp6);
	spaceShip.add(comp7);
	spaceShip.add(comp8);
	spaceShip.add(comp9);
	spaceShip.add(comp10);
	spaceShip.add(comp11);
	spaceShip.add(comp12);
	spaceShip.add(comp13);
	spaceShip.add(comp14);
	spaceShip.add(comp15);
	spaceShip.rotation.y=Math.PI/2;
',100,100,100,1000,10000,10000,1,1,1,0.3,10,10,2,100)";
echo "<br />" . $QRY . "<br />";
  mysqli_query($con,$QRY);
  }
else
  {
  echo "Error creating table: " . mysqli_error($con);
  }
// Create questions table
$sql="CREATE TABLE locations(PlaceID INT AUTO_INCREMENT, PlaceName TEXT, PlanetURL TEXT, OrbitalRadius FLOAT,MetalPrice FLOAT, HeliumPrice FLOAT,UraniumPrice FLOAT, Temperature FLOAT, SurfaceGravity FLOAT, Tax FLOAT, PRIMARY KEY (PlaceID))";
// Execute query
if (mysqli_query($con,$sql))
  {
  echo "Table persons created successfully<br/>";
  mysqli_query($con,"INSERT INTO locations (PlaceName,PlanetURL,OrbitalRadius,MetalPrice,HeliumPrice,UraniumPrice,Temperature,SurfaceGravity,Tax) VALUES ('Murcury','planet1.png',579100,1,20,5,167,3.7,0.001)");
  mysqli_query($con,"INSERT INTO locations (PlaceName,PlanetURL,OrbitalRadius,MetalPrice,HeliumPrice,UraniumPrice,Temperature,SurfaceGravity,Tax) VALUES ('Venus','venus.jpg',108200,1,20,3,462,8.87,0.05)");
  mysqli_query($con,"INSERT INTO locations (PlaceName,PlanetURL,OrbitalRadius,MetalPrice,HeliumPrice,UraniumPrice,Temperature,SurfaceGravity,Tax) VALUES ('Earth','earth.jpg',149600,1,15,7,14,9.81,0.2)");
  mysqli_query($con,"INSERT INTO locations (PlaceName,PlanetURL,OrbitalRadius,MetalPrice,HeliumPrice,UraniumPrice,Temperature,SurfaceGravity,Tax) VALUES ('Mars','mars.jpg',227900,1,4,1,-55,3.711,0.15)");
  }
else
  {
  echo "Error creating table: " . mysqli_error($con);
  }
?>
<h1>Something</h1>
