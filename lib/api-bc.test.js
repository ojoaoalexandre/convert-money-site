const api = require('./api-bc')

// Informa para o jest que o axios será simulado
const axios = require('axios')
jest.mock('axios')

test('getPricesAPI', () => {
    const res = {
        data: {
            value: [
                {
                    cotacaoVenda: 5.10
                }
            ]
        }
    }
    axios.get.mockResolvedValue(res)
    api.getPricesAPI('8-31-2021').then(response => {
        expect(response).toEqual(res)
    })
})

test('extractSalePrice', () => {
    const res = api.extractSalePrice({
        data: {
            value: [
                {
                    cotacaoVenda: 5.10
                }
            ]
        }
    })
    expect(res).toBe(5.10)
})