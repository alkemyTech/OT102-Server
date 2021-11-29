const express = require('express')
const { get } = require('../controllers/testimonials')

const router = new express.Router()

// Get testimonials listing:
router.get('/', get)

module.exports = router
