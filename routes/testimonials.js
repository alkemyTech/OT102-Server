const express = require('express')
const { updateTestimonial } = require('../controllers/testimonials')

const router = new express.Router()

router.put('/:id', updateTestimonial)

module.exports = router
