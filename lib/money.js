const convert = (quotation, amount) => quotation * amount
const toMoney = value => parseFloat(value).toFixed(2)

module.exports = {
    convert,
    toMoney
}