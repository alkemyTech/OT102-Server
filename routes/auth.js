const express = require('express')
const { post } = require('../controllers/users')
const { validateRequest } = require('../middlewares')
const { userRegisterSchema } = require('../schemas/users')

const router = new express.Router()

router.post('/register', validateRequest(userRegisterSchema), post)

module.exports = router
