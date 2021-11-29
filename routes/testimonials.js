const express = require('express')
const { get, updateTestimonial } = require('../controllers/testimonials')
const isAdmin = require('../middlewares/isAdmin')

const router = new express.Router()

// Get testimonials listing:
router.get('/', get)
// Update Testimonial, route only accesible for admins:
router.put('/:id', isAdmin, updateTestimonial)

module.exports = router
