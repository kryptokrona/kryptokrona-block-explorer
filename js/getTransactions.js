async function renderBlocksTransactions(amount) {
  let currentPriceUSD = 0;
    await getPoolInfo("https://api.coinpaprika.com/v1/tickers/xkr-kryptokrona")
      .then(dataB => {
    currentPriceUSD = dataB.quotes.USD.price;
  });

  await getLatestBlock().then(async(dataB) => {
    document.getElementById('10latestTransactionsList').innerHTML = "";
    let blockHash = dataB.result.block_header.hash;
    let transactionCount = 0;
    for(i = 0; i < (amount ? amount : 50); i++) {
      while(transactionCount < (amount ? amount : 50)) {
        await getByBlockHash(blockHash).then(async(blockie) => {
          blockie = blockie.result.block;
          for(k = 0; k < blockie.transactions.length; k++) {
            if(transactionCount < (amount ? amount : 50)) {
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
}

renderBlocksTransactions();
