const express = require('express')

const router = new express.Router()

const usersRouter = require('./user')
const pingRouter = require('./ping')
const categoriesRouter = require('./categories')
const entriesRouter = require('./entries')

router.use('/users', usersRouter)
router.use('/ping', pingRouter)
router.use('/categories', categoriesRouter)
router.use('/news', entriesRouter)

module.exports = router
