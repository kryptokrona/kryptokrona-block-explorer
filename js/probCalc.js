//Profitability calc

var numberFormatter = new Intl.NumberFormat('en-US'); // US formatting, force commas.

function localizeNumber(number) {
    return numberFormatter.format(number);
}

function updateText(elementId, text) {
    var el = document.getElementById(elementId);
    if (el.textContent !== text) {
        el.textContent = text;
    }
    return el;
}

function getReadableCoins(coins, digits, withoutSymbol) {
    var amount = (parseInt(coins || 0) / coinUnits).toFixed(digits || coinUnits.toString().length - 1);
    return localizeNumber(amount) + (withoutSymbol ? '' : (' ' + symbol));
}

$('#calcHashRate').keyup(calcEstimateProfit).change(calcEstimateProfit);
$('#calcHashUnits > li > a').click(function (e) {
    e.preventDefault();
    $('#calcHashUnit').text($(this).text()).data('mul', $(this).data('mul'));
    calcEstimateProfit();
});


function calcEstimateProfit() {
    try {
        var rateUnit = Math.pow(1024, parseInt($('#calcHashUnit').data('mul')));
        var hashRate = parseFloat($('#calcHashRate').val()) * rateUnit;
        var profit = (hashRate * 86400 / avgDiff /*lastStats.difficulty*/ ) * lastReward;
        if (profit) {
            updateText('calcHashAmount', getReadableCoins(profit, 2, true));
            return;
        }
    } catch (e) {}
    updateText('calcHashAmount', '');
    console.log("yo")
}