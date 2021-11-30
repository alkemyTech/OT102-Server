const express = require('express')
const isAdmin = require('../middlewares/isAdmin')
const { get, destroy, post } = require('../controllers/members')
const { validateRequest } = require('../middlewares')
const { memberSchema } = require('../schemas/members')

const router = express.Router()

/* GET all active members */
router.get('/', get)
router.delete('/:id', isAdmin, destroy)
router.post('/', validateRequest(memberSchema), post)

module.exports = router
