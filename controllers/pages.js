const { trade, toCurrency } = require('../lib/convert')
const { getQuotation } = require('../lib/apiBC')

const selectCoin = [
    { name: "Real Brasileiro", code: "BRL" },
    { name: "Dólar Americano", code: "USD" },
    { name: "Euro", code: "EUR" },
    { name: "Bitcoin", code: "BTC" }
]

const home = async (req, res) => {
    const {
        fromCoinValue,
        toCoinValue,
        fromCoinCode,
        toCoinCode
    } = req.query

    const fromValue = fromCoinValue ?? 1
    const fromCode = fromCoinCode ?? "EUR"
    const toCode = toCoinCode ?? "DOGE"

    res.render('home', {
        fromCoinValue: fromValue,
        fromCoinCode: fromCode,
        quotation: await getQuotation(fromCode, toCode),
        selectCoin,
    })
}

const quotation = async (req, res) => {
    const { currency, currencyTrade } = req.query

    if (currency && currencyTrade) {
        const currencyConvert = trade(currency, currencyTrade)
        res.render('quotation', {
            currencyConverted: toCurrency(currencyConvert),
            currency: toCurrency(currency),
            currencyTrade: toCurrency(currencyTrade),
            error: false
        })
    } else {
        res.render('home', {
            error: 'Valores Inválidos',
            quotation: await getQuotation()
        })
    }
}

module.exports = {
    home,
    quotation
}