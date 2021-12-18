const axios = require("axios")
const moment = require('moment')

const getUrl = () => {
    const date = new Date()
    return `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${moment().format('M-D-YYYY')}'&$top=100&$format=json`
}

const getDataAPI = () => axios.get(getUrl())
const quotationValue = response => response.data.value[0].cotacaoVenda

const getQuotation = async () => {
    try {
        const data = await getDataAPI()
        const quotation = await quotationValue(data)
        return quotation
    } catch (error) {
        return ''
    }
}

module.exports = {
    getQuotation
}