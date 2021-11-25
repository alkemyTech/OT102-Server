const express = require('express')

const router = new express.Router()

const usersRouter = require('./user')
const pingRouter = require('./ping')
const categoriesRouter = require('./categories')
const membersRouter = require('./members')

router.use('/users', usersRouter)
router.use('/ping', pingRouter)
router.use('/categories', categoriesRouter)
router.use('/members', membersRouter)

module.exports = router
