const express = require('express')
const router = express.Router()
const controller = require('../controllers/pages')
const { getListCurrency } = require('../lib/apiBC')

router.get('/', async (req, res, next) => {
    const { list } = await getListCurrency()
    router.get('/', controller.home.bind(null, list))
    router.get('/filter', controller.filter.bind(null, list))
    router.get('/q', controller.quotation.bind(null, list))
    next()
})

router.get('/getQuotation', controller.queryQuotation)
router.get('/teste', controller.teste)

module.exports = router