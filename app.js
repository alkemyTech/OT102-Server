const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
const errorHandlerMiddleware = require('./middlewares/error-handler')
require('dotenv').config()

const indexRouter = require('./routes/index')

const app = express()
app.use(cors())

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)

/**
 * Any error handler middleware must be
 * added AFTER you define your routes.
 */
app.use(errorHandlerMiddleware)

module.exports = app
