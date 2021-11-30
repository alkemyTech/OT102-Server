const express = require('express')
const { get, post, update } = require('../controllers/members')

const { validateRequest } = require('../middlewares')

const { memberSchema } = require('../schemas/members')

const router = express.Router()

/* GET all active members */
router.get('/', get)
/* POST new member */
router.post('/', validateRequest(memberSchema), post)
/* UPDATE new member */
router.put('/', validateRequest(memberSchema), update)

module.exports = router
