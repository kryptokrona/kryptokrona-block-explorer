function onReady(callback) {
  var intervalId = window.setInterval(function() {
    if (document.getElementsByTagName('body')[0] !== undefined) {
      window.clearInterval(intervalId);
      callback.call(this);
    }
  }, 1500);
}

function setVisible(selector, visible) {
  document.querySelector(selector).style.display = visible ? 'block' : 'none';
}

function fromHex(hex,str){
  try{
    str = decodeURIComponent(hex.replace(/(..)/g,'%$1'))
  }
  catch(e){
    str = hex
  }
  return str
}

onReady(function() {
  setVisible('body', true);
  setVisible('#loading', false);
});

function trimExtra (extra) {

  try {

    let payload = fromHex(extra.substring(66));
    let payload_json = JSON.parse(payload);
    return fromHex(extra.substring(66))

  } catch (e) {

    return fromHex(extra.substring(78));

  }

}

async function renderBlocksTransactions() {
  let currentPriceUSD = 0;
  await getPoolInfo("https://api.coinpaprika.com/v1/tickers/xkr-kryptokrona")
      .then(dataB => {
    currentPriceUSD = dataB.quotes.USD.price;
    document.getElementById('priceData').innerHTML = '$' + parseFloat(currentPriceUSD).toFixed(8);
  });

  let block5hash = "";
  let block6hash = "";
  let block7hash = "";
  let block8hash = "";

  await getLatestBlock().then(async(dataB) => {
    document.getElementById('10latestBlocksList').innerHTML = "";
    document.getElementById('10latestTransactionsList').innerHTML = "";
    let blockHash = dataB.result.block_header.hash;
    let transactionCount = 0;
    for(i = 0; i < 10; i++) {
      xhrGetBlock = $.ajax({
        url: api + '/json_rpc',
        method: "POST",
        data: JSON.stringify({
          jsonrpc: "2.0",
          id: "test",
          method: "getblockheaderbyheight",
          params: {
            height: (dataB.result.block_header.height - i)
          }
        }),
        dataType: 'json',
        cache: 'false',
        success: function (data2) {
          block = data2.result.block_header;

          var tbodyRef = document.getElementById('10latestBlocks').getElementsByTagName('tbody')[0];
          var newRow = tbodyRef.insertRow();

          var tr=document.createElement('tr');
          tr.innerHTML = `
          <td><b><a href="block.html?hash=${block.hash}" class="link-white">${numberWithCommas(block.height)}</a></b></td>
          <td>${moment(block.timestamp * 1000).fromNow()}</td>
          <td>${numberWithCommas(block.num_txes)}</td>
          <td>${numberWithCommas(block.block_size)}</td>
          <td>${((block.reward / (10 ** decimals))).toFixed(3)} ${ticker}</td>
          `;
          tbodyRef.appendChild(tr);

          // Setting the beautifull stuff
          if(dataB.result.block_header.height == block.height) {
            document.getElementById('block5').innerHTML = numberWithCommas(block.height);
            block5hash = block.hash;
            document.getElementById("block5-click").addEventListener("click", function() { window.location.href="block.html?hash=" + block5hash; });
            document.getElementById('block5_size').innerHTML = numberWithCommas(block.block_size);
            document.getElementById('block5_txs').innerHTML = numberWithCommas(block.num_txes);
            document.getElementById('block5_time').innerHTML = (moment(block.timestamp * 1000).fromNow() == "a few seconds ago" ? 'seconds ago' : moment(block.timestamp * 1000).fromNow());
          }
          if(dataB.result.block_header.height-1 == block.height) {
            document.getElementById('block6').innerHTML = numberWithCommas(block.height);
            block6hash = block.hash;
            document.getElementById("block6-click").addEventListener("click", function() { window.location.href="block.html?hash=" + block6hash; });
            document.getElementById('block6_size').innerHTML = numberWithCommas(block.block_size);
            document.getElementById('block6_txs').innerHTML = numberWithCommas(block.num_txes);
            document.getElementById('block6_time').innerHTML = moment(block.timestamp * 1000).fromNow();
          }
          if(dataB.result.block_header.height-2 == block.height) {
            document.getElementById('block7').innerHTML =  numberWithCommas(block.height);
            block7hash = block.hash;
            document.getElementById("block7-click").addEventListener("click", function() { window.location.href="block.html?hash=" + block7hash; });
            document.getElementById('block7_size').innerHTML = numberWithCommas(block.block_size);
            document.getElementById('block7_txs').innerHTML = numberWithCommas(block.num_txes);
            document.getElementById('block7_time').innerHTML = moment(block.timestamp * 1000).fromNow();
          }
          if(dataB.result.block_header.height-3 == block.height) {
            document.getElementById('block8').innerHTML =  numberWithCommas(block.height);
            block8hash = block.hash;
            document.getElementById("block8-click").addEventListener("click", function() { window.location.href="block.html?hash=" + block8hash; });
            document.getElementById('block8_size').innerHTML = numberWithCommas(block.block_size);
            document.getElementById('block8_txs').innerHTML = numberWithCommas(block.num_txes);
            document.getElementById('block8_time').innerHTML = moment(block.timestamp * 1000).fromNow();
          }
          if(dataB.result.block_header.height == block.height) {
            document.getElementById('block4_txs').innerHTML = numberWithCommas(block.height+1);
          }
          if(dataB.result.block_header.height == block.height) {
            document.getElementById('block3_txs').innerHTML = numberWithCommas(block.height+2);
          }
          if(dataB.result.block_header.height == block.height) {
            document.getElementById('block2_txs').innerHTML = numberWithCommas(block.height+3);
          }
          if(dataB.result.block_header.height == block.height) {
            document.getElementById('block1_txs').innerHTML = numberWithCommas(block.height+4);
          }
        }
      });


      while(transactionCount < 10) {
        await getByBlockHash(blockHash).then(async(blockie) => {
          blockie = blockie.result.block;
          for(k = 0; k < blockie.transactions.length; k++) {
            if(transactionCount < 10) {
              var tbodyRef = document.getElementById('10latestTransactions').getElementsByTagName('tbody')[0];
              var newRow = tbodyRef.insertRow();

              var tr=document.createElement('tr');
              tr.innerHTML = `
              <td><b><a href="transaction.html?hash=${blockie.transactions[k].hash}" class="link-white">${blockie.transactions[k].hash.substring(0,10)}...${blockie.transactions[k].hash.substring(blockie.transactions[k].hash.length-10,blockie.transactions[k].hash.length)}</a></b></td>
              <td>${numberWithCommas((blockie.transactions[k].amount_out / (10 ** decimals)).toFixed(2))} ${ticker}</td>
              <td style="color:#00ff89;">$${(currentPriceUSD * (blockie.transactions[k].amount_out / (10 ** decimals))).toFixed(2)}</td>
              <td>${blockie.transactions[k].fee / (10 ** decimals)} ${ticker}</td>`;
              tbodyRef.appendChild(tr);

              transactionCount++;
            }
          }
          blockHash = blockie.prev_hash;
        });
      }

      await getByBlockHash(blockHash).then(data => {
        blockHash = data.result.block.prev_hash;
      });
    }
  });

  // Transaction pool
  await getUnconfirmedTransactions().then(async(transactions) => {
    document.getElementById('transactionPoolList').innerHTML = "";
    document.getElementById('huginTransactionPoolList').innerHTML = "";
    console.log(transactions);
    transactions = transactions.addedTxs;
    console.log(transactions);
     hugin_transactions = transactions.filter(item => item['transactionPrefixInfo.txPrefix']['extra'].length >= 67);
     transactions = transactions.filter(item => item['transactionPrefixInfo.txPrefix']['extra'].length < 67);
    console.log(transactions.length);
    //console.log(hugin_transactions.length);
    let transactionsAmount = 0;
    console.log(transactions.length);
    for(k = 0; k < transactions.length; k++) {
      var tbodyRef = document.getElementById('transactionPool').getElementsByTagName('tbody')[0];
      var newRow = tbodyRef.insertRow();
      let amount = 0;
      for (output in transactions[k]["transactionPrefixInfo.txPrefix"].vout) {
        amount += transactions[k]["transactionPrefixInfo.txPrefix"].vout[output].amount;
      }
      console.log(amount);

      var tr=document.createElement('tr');
      tr.innerHTML = `
      <td><b>${numberWithCommas((amount / (10 ** decimals)).toFixed(2))} ${ticker}</b></td>
      <td style="color:#00ff89;">$${(currentPriceUSD * (amount / (10 ** decimals))).toFixed(2)}</td>
      <td><a href="transaction.html?hash=${transactions[k]["transactionPrefixInfo.txHash"]}" class="link-white">${transactions[k]["transactionPrefixInfo.txHash"]}</a></td>`;
      tbodyRef.appendChild(tr);

      transactionsAmount++;
      document.getElementById('transactionPoolAmount').innerHTML = transactionsAmount
    }

    let hugin_transactionsAmount = 0;

    let hugin_messages = [];

    for(k = 0; k < hugin_transactions.length; k++) {
      var tbodyRef = document.getElementById('huginTransactionPool').getElementsByTagName('tbody')[0];
      var newRow = tbodyRef.insertRow();

      const message = JSON.parse(trimExtra(hugin_transactions[k]["transactionPrefixInfo.txPrefix"].extra));

      let message_type = 'Unknown';
      let message_type_color = 'gray';
      let timestamp = message.t;

      if ('sb' in message) {
        message_type = 'Group message';
        message_type_color = "#5ff281";

      }

      if ('box' in message) {
        message_type = 'Private message';
        message_type_color = "#a65ff2";

      }

      if ('m' in message) {
        message_type = 'Boards message';
        message_type_color = "#5f86f2";
        timestamp = timestamp * 1000;
      }

      let message_hash = hugin_transactions[k]["transactionPrefixInfo.txHash"];

      hugin_messages.push({message: message, type: message_type, typeColor: message_type_color, timestamp: timestamp, hash: message_hash});

      hugin_transactionsAmount++;
    }

    hugin_messages.sort((item, item2) => item2.timestamp - item.timestamp);

    for(k = 0; k < hugin_messages.length; k++) {

      var tr=document.createElement('tr');
      tr.innerHTML = `
      <td style="color:${hugin_messages[k].typeColor};">${hugin_messages[k].type}</td>
      <td>${moment(hugin_messages[k].timestamp).fromNow()}</td>
      <td><a href="transaction.html?hash=${hugin_messages[k].hash}" class="link-white">${hugin_messages[k].hash}</a></td>`;
      tbodyRef.appendChild(tr);

   }


      document.getElementById('huginTransactionPoolAmount').innerHTML = hugin_transactionsAmount

  });
}

renderBlocksTransactions();
setInterval(async function() {
  renderBlocksTransactions();
}, 30000);
