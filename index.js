const express = require('express')
const path = require('path')
const port = process.env.PORT || 3000

// routes
const routePages = require('./routes/pages')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// assets
app.use(express.static(path.join(__dirname, 'public')))

// path to views
app.set('views', path.join(__dirname, 'views'))
// view engine
app.set('view engine', 'ejs')

app.use('/', routePages)

app.listen(port, () => console.log('Server Running'))