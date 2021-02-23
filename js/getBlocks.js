async function renderBlocksTransactions(amount) {
  await getLatestBlock().then(async(dataB) => {
    document.getElementById('10latestBlocksList').innerHTML = "";
    let blockHash = dataB.result.block_header.hash;
    let transactionCount = 0;
    for(i = 0; i < (amount ? amount : 50); i++) {
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
        }
      });
    }
  });
}

renderBlocksTransactions();