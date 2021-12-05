const express = require('express')

const {
  get, destroy, post, update,
} = require('../controllers/members')
const { validateRequest } = require('../middlewares')
const isAdmin = require('../middlewares/isAdmin')

const { memberSchema } = require('../schemas/members')

const router = express.Router()

/* GET all active members */
router.get('/', isAdmin, get)
/* POST new member */
router.post('/', [isAdmin, validateRequest(memberSchema)], post)
/* UPDATE new member */
router.put('/:id', [isAdmin, validateRequest(memberSchema)], update)
/* DELETE new member */
router.delete('/:id', isAdmin, destroy)

module.exports = router
