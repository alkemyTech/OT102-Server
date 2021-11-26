const express = require('express')

const router = new express.Router()
const { pong } = require('../controllers/ping')
const isAdmin = require('../middlewares/isAdmin')

router.get('/', pong)
router.get('/admin', isAdmin, pong)

module.exports = router
