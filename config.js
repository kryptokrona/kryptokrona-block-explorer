var api = 'http://explorer.kryptokrona.se:11898';
var donationAddress = "SEKReX2avthCKT4YUUKV3jgZ1Hderk9XbRciqp8vHVPoDSb9nA1dCV86Jia3TkD4jWgfxeh1AEYV3DKEAesSb7mSAvNqf6cB6kR";
var blockTargetInterval = 90; 
var coinUnits = 100; 
var totalSupply =  100000000000000; 
var symbol = 'XKR';
var refreshDelay = 30000;

// pools stats
var networkStat = {
 "xkr": [
	["pool.kryptokrona.se", "http://pool.kryptokrona.se:8117"],
	["pool2.kryptokrona.se", "http://pool2.kryptokrona.se:8117"],
	["pool3.kryptokrona.se", "http://pool3.kryptokrona.se:8117"]
	//["pool-name", "pool-url:port"],
	//["pool-name", "pool-url:port"]
 ]
};


var networkStat2 = {
	"xkr": [

	]
   };