const express = require('express')
const {
  destroy,
  get,
  updateTestimonial,
} = require('../controllers/testimonials')
const isAdmin = require('../middlewares/isAdmin')

const router = new express.Router()

// Get testimonials listing:
router.get('/', get)
// Update Testimonial, route only accesible for admins:
router.put('/:id', isAdmin, updateTestimonial)
// DELETE Testimonial, route only accesible for admins:
router.delete('/:id', isAdmin, destroy)

module.exports = router
