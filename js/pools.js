let poolNameA = [];
let poolValA = [];
let poolPercentageA = [];
let poolsValTotal = 0;

let hashrateChart = [];

async function getPoolsData() {
  for(i = 0; i < pools.length; i++) {
    try {
      await getPoolInfo(pools[i][2]).then(async(dataB) => {
        let hashrateData = [];
        var tbodyRef = document.getElementById('poolList').getElementsByTagName('tbody')[0];
        var newRow = tbodyRef.insertRow();

        var tr=document.createElement('tr');
        tr.innerHTML = `
        <td><a href="${pools[i][1]}" class="link-white" style="text-decoration:underline;">${pools[i][0]}</a></td>
        <td>${numberWithCommas(dataB.network.height)}</td>
        <td>${prettifyNumber(dataB.pool.hashrate, 2)}</td>
        <td>${prettifyNumber((dataB.pool.hashrateSolo ? dataB.pool.hashrateSolo : 0) , 2)}</td>
        <td>${numberWithCommas(dataB.pool.miners)}</td>
        <td>${numberWithCommas((dataB.pool.minersSolo ? dataB.pool.minersSolo : 0))}</td>
        <td>${dataB.config.fee}%</td>
        <td>${dataB.config.minPaymentThreshold / (10**decimals)} ${ticker}</td>
        <td>${numberWithCommas(dataB.pool.totalPayments)}</td>
        <td>${numberWithCommas(dataB.pool.totalMinersPaid)}</td>
        <td>${(dataB.pool.stats.lastBlockFoundprop ? '-' : moment(dataB.pool.stats.lastBlockFoundprop).fromNow())}</td>`;
        tbodyRef.appendChild(tr);

        poolNameA.push(pools[i][0]);
        poolValA.push(dataB.pool.hashrate);
        poolsValTotal += dataB.pool.hashrate;

        for(let j = 0; j < dataB.charts.hashrate.length; j++) {
          hashrateData.push(dataB.charts.hashrate[j][1]);
        }

        hashrateChart.push(
          {
            name: pools[i][0],
            data: hashrateData
          }
        );
      });
    } catch(e) {
      
    }
  }

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

