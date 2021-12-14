const { trade, toCurrency } = require('./convert')

test('convert currency 5 to currencyTrade 5', () => {
    expect(trade(5, 5)).toBe(25)
})

test('convert currency 5 to 5.00', () => {
    expect(toCurrency(5)).toBe("5.00")
})

test('convert string currency 5 to 5.00', () => {
    expect(toCurrency("5")).toBe("5.00")
})