const express = require('express')

const router = new express.Router()

const categoriesRouter = require('./categories')
const contactsRouter = require('./contacts')
const entriesRouter = require('./entries')
const membersRouter = require('./members')
const organizationsRouter = require('./organizations')
const pingRouter = require('./ping')
const usersRouter = require('./user')

router.use('/categories', categoriesRouter)
router.use('/contacts', contactsRouter)
router.use('/members', membersRouter)
router.use('/news', entriesRouter)
router.use('/organizations', organizationsRouter)
router.use('/ping', pingRouter)
router.use('/users', usersRouter)

module.exports = router
