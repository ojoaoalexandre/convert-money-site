const express = require('express')
const router = express.Router()
const controller = require('../controllers/pages')

router.get('/', controller.home)
router.get('/filter', controller.filter)
router.get('/quotation', controller.quotation)

module.exports = router