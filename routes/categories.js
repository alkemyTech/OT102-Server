const express = require('express')
const { get } = require('../controllers/categories')

const router = new express.Router()

router.get('/', get)

module.exports = router
