const express = require('express')

const categoriesRouter = require('./categories')
const contactsRouter = require('./contacts')
const entriesRouter = require('./entries')
const membersRouter = require('./members')
const organizationsRouter = require('./organizations')
const pingRouter = require('./ping')
const testimonialsRouter = require('./testimonials')
const usersRouter = require('./user')

const router = new express.Router()

router.use('/categories', categoriesRouter)
router.use('/contacts', contactsRouter)
router.use('/members', membersRouter)
router.use('/news', entriesRouter)
router.use('/organizations', organizationsRouter)
router.use('/ping', pingRouter)
router.use('/testimonials', testimonialsRouter)
router.use('/users', usersRouter)

module.exports = router
