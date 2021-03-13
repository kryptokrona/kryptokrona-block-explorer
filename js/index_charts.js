//Charts

let hashrateData = [];
let difficultyData = [];
let blockSizeData = [];
let transactionsData = [];
let blockTime = [];

async function renderCharts() {
  await getLatestBlock().then(async (latestBlock) => {
    for (let i = 1; i < 500; i = i + 5) {
      await getBlock(latestBlock.result.block_header.height - i).then(data => {
        let block = data.result.block_header;

        hashrateData.push(block.difficulty / difficulty_target);
        difficultyData.push(block.difficulty);
        blockSizeData.push(block.block_size);
        transactionsData.push(block.num_txes);
        blockTime.push(block.timestamp);
      });
    }
  });

  hashrateData.reverse();
  difficultyData.reverse();
  blockSizeData.reverse();
  transactionsData.reverse();
  blockTime.reverse();

  window.ApexCharts && (new ApexCharts(document.getElementById('hashrate-chart'), {
    chart: {
      type: "area",
      fontFamily: 'inherit',
      height: 100.0,
      sparkline: {
        enabled: true
      },
      animations: {
        enabled: false
      },
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: .16,
      type: 'solid'
    },
    stroke: {
      width: 2,
      lineCap: "round",
      curve: "smooth",
    },
    series: [{
      name: "Hashrate",
      data: hashrateData
    }],
    grid: {
      strokeDashArray: 4,
    },

    xaxis: {
      labels: {
        padding: 0,
        formatter: function (value) {
          return timeConvert(value);
        }
      },
      tooltip: {
        enabled: false
      },
      axisBorder: {
        show: false,
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
    labels: blockTime,
    colors: ["#6f6f6f"],
    legend: {
      show: false,
    },
  })).render();

  window.ApexCharts && (new ApexCharts(document.getElementById('difficulty-chart'), {
    chart: {
      type: "area",
      fontFamily: 'inherit',
      height: 100.0,
      sparkline: {
        enabled: true
      },
      animations: {
        enabled: false
      },
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: .16,
      type: 'solid'
    },
    stroke: {
      width: 2,
      lineCap: "round",
      curve: "smooth",
    },
    series: [{
      name: "Difficulty",
      data: difficultyData
    }],
    grid: {
      strokeDashArray: 4,
    },
    xaxis: {
      labels: {
        padding: 0,
        formatter: function (value) {
          return timeConvert(value);
        }
      },
      tooltip: {
        enabled: false
      },
      axisBorder: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        padding: 4,
        formatter: function (value) {
          return numberWithCommas(parseInt(value));
        }
      },
    },
    labels: blockTime,
    colors: ["#6f6f6f"],
    legend: {
      show: false,
    },
  })).render();

  window.ApexCharts && (new ApexCharts(document.getElementById('blocksize-chart'), {
    chart: {
      type: "area",
      fontFamily: 'inherit',
      height: 100.0,
      sparkline: {
        enabled: true
      },
      animations: {
        enabled: false
      },
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: .16,
      type: 'solid'
    },
    stroke: {
      width: 2,
      lineCap: "round",
      curve: "smooth",
    },
    series: [{
      name: "Block size",
      data: blockSizeData
    }],
    grid: {
      strokeDashArray: 4,
    },
    xaxis: {
      labels: {
        padding: 0,
        formatter: function (value) {
          return timeConvert(value);
        }
      },
      tooltip: {
        enabled: false
      },
      axisBorder: {
        show: true,
      },
    },
    yaxis: {
      labels: {
        padding: 4,
        formatter: function (value) {
          return numberWithCommas(value);
        }
      },
    },
    labels: blockTime,
    colors: ["#6f6f6f"],
    legend: {
      show: false,
    },
  })).render();

  window.ApexCharts && (new ApexCharts(document.getElementById('transactions-chart'), {
    chart: {
      type: "area",
      fontFamily: 'inherit',
      height: 100.0,
      sparkline: {
        enabled: true
      },
      animations: {
        enabled: false
      },
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: .16,
      type: 'solid'
    },
    stroke: {
      width: 2,
      lineCap: "round",
      curve: "smooth",
    },
    series: [{
      name: "Transactions",
      data: transactionsData,
    }],
    grid: {
      strokeDashArray: 4,
    },
    xaxis: {
      labels: {
        padding: 0,
        formatter: function (value) {
          return timeConvert(value);;
        }
      },
      tooltip: {
        enabled: false
      },
      axisBorder: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        padding: 4,
        formatter: function (value) {
          return numberWithCommas(value);
        }
      },
    },
    labels: blockTime,
    colors: ["#6f6f6f"],
    legend: {
      show: false,
    },
  })).render();
}

renderCharts();