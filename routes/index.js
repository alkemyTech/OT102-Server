const express = require('express')

const router = new express.Router()

const usersRouter = require('./user')
const pingRouter = require('./ping')

router.use('/users', usersRouter)
router.use('/ping', pingRouter)

module.exports = router
