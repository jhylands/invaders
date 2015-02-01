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
// Create main table
$QRY[0]="CREATE TABLE users(FID INT,Name TEXT, CurrentShip INT,Experiance INT, PRIMARY KEY (FID))";
$QRY[1]="CREATE TABLE ships(ShipCode INT AUTO_INCREMENT, ShipType INT, ShipName TEXT, OwnerID INT, Location INT, Sheilding INT, HoldCode INT, IventoryCode INT, PRIMARY KEY (ShipCode))";
$QRY[2]="CREATE TABLE shipTypes(shipType INT AUTO_INCREMENT, BuildCode TEXT, MetalCost INT, HeliumCost INT, UraniumCost INT, ElectricalCost INT, Storage INT, Battery INT, HeliumConsumption INT, UraniumConsumption INT, ElectricConsumption INT, SolarEffecientcy FLOAT,LaserPower INT , PlasmaPower INT, BombStorageCapacity INT, Sheilding INT, PRIMARY KEY (ShipType))";
$QRY[3]="CREATE TABLE locations(PlaceID INT AUTO_INCREMENT, PlaceName TEXT, PlanetURL TEXT, OrbitalRadius FLOAT, InOrbitOf INT, Temperature FLOAT, SurfaceGravity FLOAT, Tax FLOAT, PRIMARY KEY (PlaceID))";
$QRY[4]="CREATE TABLE auctions(AuctionID INT AUTO_INCREMENT, PosterShipCode INT, SellerShipCode INT, Res1 INT, Res2 INT, TradeID INT, Amount1 INT, Amount2 INT, PRIMARY KEY(AuctionID))";
$QRY[5]="CREATE TABLE Markets(MarketID INT AUTO_INCREMENT, PlaceID INT, Tax Float, PRIMARY KEY(MarketID))";
$QRY[6]="CREATE TABLE costList(CostCode INT AUTO_INCREMENT, PRIMARY KEY(CostCode))";
$QRY[7]="CREATE TABLE cost(CostID INT AUTO_INCREMENT,CostCode INT, ResourceID INT,Cost INT, PRIMARY KEY(CostID))";
$QRY[8]="CREATE TABLE hold(HoldCode INT AUTO_INCREMENT, PRIMARY KEY(HoldCode))";
$QRY[9]="CREATE TABLE cargo(CargoID INT AUTO_INCREMENT, HoldCode INT, ResourceID INT,Amount INT, PRIMARY KEY(CargoID))";
$QRY[10]="CREATE TABLE trades(TransactionID INT AUTO_INCREMENT, ShipCode INT, ResourceSold INT, ResourceBought INT, PlaceID INT, Amount INT, PRIMARY KEY(TransactionID))";
$QRY[11]="CREATE TABLE tradeRates(RateID INT AUTO_INCREMENT,MarketID INT, ResourceID INT,Rate INT, PRIMARY KEY(RateID))";
$QRY[12]="CREATE TABLE resources(ResourceID INT AUTO_INCREMENT, Name TEXT,Code TEXT, PRIMARY KEY(ResourceID))";
$QRY[13]="CREATE TABLE combatReport(ReportID INT AUTO_INCREMENT, ShipCode INT, ShipsDestroyed INT, Time INT, Won BOOLEAN, TypeID INT, FireID INT, PRIMARY KEY(ReportID))";
$QRY[14]="CREATE TABLE combatType(OccuranceID INT AUTO_INCREMENT,PlaceID INT, Likelyhood FLOAT, EnemyID INT, Name TEXT, PRIMARY KEY(OccuranceID))";
$QRY[15]="CREATE TABLE enemies(EnemyID INT AUTO_INCREMENT,ShipType INT, Name TEXT, HoldCode INT, IventoryCode INT, PRIMARY KEY(EnemyID))";
$QRY[16]="CREATE TABLE weaponsIventory(IventoryCode INT AUTO_INCREMENT, PRIMARY KEY(IventoryCode))";
$QRY[17]="CREATE TABLE weapons(WeaponID INT AUTO_INCREMENT, Name TEXT, Damage INT, BuildURL TEXT, CostCode INT, PRIMARY KEY(WeaponID))";
$QRY[18]="CREATE TABLE weaponsBay(BayID INT AUTO_INCREMENT,WeaponID INT, IventoryCode INT, PRIMARY KEY(BayID))";
$QRY[19]="CREATE TABLE weaponUse(FireID INT AUTO_INCREMENT, Uses INT, WeaponID INT, PRIMARY KEY(FireID))";
//ENTRIES IN TABLES
$QRY[20]="INSERT INTO users (FID,Name,CurrentShip,Experiance) VALUES (738392784,'James Hylands',1,0)";
$QRY[21]="INSERT INTO ships (ShipType,OwnerID,ShipName,Location,Sheilding,HoldCode,IventoryCode) VALUES (1,738392784,'Liberator',3,100,1,1)";
$QRY[22]="INSERT INTO hold(HoldCode) VALUES (1)";
$QRY[23]="INSERT INTO weaponsIventory(IventoryCode) VALUES(1)";
//resources
$QRY[24]="INSERT INTO resources(ResourceID,Name,Code) VALUES(1,'Metal','MET')";
$QRY[25]="INSERT INTO resources(ResourceID,Name,Code) VALUES(2,'Helium','HE3')";
$QRY[26]="INSERT INTO resources(ResourceID,Name,Code) VALUES(3,'Uranium','URA')";
$QRY[27]="INSERT INTO resources(ResourceID,Name,Code) VALUES(4,'Electric Charge','ELC')";
//cargo
$QRY[28]="INSERT INTO cargo(HoldCode,ResourceID,Amount) VALUES (1,1,100)";
$QRY[28]="INSERT INTO cargo(HoldCode,ResourceID,Amount) VALUES (1,2,100)";
$QRY[29]="INSERT INTO cargo(HoldCode,ResourceID,Amount) VALUES (1,3,100)";
$QRY[30]="INSERT INTO cargo(HoldCode,ResourceID,Amount) VALUES (1,4,1000)";
//shiptypes
$QRY[31] = "INSERT INTO shipTypes (BuildCode,MetalCost,HeliumCost,UraniumCost,ElectricalCost,Storage,Battery,HeliumConsumption,UraniumConsumption,ElectricConsumption,SolarEffecientcy,LaserPower,PlasmaPower,BombStorageCapacity,Sheilding) VALUES('liberator.js',100,100,100,1000,10000,10000,1,1,1,0.3,10,10,2,100)";
//Locations
//to be in orbit of 0 is to orbit the sun
$QRY[32] = "INSERT INTO locations (PlaceName,PlanetURL,OrbitalRadius,InOrbitOf,Temperature,SurfaceGravity) VALUES ('Murcury','planet1.png',579100,0,167,3.7)";
$QRY[33] = "INSERT INTO locations (PlaceName,PlanetURL,OrbitalRadius,InOrbitOf,Temperature,SurfaceGravity) VALUES ('Venus','venus.jpg',108200,0,462,8.87)";
$QRY[34] = "INSERT INTO locations (PlaceName,PlanetURL,OrbitalRadius,InOrbitOf,Temperature,SurfaceGravity) VALUES ('Earth','earth.jpg',149600,0,14,9.81)";
$QRY[35] = "INSERT INTO locations (PlaceName,PlanetURL,OrbitalRadius,InOrbitOf,Temperature,SurfaceGravity) VALUES ('Mars','mars.jpg',227900,0,-55,3.711)";
$QRY[36] = "INSERT INTO locations (PlaceName,PlanetURL,OrbitalRadius,InOrbitOf,Temperature,SurfaceGravity) VALUES ('Moon','moon.jpg',227900,3,-55,3.711)";
//Markets
$QRY[37] = "INSERT INTO Markets (MarketID,PlaceID,Tax) VALUES (1,1,0.2)";//mucury
$QRY[38] = "INSERT INTO Markets (MarketID,PlaceID,Tax) VALUES (2,2,0.2)";//venus
$QRY[39] = "INSERT INTO Markets (MarketID,PlaceID,Tax) VALUES (3,3,0.2)";//earth
$QRY[40] = "INSERT INTO Markets (MarketID,PlaceID,Tax) VALUES (4,4,0.2)";//mars
$QRY[41] = "INSERT INTO Markets (MarketID,PlaceID,Tax) VALUES (5,5,0.2)";//moon

//TradeRates
//Mucury
$QRY[42] = "INSERT INTO tradeRates (MarketID,ResourceID,Rate) VALUES (1,1,100)";
$QRY[43] = "INSERT INTO tradeRates (MarketID,ResourceID,Rate) VALUES (1,2,100)";
$QRY[44] = "INSERT INTO tradeRates (MarketID,ResourceID,Rate) VALUES (1,3,100)";
$QRY[45] = "INSERT INTO tradeRates (MarketID,ResourceID,Rate) VALUES (1,4,100)";
//venus
$QRY[46] = "INSERT INTO tradeRates (MarketID,ResourceID,Rate) VALUES (2,1,100)";
$QRY[47] = "INSERT INTO tradeRates (MarketID,ResourceID,Rate) VALUES (2,2,100)";
$QRY[48] = "INSERT INTO tradeRates (MarketID,ResourceID,Rate) VALUES (2,3,100)";
$QRY[49] = "INSERT INTO tradeRates (MarketID,ResourceID,Rate) VALUES (2,4,100)";
//earth
$QRY[50] = "INSERT INTO tradeRates (MarketID,ResourceID,Rate) VALUES (3,1,100)";
$QRY[51] = "INSERT INTO tradeRates (MarketID,ResourceID,Rate) VALUES (3,2,100)";
$QRY[52] = "INSERT INTO tradeRates (MarketID,ResourceID,Rate) VALUES (3,3,100)";
$QRY[53] = "INSERT INTO tradeRates (MarketID,ResourceID,Rate) VALUES (3,4,100)";
//mar
$QRY[54] = "INSERT INTO tradeRates (MarketID,ResourceID,Rate) VALUES (4,1,100)";
$QRY[55] = "INSERT INTO tradeRates (MarketID,ResourceID,Rate) VALUES (4,2,100)";
$QRY[56] = "INSERT INTO tradeRates (MarketID,ResourceID,Rate) VALUES (4,3,100)";
$QRY[57] = "INSERT INTO tradeRates (MarketID,ResourceID,Rate) VALUES (4,4,100)";
//moon
$QRY[58] = "INSERT INTO tradeRates (MarketID,ResourceID,Rate) VALUES (5,1,100)";
$QRY[59] = "INSERT INTO tradeRates (MarketID,ResourceID,Rate) VALUES (5,2,100)";
$QRY[60] = "INSERT INTO tradeRates (MarketID,ResourceID,Rate) VALUES (5,3,100)";
$QRY[61] = "INSERT INTO tradeRates (MarketID,ResourceID,Rate) VALUES (5,4,100)";

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
