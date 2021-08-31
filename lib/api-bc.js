const axios = require('axios')
const getUrl = data => `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${data}'&$top=100&$skip=0&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`
const getToday = () => {
    const today = new Date()
    return `${today.getMonth() + 1}-${today.getDate()}-${today.getFullYear()}`
}

const getPricesAPI = url => axios.get(url)
const extractSalePrice = res => res.data.value[0].cotacaoVenda

const getSalePrice = async() => {
    try {
        const today = getToday()
        const url = getUrl(today)
        const res = await getPricesAPI(url)
        const salePrice = extractSalePrice(res)
        return salePrice
    } catch (err) {
        return ''
    }
}

module.exports = {
    getPricesAPI,
    extractSalePrice,
    getSalePrice
}