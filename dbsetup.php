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
$sql="CREATE TABLE ships(ShipCode INT AUTO_INCREMENT,ShipType INT,OwnerID INT, Metal INT, Helium INT, Uranium INT, Electricity INT, Bombs INT, Location INT, Sheilding INT, ShipsDestroyed INT, ShotsFired INT, PRIMARY KEY (ShipCode))";
// Execute query
if (mysqli_query($con,$sql))
  {
  echo "Table persons created successfully<br/>";
  mysqli_query($con,"INSERT INTO ships (ShipType,OwnerID,Metal,Helium,Uranium,Electricity,Bombs,Location,Sheilding) VALUES (1,738392784,100,100,100,100,0,3,100)");
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
  $QRY = "INSERT INTO shipTypes (BuildCode,MetalCost,HeliumCost,UraniumCost,ElectricalCost,Storage,Battery,HeliumConsumption,UraniumConsumption,ElectricConsumption,SolarEffecientcy,LaserPower,PlasmaPower,BombStorageCapacity,Sheilding) VALUES('var ship',100,100,100,1000,10000,10000,1,1,1,0.3,10,10,2,100)";
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
