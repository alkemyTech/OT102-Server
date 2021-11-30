const express = require('express')
const { createUser, loginUser } = require('../controllers/users')
const { validateRequest } = require('../middlewares')
const { userRegisterSchema } = require('../schemas/users')

const router = new express.Router()

router.post('/register', validateRequest(userRegisterSchema), createUser)
router.post('/login', loginUser)

module.exports = router
