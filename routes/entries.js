const express = require('express')
const {
  get,
  getEntry,
  destroy,
  updatedEntry,
} = require('../controllers/entry')
const { validateRequest } = require('../middlewares')
const isAdmin = require('../middlewares/isAdmin')
const { updateEntry } = require('../schemas/entries')

const router = new express.Router()

router.get('/', get)
router.get('/:id', getEntry)
router.put('/:id', [isAdmin, validateRequest(updateEntry)], updatedEntry)
router.delete('/:id', isAdmin, destroy)

module.exports = router
