const express = require('express')

const router = new express.Router()

const usersRouter = require('./user')
const pingRouter = require('./ping')
const categoriesRouter = require('./categories')
const organizationsRouter = require('./organizations')

router.use('/users', usersRouter)
router.use('/ping', pingRouter)
router.use('/categories', categoriesRouter)
router.use('/organizations', organizationsRouter)

module.exports = router
