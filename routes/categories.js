const express = require('express')

const { get, destroy, post } = require('../controllers/categories')
const { validateRequest } = require('../middlewares')

const { categorySchema } = require('../schemas/categories')

const router = new express.Router()

// Get Categories listing:
router.get('/', get)
// Delete Category by ID:
router.delete('/:id', destroy)
// Add category
router.post('/', validateRequest(categorySchema), post)

module.exports = router
