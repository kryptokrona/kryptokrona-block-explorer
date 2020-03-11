var api = 'http://explorer.kryptokrona.se:11898';
var donationAddress = "";
var blockTargetInterval = 30; // enter the block interval in seconds
var coinUnits = 100;  // enter in the amount of atomic units in 1 coin, eg. 100 shells = 1 trtl
var totalSupply =  100000000000000; // enter the total supply in atomic units
var symbol = 'XKR'; // enter the coin's ticker
var refreshDelay = 30000;

// pools stats by MainCoins
var networkStat = {
 "kkr": [
	["kryptokrona.se", "http://pool.kryptokrona.se:8117"]
 ]
};

var networkStat2 = {
    "trtl": [
	[""]
 ]
};
