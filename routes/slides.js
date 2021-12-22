const express = require('express')

const {
  get,
  getById,
  destroy,
  post,
  update,
} = require('../controllers/slides')

const { validateRequest } = require('../middlewares')
const isAdmin = require('../middlewares/isAdmin')
// const isAdmin = require('../middlewares/isAdmin')
const { slideSchema } = require('../schemas/slides')

const router = new express.Router()

// Delete Slide by ID.
router.delete('/:id', isAdmin, destroy)
// Get Slides listing.
router.get('/', get)
// Get Slides listing.
router.get('/:id', getById)
// Add Slide.
router.post('/', [isAdmin, validateRequest(slideSchema)], post)
// Update Slide by id.
router.put('/:id', [isAdmin, validateRequest(slideSchema)], update)

module.exports = router
