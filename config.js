let api = "https://Blocksum.org/api";
let decimals = 5;
let difficulty_target = 90;
let ticker = "XKR"

let pools = [ // Name, Site URL, API URL
  ["Swepool", "https://swepool.org", "https://swepool.org/api/stats"],
  ["Kryptokrona Pool2", "https://pool2.kryptokrona.se", "https://blocksum.org/pool2/stats"],
  ["Floki Kryptokrona Pool", "https://floki.kryptokrona.se", "https://floki.kryptokrona.se/api/stats"],
  ["GamersNest", "https://pool.gamersnest.org", "https://pool.gamersnest.org/api/stats"],
  ["PoolPay", "https://xkr.pool-pay.com", "https://xkr.pool-pay.com:5383/stats"],
  ["Infinium space", "https://xkr.pools.infinium.space", "https://apikz5ssx.infinium.space/xkr/xkr/v1/live_stats"],
  ["Ayapooli", "https://kryptokrona.supergott.com", "https://kryptokrona.supergott.com/api/stats"]

  //Removed some pools that were causing perfomance issues by not responding..

  // ["GabberPool", "https://gabberpool.nl/XKR", "https://gabberpool.nl:1122/stats"],
  // ["Lets Hash It", "https://letshash.it", "https://letshash.online:15040/stats"],
  // ["SpookyPlanet", "https://spookyplanet.nl/pool/xkr", "https://spookyplanet.nl:1172/stats"],
  // ["PoolPay", "https://xkr.pool-pay.com", "https://xkr.pool-pay.com:5383/stats"],
  // ["ComPool", "https://kryptokrona.compool.net", "https://api.compool.net/xkr/v1/stats"],
  // ["WorldMining", "http://xkr-worldmining.servebeer.com", "https//blocksum.org/worldmining/stats"],
  // ["Kryptokrona Göta", "https://pool.kryptokrona.se", "https://gota.kryptokrona.se/api/stats"]

];
