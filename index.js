const express = require('express')
const path = require('path')
const port = 3000 | process.env.PORT

// routes
const routePages = require('./routes/pages')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// path to views
app.set('views', path.join(__dirname, 'views'))
// view engine
app.set('view engine', 'ejs')

app.use('/', routePages)

app.use(express.static('public'))
app.listen(port, () => console.log('Server Running'))