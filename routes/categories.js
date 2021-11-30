const express = require('express')

const {
  get, destroy, post, update,
} = require('../controllers/categories')

const { validateRequest } = require('../middlewares')
const isAdmin = require('../middlewares/isAdmin')
const { categorySchema } = require('../schemas/categories')

const router = new express.Router()

// Get Categories listing:
router.get('/', get)
// Delete Category by ID:
router.delete('/:id', destroy)
// Update Category by ID:
router.put('/:id', [isAdmin, validateRequest(categorySchema)], update)
// Add category
router.post('/', validateRequest(categorySchema), post)

module.exports = router
