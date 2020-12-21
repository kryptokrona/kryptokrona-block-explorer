var api = 'https://explorer.kryptokrona.se/api';
var donationAddress = "SEKReX2avthCKT4YUUKV3jgZ1Hderk9XbRciqp8vHVPoDSb9nA1dCV86Jia3TkD4jWgfxeh1AEYV3DKEAesSb7mSAvNqf6cB6kR";
var blockTargetInterval = 90;
var coinUnits = 100000;
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
    ["swepool.org", "https://swepool.org/api"],
    ["floki.kryptokrona.se", "https://floki.kryptokrona.se/api"],
    ["pool.gamersnest.org", "https://explorer.kryptokrona.se/gamersnest/"],
    ["letshash.it", "https://letshash.online:15040"],
    ["gabberpool.nl/XKR", "https://gabberpool.nl:1122"],
    ["spookyplanet.nl/pool/xkr", "https://spookyplanet.nl:1172"],
    ["xkr.pool-pay.com", "https://xkr.pool-pay.com:5383"],
    ["kryptokrona.compool.net", "https://api.compool.net/xkr/v1"],
    ["http://xkr-worldmining.servebeer.com", "http://connectme.servebeer.com:8118"]
 ]
};


var networkStat2 = {
    "xkr": [

    ]
   };
