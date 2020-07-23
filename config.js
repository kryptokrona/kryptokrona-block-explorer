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
    ["Göta", "https://explorer.kryptokrona.se/pool1/"],
    ["Malmgruvan", "https://explorer.kryptokrona.se/pool2/"],
	["Swepool", "https://explorer.kryptokrona.se/pool3/"],
	["Floki", "https://explorer.kryptokrona.se/floki/"]
    //["pool-name", "pool-url:port"],
    //["pool-name", "pool-url:port"]
 ]
};


var networkStat2 = {
    "xkr": [

    ]
   };
