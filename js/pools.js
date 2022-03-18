let poolNameA = [];
let poolValA = [];
let poolPercentageA = [];
let poolsValTotal = 0;

let hashrateChart = [];

async function getPoolsData() {
  await getPoolInfo('https://blocksum.org/api/v1/pools').then(async (dataB) => {
    for(const pool of dataB.pools) {
      console.log(pool)
      let hashrateData = [];
      var tbodyRef = document.getElementById('poolList').getElementsByTagName('tbody')[0];
      var newRow = tbodyRef.insertRow();

      var tr = document.createElement('tr');
      tr.innerHTML = `
        <td><a href="${pool.href}" class="link-white" style="text-decoration:underline;">${pool.name}</a></td>
        <td>${numberWithCommas(pool.data.network.height)}</td>
        <td>${prettifyNumber(pool.data.pool.hashrate, 2)}</td>
        <td>${prettifyNumber((pool.data.pool.hashrateSolo ? pool.data.pool.hashrateSolo : 0), 2)}</td>
        <td>${numberWithCommas(pool.data.pool.miners)}</td>
        <td>${numberWithCommas((pool.data.pool.minersSolo ? pool.data.pool.minersSolo : 0))}</td>
        <td>${pool.data.config.fee}%</td>
        <td>${pool.data.config.minPaymentThreshold / (10 ** decimals)} ${ticker}</td>`;
      tbodyRef.appendChild(tr);

      poolNameA.push(pool.name);
      poolValA.push(pool.data.pool.hashrate);
      poolsValTotal += pool.data.pool.hashrate;

      for (let j = 0; j < pool.data.charts.hashrate.length; j++) {
        hashrateData.push(pool.data.charts.hashrate[j][1]);
      }

      hashrateChart.push(
          {
            name: pool.name,
            data: hashrateData
          }
      );
    }
  });




  for(i = 0; i < poolNameA.length; i++) {
    poolPercentageA.push((poolValA[i] / poolsValTotal) * 100);
  }

  var options2 = {
    series: poolPercentageA,
    chart: {
      height: 350,
      width: '100%',
      type: 'pie',
    },
    labels: poolNameA,
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: '100%',
          height: 400
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };

  var options = {
    series: hashrateChart,
    chart: {
      height: 350,
      type: 'area'
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm'
      },
    },
    yaxis: {
      labels: {
        padding: 4,
        formatter: function (value) {
          return prettifyNumber(value, 2);
        }
      },
    },
  };

  var chart = new ApexCharts(document.querySelector("#poolChart"), options);
  chart.render();

  var chart = new ApexCharts(document.querySelector("#pieChart"), options2);
  chart.render();
}

getPoolsData();

