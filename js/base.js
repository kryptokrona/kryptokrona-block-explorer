function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


function timeConvert(timestamp) {

  return moment(timestamp * 1000).format('lll');
}

const fetchWithTimeout = (uri, options = {}, time = 1000) => {
  // Lets set up our `AbortController`, and create a request options object
  // that includes the controller's `signal` to pass to `fetch`.
  const controller = new AbortController()
  const config = { ...options, signal: controller.signal }
  // Set a timeout limit for the request using `setTimeout`. If the body
  // of this timeout is reached before the request is completed, it will
  // be cancelled.
  const timeout = setTimeout(() => {
    controller.abort()
  }, time)
  return fetch(uri, config)
    .then((response) => {
      // Because _any_ response is considered a success to `fetch`, we
      // need to manually check that the response is in the 200 range.
      // This is typically how I handle that.
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`)
      }
      return response
    })
    .catch((error) => {
      // When we abort our `fetch`, the controller conveniently throws
      // a named error, allowing us to handle them separately from
      // other errors.
      if (error.name === 'AbortError') {
        throw new Error('Response timed out')
      }
      throw new Error(error.message)
    })
}

function prettifyNumber(value, decimal) {
  var kilo = 1000,
    mega = 1000000,
    giga = 1000000000,
    tera = 1000000000000;

  if (value < kilo) return String((value)
    .toFixed(decimal) + ' H/s');
  if (value >= kilo && value <= mega) return (value / kilo)
    .toFixed(decimal) + ' KH/s';
  if (value >= mega && value <= giga) return (value / mega)
    .toFixed(decimal) + ' MH/s';
  if (value >= giga && value <= tera) return (value / giga)
    .toFixed(decimal) + ' GH/s';
  else return (value / tera)
    .toFixed(decimal) + ' TH/s';
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getBlock(height) {
  const response = await fetch(api + '/json_rpc', {
    method: 'POST',
    cache: 'force-cache',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: "test",
      method: "getblockheaderbyheight",
      params: {
        height: height
      }
    })
  });
  return response.json();
}

async function getPoolInfo(url) {
  const response = await fetch(url, {
    method: 'GET',
    cors: 'no-cors'
  });
  return response.json();
}

async function getLatestBlock() {
  const response = await fetch(api + '/json_rpc', {
    method: 'POST',
    cache: 'no-cache',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: "test",
      method: "getlastblockheader",
      params: {
      }
    })
  });
  return response.json();
}

async function getByBlockHash(hash) {
  const response = await fetch(api + '/json_rpc', {
    method: 'POST',
    cache: 'no-cache',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: "test",
      method: "f_block_json",
      params: {
        hash: hash
      }
    })
  });
  return response.json();
}

async function getTransaction(hash) {
  const response = await fetch(api + '/json_rpc', {
    method: 'POST',
    cache: 'no-cache',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: "test",
      method: "f_transaction_json",
      params: {
        hash: hash
      }
    })
  });
  return response.json();
}

async function getTransactionPool() {
  const response = await fetch(api + '/json_rpc', {
    method: 'POST',
    cache: 'no-cache',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: "test",
      method: "f_on_transactions_pool_json",
      params: {
      }
    })
  });
  return response.json();
}



var input = document.getElementById("searchBar");
input.addEventListener("keyup", async function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    var numbers = /^[0-9]+$/;
    if(document.getElementById('searchBar').value.match(numbers))
    {
      await getByBlockHash(document.getElementById('searchBar').value).then(async(dataB) => {
        window.location.href = "block.html?hash=" + dataB.result.block.hash;
      });
    } else {
      await getByBlockHash(document.getElementById('searchBar').value).then(async(dataB) => {
        if(dataB.error) {
          await getTransaction(document.getElementById('searchBar').value).then(async(dataC) => {
            window.location.href = "transaction.html?hash=" + document.getElementById('searchBar').value;
          });
        } else {
          window.location.href = "block.html?hash=" + dataB.result.block.hash;
        }
      });
    }
  }
})
