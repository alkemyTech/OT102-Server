const express = require('express')
const { createUser, getMyUser, login } = require('../controllers/users')
const { validateRequest } = require('../middlewares')
const userExtractor = require('../middlewares/userExtractor')
const { userRegisterSchema, userLoginSchema } = require('../schemas/users')

const router = new express.Router()

router.post('/register', validateRequest(userRegisterSchema), createUser)
router.post('/login', validateRequest(userLoginSchema), login)
router.get('/me', userExtractor, getMyUser)

module.exports = router
