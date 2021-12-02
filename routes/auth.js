const express = require('express')
const { createUser } = require('../controllers/users')
const { validateRequest } = require('../middlewares')
const { userRegisterSchema } = require('../schemas/users')

const router = new express.Router()

router.post('/register', validateRequest(userRegisterSchema), createUser)

module.exports = router
