const axios = require("axios")
const moment = require('moment')

const getListCurrency = async () => {
    const list = []
    const response = await axios.get(`https://economia.awesomeapi.com.br/json/available`).then(response => response.data)

    Object.keys(response).map(item => {
        const [code, codein] = item.split("-")
        list.push({
            code,
            codein,
            name: response[item]
        })
    })
    console.log(list)
    return list
}

const getDataAPI = (codeCoinCurrent, codeCoinConvert) => {
    const coin = `${codeCoinCurrent}-${codeCoinConvert}`
    const url = `https://economia.awesomeapi.com.br/last/${coin}`
    return axios.get(url)
}

const getQuotation = async (codeCoinCurrent, codeCoinConvert) => {
    getListCurrency()
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

        console.log(codeCoinConvert + codeCoinCurrent)
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
    getQuotation
}