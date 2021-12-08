const express = require('express')

const {
  get,
  getEntry,
  destroy,
  updatedEntry,
  post,
} = require('../controllers/entry')
const { validateRequest } = require('../middlewares')
const isAdmin = require('../middlewares/isAdmin')

const { entrySchema } = require('../schemas/entries')

const router = new express.Router()

router.get('/', get)
router.get('/:id', getEntry)
router.put('/:id', [isAdmin, validateRequest(entrySchema)], updatedEntry)
router.post('/', [isAdmin, validateRequest(entrySchema)], post)
router.delete('/:id', isAdmin, destroy)

module.exports = router
