const apiBC = require('./apiBC')
const axios = require('axios')

jest.mock('axios')
test('getQuotationAPI', () => {
    const res = {
        data: {
            value: [
                { cotacaoVenda: 5.71 }
            ]
        }
    }

    axios.get.mockResolvedValue(res)
    apiBC.getQuotation().then(res => {
        expect(res).toEqual(5.71)
    })
})