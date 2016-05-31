<?php
error_reporting(E_ALL);
ini_set("display_errors",1);
// Create connection to database
$mysql_host = "mysql1.000webhost.com";
$mysql_database = "a9206732_dat";
$mysql_user = "a9206732_jam";
$mysql_password = "space(99)";
$con=mysqli_connect($mysql_host,$mysql_user,$mysql_password);
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
//DATABASE CREATED 
//CONNECT TO DATABASE
include 'scripts/sql.php';
//CREATE TABLES
$i=0;
// Create main table
$QRY[$i++]="CREATE TABLE users(FID INT,Name TEXT, CurrentShip INT,Experiance INT, PRIMARY KEY (FID))";
$QRY[$i++]="CREATE TABLE ships(ShipCode INT AUTO_INCREMENT, ShipType INT, ShipName TEXT, OwnerID INT, Location INT, Sheilding INT, HoldCode INT, IventoryCode INT, PRIMARY KEY (ShipCode))";
$QRY[$i++]="CREATE TABLE shipTypes(shipType INT AUTO_INCREMENT, BuildCode TEXT, MetalCost INT, HeliumCost INT, UraniumCost INT, ElectricalCost INT, Storage INT, Battery INT, HeliumConsumption INT, UraniumConsumption INT, ElectricConsumption INT, SolarEffecientcy FLOAT,LaserPower INT , PlasmaPower INT, BombStorageCapacity INT, Sheilding INT, PRIMARY KEY (ShipType))";
$QRY[$i++]="CREATE TABLE locations(PlaceID INT AUTO_INCREMENT, PlaceName TEXT, OrbitalRadius FLOAT, InOrbitOf INT, Temperature FLOAT, SurfaceGravity FLOAT,Radius INT, Reflection CHAR(6), PRIMARY KEY (PlaceID))";
$QRY[$i++]="CREATE TABLE auctions(AuctionID INT AUTO_INCREMENT, PosterShipCode INT, SellerShipCode INT, Res1 INT, Res2 INT, TradeID INT, Amount1 INT, Amount2 INT, PRIMARY KEY(AuctionID))";
$QRY[$i++]="CREATE TABLE markets(MarketID INT AUTO_INCREMENT, PlaceID INT, Tax Float, PRIMARY KEY(MarketID))";
$QRY[$i++]="CREATE TABLE costList(CostCode INT AUTO_INCREMENT, PRIMARY KEY(CostCode))";
$QRY[$i++]="CREATE TABLE cost(CostID INT AUTO_INCREMENT,CostCode INT, ResourceID INT,Cost INT, PRIMARY KEY(CostID))";
$QRY[$i++]="CREATE TABLE hold(HoldCode INT AUTO_INCREMENT, PRIMARY KEY(HoldCode))";
$QRY[$i++]="CREATE TABLE cargo(CargoID INT AUTO_INCREMENT, HoldCode INT, ResourceID INT,Amount INT, PRIMARY KEY(CargoID))";
$QRY[$i++]="CREATE TABLE trades(TransactionID INT AUTO_INCREMENT, ShipCode INT, ResourceSold INT, ResourceBought INT, PlaceID INT, Amount INT, PRIMARY KEY(TransactionID))";
$QRY[$i++]="CREATE TABLE tradeRates(RateID INT AUTO_INCREMENT,MarketID INT, ResourceID INT,Rate INT, PRIMARY KEY(RateID))";
$QRY[$i++]="CREATE TABLE resources(ResourceID INT AUTO_INCREMENT, Name TEXT,Code TEXT, PRIMARY KEY(ResourceID))";
$QRY[$i++]="CREATE TABLE combatReport(ReportID INT AUTO_INCREMENT, ShipCode INT, ShipsDestroyed INT, Time INT, Won BOOLEAN, TypeID INT, FireID INT, PRIMARY KEY(ReportID))";
$QRY[$i++]="CREATE TABLE combatType(OccuranceID INT AUTO_INCREMENT,PlaceID INT, Likelyhood FLOAT, EnemyID INT, Name TEXT, PRIMARY KEY(OccuranceID))";
$QRY[$i++]="CREATE TABLE enemies(EnemyID INT AUTO_INCREMENT,ShipType INT, Name TEXT, HoldCode INT, IventoryCode INT, PRIMARY KEY(EnemyID))";
$QRY[$i++]="CREATE TABLE weaponsIventory(IventoryCode INT AUTO_INCREMENT, PRIMARY KEY(IventoryCode))";
$QRY[$i++]="CREATE TABLE weapons(WeaponID INT AUTO_INCREMENT, Name TEXT, Damage INT, BuildURL TEXT, CostCode INT, PRIMARY KEY(WeaponID))";
$QRY[$i++]="CREATE TABLE weaponsBay(BayID INT AUTO_INCREMENT,WeaponID INT, IventoryCode INT, PRIMARY KEY(BayID))";
$QRY[$i++]="CREATE TABLE weaponUse(FireID INT AUTO_INCREMENT, Uses INT, WeaponID INT, PRIMARY KEY(FireID))";
$QRY[$i++]="CREATE TABLE map(MapID INT AUTO_INCREMENT PRIMARY KEY, PlaceID INT,MapType TEXT,URL TEXT)";
//ENTRIES IN TABLES
$QRY[$i++]="INSERT INTO users (FID,Name,CurrentShip,Experiance) VALUES (738392784,'James Hylands',1,0)";
$QRY[$i++]="INSERT INTO ships (ShipType,OwnerID,ShipName,Location,Sheilding,HoldCode,IventoryCode) VALUES (1,738392784,'Liberator',3,100,1,1)";
$QRY[$i++]="INSERT INTO hold(HoldCode) VALUES (1)";
$QRY[$i++]="INSERT INTO weaponsIventory(IventoryCode) VALUES(1)";
//resources
$QRY[$i++]="INSERT INTO resources(ResourceID,Name,Code) VALUES(1,'Metal','MET')";
$QRY[$i++]="INSERT INTO resources(ResourceID,Name,Code) VALUES(2,'Helium','HE3')";
$QRY[$i++]="INSERT INTO resources(ResourceID,Name,Code) VALUES(3,'Uranium','URA')";
$QRY[$i++]="INSERT INTO resources(ResourceID,Name,Code) VALUES(4,'Electric Charge','ELC')";
//cargo
$QRY[$i++]="INSERT INTO cargo(HoldCode,ResourceID,Amount) VALUES (1,1,100)";
$QRY[$i++]="INSERT INTO cargo(HoldCode,ResourceID,Amount) VALUES (1,2,100)";
$QRY[$i++]="INSERT INTO cargo(HoldCode,ResourceID,Amount) VALUES (1,3,100)";
$QRY[$i++]="INSERT INTO cargo(HoldCode,ResourceID,Amount) VALUES (1,4,1000)";
//shiptypes
$QRY[$i++] = "INSERT INTO shipTypes (BuildCode,MetalCost,HeliumCost,UraniumCost,ElectricalCost,Storage,Battery,HeliumConsumption,UraniumConsumption,ElectricConsumption,SolarEffecientcy,LaserPower,PlasmaPower,BombStorageCapacity,Sheilding) VALUES('liberator.js',100,100,100,1000,10000,10000,1,1,1,0.3,10,10,2,100)";
//Locations
//to be in orbit of 0 is to orbit the sun
$QRY[$i++] = "INSERT INTO locations (PlaceName,OrbitalRadius,InOrbitOf,Temperature,SurfaceGravity,Radius,Relection) VALUES ('Mercury',579100,0,167,3.7,2440,'ABABAB')";
$QRY[$i++] = "INSERT INTO locations (PlaceName,OrbitalRadius,InOrbitOf,Temperature,SurfaceGravity,Radius,Relection) VALUES ('Venus',108200,0,462,8.87,6052,'FFEFD5')";
$QRY[$i++] = "INSERT INTO locations (PlaceName,OrbitalRadius,InOrbitOf,Temperature,SurfaceGravity,Radius,Relection) VALUES ('Earth',149600,0,14,9.81,6371, '50A0A0')";
$QRY[$i++] = "INSERT INTO locations (PlaceName,OrbitalRadius,InOrbitOf,Temperature,SurfaceGravity,Radius,Relection) VALUES ('Mars',227900,0,-55,3.711,3390,'FF5900')";
$QRY[$i++] = "INSERT INTO locations (PlaceName,OrbitalRadius,InOrbitOf,Temperature,SurfaceGravity,Radius,Relection) VALUES ('Moon',227900,3,-55,3.711,1737,'ABABAB')";
//Markets
$QRY[$i++] = "INSERT INTO Markets (MarketID,PlaceID,Tax) VALUES (1,1,0.2)";//mucury
$QRY[$i++] = "INSERT INTO Markets (MarketID,PlaceID,Tax) VALUES (2,2,0.2)";//venus
$QRY[$i++] = "INSERT INTO Markets (MarketID,PlaceID,Tax) VALUES (3,3,0.2)";//earth
$QRY[$i++] = "INSERT INTO Markets (MarketID,PlaceID,Tax) VALUES (4,4,0.2)";//mars
$QRY[$i++] = "INSERT INTO Markets (MarketID,PlaceID,Tax) VALUES (5,5,0.2)";//moon
//TradeRates
//Mucury
$QRY[$i++] = "INSERT INTO tradeRates (MarketID,ResourceID,Rate) VALUES (1,1,100)";
$QRY[$i++] = "INSERT INTO tradeRates (MarketID,ResourceID,Rate) VALUES (1,2,100)";
$QRY[$i++] = "INSERT INTO tradeRates (MarketID,ResourceID,Rate) VALUES (1,3,100)";
$QRY[$i++] = "INSERT INTO tradeRates (MarketID,ResourceID,Rate) VALUES (1,4,100)";
//venus
$QRY[$i++] = "INSERT INTO tradeRates (MarketID,ResourceID,Rate) VALUES (2,1,100)";
$QRY[$i++] = "INSERT INTO tradeRates (MarketID,ResourceID,Rate) VALUES (2,2,100)";
$QRY[$i++] = "INSERT INTO tradeRates (MarketID,ResourceID,Rate) VALUES (2,3,100)";
$QRY[$i++] = "INSERT INTO tradeRates (MarketID,ResourceID,Rate) VALUES (2,4,100)";
//earth
$QRY[$i++] = "INSERT INTO tradeRates (MarketID,ResourceID,Rate) VALUES (3,1,100)";
$QRY[$i++] = "INSERT INTO tradeRates (MarketID,ResourceID,Rate) VALUES (3,2,100)";
$QRY[$i++] = "INSERT INTO tradeRates (MarketID,ResourceID,Rate) VALUES (3,3,100)";
$QRY[$i++] = "INSERT INTO tradeRates (MarketID,ResourceID,Rate) VALUES (3,4,100)";
//mars
$QRY[$i++] = "INSERT INTO tradeRates (MarketID,ResourceID,Rate) VALUES (4,1,100)";
$QRY[$i++] = "INSERT INTO tradeRates (MarketID,ResourceID,Rate) VALUES (4,2,100)";
$QRY[$i++] = "INSERT INTO tradeRates (MarketID,ResourceID,Rate) VALUES (4,3,100)";
$QRY[$i++] = "INSERT INTO tradeRates (MarketID,ResourceID,Rate) VALUES (4,4,100)";
//moon
$QRY[$i++] = "INSERT INTO tradeRates (MarketID,ResourceID,Rate) VALUES (5,1,100)";
$QRY[$i++] = "INSERT INTO tradeRates (MarketID,ResourceID,Rate) VALUES (5,2,100)";
$QRY[$i++] = "INSERT INTO tradeRates (MarketID,ResourceID,Rate) VALUES (5,3,100)";
$QRY[$i++] = "INSERT INTO tradeRates (MarketID,ResourceID,Rate) VALUES (5,4,100)";
//Place MAAPS
//murcury
$QRY[$i++] = "INSERT INTO Maps (PlaceID,MapType,URL) VALUES(1,'IMG','mercury_img.png')";
$QRY[$i++] = "INSERT INTO Maps (PlaceID,MapType,URL) VALUES(2,'IMG','venus_img.jpg')";
$QRY[$i++] = "INSERT INTO Maps (PlaceID,MapType,URL) VALUES(3,'IMG','earth_img.jpg')";
$QRY[$i++] = "INSERT INTO Maps (PlaceID,MapType,URL) VALUES(3,'SPEC','earth_spec.jpg')";
$QRY[$i++] = "INSERT INTO Maps (PlaceID,MapType,URL) VALUES(3,'BUMP','earth_bump.jpg')";
$QRY[$i++] = "INSERT INTO Maps (PlaceID,MapType,URL) VALUES(4,'IMGH','mars_img.jpg')";
$QRY[$i++] = "INSERT INTO Maps (PlaceID,MapType,URL) VALUES(5,'IMG','moon_img.jpg')";


//doset($QRY);

//RUN EACH OF THE QUERIES
foreach($QRY as $query){
	// Execute query
	if (mysqli_query($con,$query))
	  {
	  echo "Table created successfully using " . $query . "<br/>";
	  }
	else
	  {
	  echo "<a style='color:red;'>Error creating table: " . mysqli_error($con) . "</a>";
	  }
}

?>
<h1>Something</h1>
