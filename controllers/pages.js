const { getQuotation } = require('../lib/apiBC')
const { trade, toCurrency } = require('../lib/convert')

const filter = async (list, req, res) => {
    const { from } = req.query
    const filterList = list.filter(item => item[from])
    const newList =
        filterList[0][from].map(item => {
            const name = item.name
            const code = item.code
            return {
                name,
                code
            }
        })

    // sort list
    newList.sort((item, next) => (item.name > next.name) ? 1 : -1)
    res.send(newList)
}

const queryQuotation = async (req, res) => {
    const { to, from } = req.query
    const coin = await getQuotation(to, from)
    res.send(coin)
}

const home = async (list, req, res) => {
    const listFrom = list.map(item => {
        const [coin] = Object.keys(item).map(coin => {
            const name = item[coin][0].namein
            const code = item[coin][0].codein
            return {
                name,
                code
            }
        })
        return coin
    })

    // sort list
    listFrom.sort((item, next) => (item.name > next.name) ? 1 : -1)

    const { fromCode, toCode } = req.query

    res.render('home', {
        fromValue: 1,
        fromCode: "BRL",
        toValue: await getQuotation(fromCode, toCode),
        listFrom
    })
}

const quotation = async (req, res) => {
    let result = {}
    const { toCode, toValue, fromCode, fromValue } = req.query

    if (toCode && toValue && fromCode && fromValue) {
        const convert = trade(toValue, fromValue)
        result = {
            toValue: toCurrency(toValue),
            toCode,
            fromValue: toCurrency(fromValue),
            fromCode,
            convert,
            error: false
        }
    } else {
        result = {
            error: 'Valores Inválidos'
        }
    }

    res.render('quotation', result)
}

const teste = (req, res) => {
    res.render('teste')
}

module.exports = {
    home,
    quotation,
    filter,
    queryQuotation,
    teste
}