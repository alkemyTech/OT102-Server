const express = require('express')
const { get, post } = require('../controllers/members')

const { validateRequest } = require('../middlewares')
const isAdmin = require('../middlewares/isAdmin')
const { memberSchema } = require('../schemas/members')

const router = express.Router()

/* GET all active members */
router.get('/', isAdmin, get)
/* POST new member */
router.post('/', [isAdmin, validateRequest(memberSchema)], post)

module.exports = router
