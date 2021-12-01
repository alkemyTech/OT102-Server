const express = require('express')
const { createUser, login } = require('../controllers/users')
const { validateRequest } = require('../middlewares')
const { userRegisterSchema, userLoginSchema } = require('../schemas/users')

const router = new express.Router()

router.post('/register', validateRequest(userRegisterSchema), createUser)
router.post('/login', validateRequest(userLoginSchema), login)

module.exports = router
