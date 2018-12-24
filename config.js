var api = 'http://127.0.0.1:11898';
var donationAddress = "";
var blockTargetInterval = 30;
var coinUnits = 100;
var symbol = 'trtl';
var refreshDelay = 30000;
var totalSupply =  100000000000000;

// pools stats by MainCoins
var networkStat = {
 "trtl": [
	["z-pool.com", "http://z-pool.com:8117"],
	["eu.turtlepool.space", "http://eu.turtlepool.space:8117"],
	["us.turtlepool.space", "http://us.turtlepool.space:8117"],
	["hk.turtlepool.space", "http://hk.turtlepool.space:8117"],
	["turtlecoinpool.ddns.net", "http://turtlecoinpool.ddns.net:8127"],
	["trtl.mine2gether.com", "https://trtl.mine2gether.com/api"],
	["trtl.heigh-ho.funkypenguin.co.nz", "https://api.trtl.heigh-ho.funkypenguin.co.nz"],
	["trtl.radicaldelta.org", "http://trtl.radicaldelta.org:8117"],
	["turtle.atpool.party", "http://turtle-eu.atpool.party:8117"],
	["ny.minetrtl.us", "http://ny.minetrtl.us:8117"],
	["xk.is", "https://xk.is/api"]
 ]
};

var networkStat2 = {
    "trtl": [
	[""]
 ]
};
