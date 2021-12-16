const axios = require("axios")

const url = () => {
    const date = new Date()
    return `https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${(date.getMonth() + 1)}-${date.getDate()}-${date.getFullYear()}'&$top=100&$format=json`
}

const apiBCQuotation = async () => {
    const response = await axios({
        method: 'get',
        url: url()
    })

    const value = await response.data.value[0].cotacaoCompra
    return value
}

module.exports = {
    apiBCQuotation
}