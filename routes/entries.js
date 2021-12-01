const express = require('express')
const {
  get, getEntry, destroy, updatedEntry,
} = require('../controllers/entry')
const isAdmin = require('../middlewares/isAdmin')

const router = new express.Router()

router.get('/', get)
router.get('/:id', getEntry)
router.put('/:id', isAdmin, updatedEntry)
router.delete('/:id', isAdmin, destroy)
module.exports = router
