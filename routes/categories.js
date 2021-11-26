const express = require('express')

const { get, post } = require('../controllers/categories')
const { validateRequest } = require('../middlewares')

const { categorySchema } = require('../schemas/category')

const router = new express.Router()

router.get('/', get)
router.post('/', validateRequest(categorySchema), post)

module.exports = router
