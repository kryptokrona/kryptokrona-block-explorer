
//Labels

var numberFormatter = new Intl.NumberFormat('en-US'); // US formatting, force commas.

function localizeNumber(number) {
  return numberFormatter.format(number);
}

function getReadableHashRateString(hashrate) {
  var i = 0;
  var byteUnits = [' H', ' kH', ' MH', ' GH', ' TH', ' PH', ' EH', ' ZH', ' YH'];
  while (hashrate > 1000) {
    hashrate = hashrate / 1000;
    i++;
  }
  return localizeNumber(hashrate.toFixed(2)) + byteUnits[i];
}

function getReadableDifficultyString(difficulty, precision) {
  if (isNaN(parseFloat(difficulty)) || !isFinite(difficulty)) return 0;
  if (typeof precision === 'undefined') precision = 0;
  var units = ['', 'k', 'M', 'G', 'T', 'P'],
      number = Math.floor(Math.log(difficulty) / Math.log(1000));
  if (units[number] === undefined || units[number] === null) {
      return 0
  }
  return localizeNumber((difficulty / Math.pow(1000, Math.floor(number))).toFixed(precision)) + ' ' + units[number];
}

async function renderLabelsCharts() {
  await getLatestBlock().then(async (latestBlock) => {
    for (let i = 1; i < 100; i++) {
      xhrGetBlock = $.ajax({
        url: api + '/json_rpc',
        method: "POST",
        data: JSON.stringify({
          jsonrpc: "2.0",
          id: "test",
          method: "getblockheaderbyheight",
          params: {
            height: (latestBlock.result.block_header.height - i)
          }
        }),
        dataType: 'json',
        cache: 'false',
        success: function (latestBlock) {
          block2 = latestBlock.result.block_header;

          document.getElementById('hashrateDataAmount').innerHTML = `${getReadableHashRateString(block2.difficulty / difficulty_target)}`
          document.getElementById('difficultyDataAmount').innerHTML = `${getReadableDifficultyString(block2.difficulty)}`
          document.getElementById('blockSizeDataAmount').innerHTML = `${block2.block_size}`
          document.getElementById('transactionsDataAmount').innerHTML = `${block2.num_txes}`
        }
      });
    }
  });
}
renderLabelsCharts();

setInterval(async function() {
  renderLabelsCharts();
}, 30000);



