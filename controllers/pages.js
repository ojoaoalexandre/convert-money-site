const { trade, toCurrency } = require('../lib/convert')
const { getQuotation } = require('../lib/apiBC')

const home = async (req, res) =>
    res.render('home', {
        quotation: await getQuotation()
    })

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