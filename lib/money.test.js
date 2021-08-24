const money = require('./money')

test('CONVERT', () => {
    expect(money.convert(5,2)).toBe(10)
})

test('TOMONEY', () => {
    expect(money.toMoney(5)).toBe('5.00')
})

test('TOMONEY STRING', () => {
    expect(money.toMoney('5')).toBe('5.00')
})