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
$sql="CREATE TABLE users(FID INT,Name TEXT, CurrentShip INT, PRIMARY KEY (FID))";
// Execute query
if (mysqli_query($con,$sql))
  {
  echo "Table persons created successfully<br/>";
  mysqli_query($con,"INSERT INTO users (FID,Name,CurrentShip) VALUES (738392784,'James Hylands',1)");
  }
else
  {
  echo "Error creating table: " . mysqli_error($con);
  }

// Create questions table
$sql="CREATE TABLE ships(ShipCode INT AUTO_INCREMENT,ShipType INT,OwnerID INT, Metal INT, Helium INT, Uranium INT, Electricity INT, Bombs INT, Location INT,PRIMARY KEY (ShipCode))";
// Execute query
if (mysqli_query($con,$sql))
  {
  echo "Table persons created successfully<br/>";
  mysqli_query($con,"INSERT INTO ships (ShipType,OwnerID,Metal,Helium,Uranium,Electricity,Bombs,Location) VALUES (1,738392784,100,100,100,100,0,3)");
  }
else
  {
  echo "Error creating table: " . mysqli_error($con);
  }
// Create questions table
$sql="CREATE TABLE shipTypes(shipType INT AUTO_INCREMENT, BuildCode TEXT, MetalCost INT, HeliumCost INT, UraniumCost INT, ElectricalCost INT, Storage INT, Battery INT, HeliumConsumption INT, UraniumConsumption INT, ElectricConsumption INT, SolarEffecientcy FLOAT,LaserPower INT , PlasmaPower INT, BombStorageCapacity INT,PRIMARY KEY (ShipType))";
// Execute query
if (mysqli_query($con,$sql))
  {
  echo "Table persons created successfully<br/>";
  $QRY = "INSERT INTO shipTypes (BuildCode,MetalCost,HeliumCost,UraniumCost,ElectricalCost,Storage,Battery,HeliumConsumption,UraniumConsumption,ElectricConsumption,SolarEffecientcy,LaserPower,PlasmaPower,BombStorageCapacity) VALUES('var ship',100,100,100,1000,10000,10000,1,1,1,0.3,10,10,2)";
echo "<br />" . $QRY . "<br />";
  mysqli_query($con,$QRY);
  }
else
  {
  echo "Error creating table: " . mysqli_error($con);
  }
// Create questions table
$sql="CREATE TABLE locations(PlaceID INT AUTO_INCREMENT, PlaceName TEXT, PlanetURL TEXT, OrbitalRadius FLOAT,FeHe FLOAT, HeUr FLOAT, PRIMARY KEY (PlaceID))";
// Execute query
if (mysqli_query($con,$sql))
  {
  echo "Table persons created successfully<br/>";
  mysqli_query($con,"INSERT INTO locations (PlaceName,PlanetURL,OrbitalRadius,FeHe,HeUr) VALUES ('Murcury','planet1.png',579100,20,2)");
  mysqli_query($con,"INSERT INTO locations (PlaceName,PlanetURL,OrbitalRadius,FeHe,HeUr) VALUES ('Venus','venus.jpg',108200,10,2)");
  mysqli_query($con,"INSERT INTO locations (PlaceName,PlanetURL,OrbitalRadius,FeHe,HeUr) VALUES ('Earth','earth.jpg',149600,4,0.5)");
  mysqli_query($con,"INSERT INTO locations (PlaceName,PlanetURL,OrbitalRadius,FeHe,HeUr) VALUES ('Mars','mars.jpg',227900,2,4)");
  }
else
  {
  echo "Error creating table: " . mysqli_error($con);
  }
?>
<h1>Something</h1>
