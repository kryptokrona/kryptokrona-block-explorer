var api = 'https://explorer.kryptokrona.se/api';
var donationAddress = "SEKReX2avthCKT4YUUKV3jgZ1Hderk9XbRciqp8vHVPoDSb9nA1dCV86Jia3TkD4jWgfxeh1AEYV3DKEAesSb7mSAvNqf6cB6kR";
var blockTargetInterval = 90; 
var coinUnits = 100; 
var totalSupply =  100000000000000; 
var symbol = 'XKR';
var refreshDelay = 30000;


const ExplorerConfig = {
    apiBaseUrl: 'https://explorer.kryptokrona.se/api'
  }

// pools stats
var networkStat = {
 "xkr": [
    ["pool.kryptokrona.se", "https://explorer.kryptokrona.se/pool1/"],
    ["pool2.kryptokrona.se", "https://explorer.kryptokrona.se/pool2/"],
	["swepool.kryptokrona.se", "https://explorer.kryptokrona.se/pool4"],
	["floki.kryptokrona.se", "https://floki.kryptokrona.se/api"],
    ["pool.gamersnest.org", "https://explorer.kryptokrona.se/pool.gamersnest.org/"],
    ["letshash.it", "https://letshash.it:8279/stats"]
 ]
};


var networkStat2 = {
    "xkr": [

    ]
   };
