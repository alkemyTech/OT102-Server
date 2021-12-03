const express = require('express')
const { createUser, getMyUser } = require('../controllers/users')
const { validateRequest } = require('../middlewares')
const userExtractor = require('../middlewares/userExtractor')
const { userRegisterSchema } = require('../schemas/users')

const router = new express.Router()

router.post('/register', validateRequest(userRegisterSchema), createUser)
router.get('/me', userExtractor, getMyUser)

module.exports = router
