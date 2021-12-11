const express = require('express')

const {
  get, getCategory, destroy, post, update,
} = require('../controllers/categories')

const { validateRequest } = require('../middlewares')
const isAdmin = require('../middlewares/isAdmin')
const { categorySchema } = require('../schemas/categories')

const router = new express.Router()

// Get Categories listing:
router.get('/', isAdmin, get)
// Get category by id:
router.get('/:id', isAdmin, getCategory)
// Delete Category by ID. Route only accessible for admins:
router.delete('/:id', isAdmin, destroy)
// Update Category by ID:
router.put('/:id', [isAdmin, validateRequest(categorySchema)], update)
// Add category
router.post('/', [isAdmin, validateRequest(categorySchema)], post)

module.exports = router
