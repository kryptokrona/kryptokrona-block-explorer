var api = 'http://explorer.kryptokrona.se:11898';
var donationAddress = "SEKReX2avthCKT4YUUKV3jgZ1Hderk9XbRciqp8vHVPoDSb9nA1dCV86Jia3TkD4jWgfxeh1AEYV3DKEAesSb7mSAvNqf6cB6kR";
var blockTargetInterval = 90; // enter the block interval in seconds
var coinUnits = 100;  // enter in the amount of atomic units in 1 coin, eg. 100 shells = 1 trtl
var totalSupply =  100000000000000; // enter the total supply in atomic units
var symbol = 'XKR'; // enter the coin's ticker
var refreshDelay = 30000;

// pools stats by MainCoins
var networkStat = {
 "xkr": [
	["pool.kryptokrona.se", "http://pool.kryptokrona.se:8117"]
 ]
};

var networkStat2 = {
	"xkr": [
	   ["pool2.kryptokrona.se", "http://pool2.kryptokrona.se:8117"]
	]
   };
