const express = require('express')
const { get, post, destroy } = require('../controllers/users')
const { validateRequest } = require('../middlewares')
const { userSchema } = require('../schemas/user')

const router = new express.Router()

/* GET users listing. */
router.get('/', get)
router.post('/auth/register', validateRequest(userSchema), post)
router.delete('/:id', destroy)

module.exports = router
