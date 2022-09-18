//Charts

let hashrateData = [];
let difficultyData = [];
let blockSizeData = [];
let transactionsData = [];
let huginData = [];
let blockTime = [];
let knownBlocks = [];

async function renderCharts() {
  knownBlocks = [];
  await getLatestBlock().then(async (latestBlock) => {
    for (let i = 1; i < 500; i = i + 5) {
      await getBlock(latestBlock.result.block_header.height - i).then(async data => {
        let block = data.result.block_header;
        knownBlocks.push(block);
        hashrateData.push(block.difficulty / difficulty_target);
        difficultyData.push(block.difficulty);
        blockSizeData.push(block.block_size);
        transactionsData.push(block.num_txes);
        blockTime.push(block.timestamp);
        huginData.push(0);

      });
    }
  });

  hashrateData.reverse();
  difficultyData.reverse();
  blockSizeData.reverse();
  transactionsData.reverse();
  blockTime.reverse();
  huginData.reverse();

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
      type: 'gradient',
      gradient: {
      shade: 'dark',
      type: "vertical",
      shadeIntensity: 0.5,
      gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
      inverseColors: true,
      opacityFrom: 1,
      opacityTo: 0,
      stops: [0, 100],
      colorStops: []
    }
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
    colors: ["#f25fd0"],
    legend: {
      show: false,
    },
  })).render();

  window.ApexCharts && (new ApexCharts(document.getElementById('hugin-chart'), {
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
      type: 'gradient',
      gradient: {
      shade: 'dark',
      type: "vertical",
      shadeIntensity: 0.5,
      gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
      inverseColors: true,
      opacityFrom: 1,
      opacityTo: 0,
      stops: [0, 100],
      colorStops: []
    }
    },
    stroke: {
      width: 2,
      lineCap: "round",
      curve: "smooth",
    },
    series: [{
      name: "Hugin messages",
      data: huginData
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
    colors: ["#f25f61"],
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
      type: 'gradient',
      gradient: {
      shade: 'dark',
      type: "vertical",
      shadeIntensity: 0.5,
      gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
      inverseColors: true,
      opacityFrom: 1,
      opacityTo: 0,
      stops: [0, 100],
      colorStops: []
    }
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
    colors: ["#f2cb5f"],
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
      type: 'gradient',
      gradient: {
      shade: 'dark',
      type: "vertical",
      shadeIntensity: 0.5,
      gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
      inverseColors: true,
      opacityFrom: 1,
      opacityTo: 0,
      stops: [0, 100],
      colorStops: []
    }
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
    colors: ["#abf25f"],
    legend: {
      show: false,
    },
  })).render();
  renderHuginChart()
}

async function renderHuginChart() {

  huginstats3.reverse()

  huginstats2.reverse()

  huginstats.reverse()

  huginstatslabels.reverse()

  document.getElementById('hugin-chart').innerHTML = '';
  window.ApexCharts && (new ApexCharts(document.getElementById('hugin-chart'), {
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
      type: 'gradient',
      gradient: {
      shade: 'dark',
      type: "vertical",
      shadeIntensity: 0.5,
      gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
      inverseColors: true,
      opacityFrom: 1,
      opacityTo: 0,
      stops: [0, 100],
      colorStops: []
    }
    },
    stroke: {
      width: 2,
      lineCap: "round",
      curve: "smooth",
    },
    series: [{
      name: "Boards messages",
      data: huginstats
    }, {
      name: "Private messages",
      data: huginstats2
    },
    {
      name: "Group messages",
      data: huginstats3
    }],
    grid: {
      strokeDashArray: 4,
    },
    xaxis: {
      labels: {
        padding: 0,
        formatter: function (value) {
          return value;
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
    labels: huginstatslabels,
    colors: ["#5f86f2", "#a65ff2", "#5ff281"],
    legend: {
      show: false,
    },
  })).render();

}

renderCharts();
