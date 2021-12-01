const express = require('express')
const {
  destroy, get, updateTestimonial, post,
} = require('../controllers/testimonials')
const isAdmin = require('../middlewares/isAdmin')
const { validateRequest } = require('../middlewares')
const { testimonialSchema } = require('../schemas/testimonials')

const router = new express.Router()

// Get testimonials listing:
router.get('/', get)
// Update Testimonial, route only accesible for admins:
router.put('/:id', isAdmin, updateTestimonial)
// DELETE Testimonial, route only accesible for admins:
router.delete('/:id', isAdmin, destroy)
// Post New Testimonial, route only accessible for admins. Fields validated using middleware:
router.post('/', [isAdmin, validateRequest(testimonialSchema)], post)

module.exports = router
