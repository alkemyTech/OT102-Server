const express = require('express')
const { post } = require('../controllers/auth')
const { validateRequest } = require('../middlewares')
const { userRegisterSchema } = require('../schemas/auth')

const router = new express.Router()

router.post('/register', validateRequest(userRegisterSchema), post)

module.exports = router
