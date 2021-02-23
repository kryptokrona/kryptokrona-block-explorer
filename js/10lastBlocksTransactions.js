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

onReady(function() {
  setVisible('body', true);
  setVisible('#loading', false);
});


async function renderBlocksTransactions() {
  let currentPriceUSD = 0;
  await getPoolInfo("https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&ids=kryptokrona&order=market_cap_desc&per_page=100&page=1&sparkline=false").then(async(dataB) => {
    currentPriceUSD = dataB[0].current_price;
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
          <td>${numberWithCommas(block.difficulty)}</td>`;
          tbodyRef.appendChild(tr);

          // Setting the beautifull stuff
          if(dataB.result.block_header.height == block.height) {
            document.getElementById('block5').innerHTML = block.height;
            block5hash = block.hash;
            document.getElementById("block5-click").addEventListener("click", function() { window.location.href="block.html?hash=" + block5hash; });
            document.getElementById('block5_size').innerHTML = numberWithCommas(block.block_size);
            document.getElementById('block5_txs').innerHTML = numberWithCommas(block.num_txes);
            document.getElementById('block5_time').innerHTML = (moment(block.timestamp * 1000).fromNow() == "a few seconds ago" ? 'seconds ago' : moment(block.timestamp * 1000).fromNow());
            document.getElementById('block4').innerHTML = block.height+1;
          }
          if(dataB.result.block_header.height-1 == block.height) {
            document.getElementById('block6').innerHTML = block.height;
            block6hash = block.hash;
            document.getElementById("block6-click").addEventListener("click", function() { window.location.href="block.html?hash=" + block6hash; });
            document.getElementById('block6_size').innerHTML = numberWithCommas(block.block_size);
            document.getElementById('block6_txs').innerHTML = numberWithCommas(block.num_txes);
            document.getElementById('block6_time').innerHTML = moment(block.timestamp * 1000).fromNow();
            document.getElementById('block3').innerHTML = block.height+3;
          }
          if(dataB.result.block_header.height-2 == block.height) {
            document.getElementById('block7').innerHTML = block.height;
            block7hash = block.hash;
            document.getElementById("block7-click").addEventListener("click", function() { window.location.href="block.html?hash=" + block7hash; });
            document.getElementById('block7_size').innerHTML = numberWithCommas(block.block_size);
            document.getElementById('block7_txs').innerHTML = numberWithCommas(block.num_txes);
            document.getElementById('block7_time').innerHTML = moment(block.timestamp * 1000).fromNow();
            document.getElementById('block2').innerHTML = block.height+5;
          }
          if(dataB.result.block_header.height-3 == block.height) {
            document.getElementById('block8').innerHTML = block.height;
            block8hash = block.hash;
            document.getElementById("block8-click").addEventListener("click", function() { window.location.href="block.html?hash=" + block8hash; });
            document.getElementById('block8_size').innerHTML = numberWithCommas(block.block_size);
            document.getElementById('block8_txs').innerHTML = numberWithCommas(block.num_txes);
            document.getElementById('block8_time').innerHTML = moment(block.timestamp * 1000).fromNow();
            document.getElementById('block1').innerHTML = block.height+7;
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
  await getTransactionPool().then(async(transactions) => {
    document.getElementById('transactionPoolList').innerHTML = "";
    transactions = transactions.result;
    let transactionsAmount = 0;
    for(k = 0; k < transactions.transactions.length; k++) {
      var tbodyRef = document.getElementById('transactionPool').getElementsByTagName('tbody')[0];
      var newRow = tbodyRef.insertRow();

      var tr=document.createElement('tr');
      tr.innerHTML = `
      <td><b>${numberWithCommas((transactions.transactions[k].amount_out / (10 ** decimals)).toFixed(2))} ${ticker}</b></td>
      <td style="color:#00ff89;">$${(currentPriceUSD * (transactions.transactions[k].amount_out / (10 ** decimals))).toFixed(2)}</td>
      <td>${numberWithCommas((transactions.transactions[k].fee / (10 ** decimals)).toFixed(2))} ${ticker}</td>
      <td><a href="transaction.html?hash=${transactions.transactions[k].hash}" class="link-white">${transactions.transactions[k].hash}</a></td>`;
      tbodyRef.appendChild(tr);

      transactionsAmount++;
      document.getElementById('transactionPoolAmount').innerHTML = transactionsAmount
    }
  });
}

renderBlocksTransactions();
setInterval(async function() {
  renderBlocksTransactions();
}, 30000);
