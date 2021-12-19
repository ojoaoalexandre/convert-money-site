const axios = require("axios")
const moment = require('moment')

const getListCurrency = async () => {
    const response = await axios.get(`https://economia.awesomeapi.com.br/json/available`).then(response => response.data)

    // format the list
    const listFormat = Object.keys(response).map(item => {
        const [code, codein] = item.split("-")
        const [name, namein] = response[item].split("/")

        return {
            code,
            name,
            codein,
            namein
        }
    })
    // extract all coin codes
    const coinCodesAll = listFormat.map(item => item.code)
    // filter the unique codes
    const coinCodesUnique = [...new Set(coinCodesAll)]
    // create a new format to each coin code
    const list = coinCodesUnique.map(code => {
        const group = {}
        group[code] = listFormat.filter(item => item.code == code)
        return group
    })

    return {
        list
    }
}

const getDataAPI = (codeCoinCurrent, codeCoinConvert) => {
    const coin = `${codeCoinCurrent}-${codeCoinConvert}`
    const url = `https://economia.awesomeapi.com.br/last/${coin}`
    return axios.get(url)
}

const getQuotation = async (codeCoinCurrent, codeCoinConvert) => {
    try {
        const response = await getDataAPI(codeCoinConvert, codeCoinCurrent)

        // Exemplo de retorno:
        // {
        //   "USDBRL": {
        //     "code": "USD",
        //     "codein": "BRL",
        //     "name": "Dólar Americano/Real Brasileiro",
        //     "high": "5.7148",
        //     "low": "5.6619",
        //     "varBid": "0.0077",
        //     "pctChange": "0.14",
        //     "bid": "5.6959",
        //     "ask": "5.6964",
        //     "timestamp": "1639776593",
        //     "create_date": "2021-12-17 18:29:53"
        //   }
        // }

        const {
            code,
            codein,
            name,
            ask,
            create_date
        } = await response.data[codeCoinConvert + codeCoinCurrent]

        return {
            code,
            ask,
            last_update: moment(create_date, "YYYY-MM-DD hh:mm:ss").format("DD/MM/YYYY")
        }
    } catch (error) {
        return ''
    }
}

module.exports = {
    getQuotation,
    getListCurrency
}