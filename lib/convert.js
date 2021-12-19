const trade = (currency, currencyTrade) => {
    return currency * currencyTrade
}

const toCurrency = currency => {
    return parseFloat(currency).toFixed(2)
}

module.exports = {
    trade,
    toCurrency
}