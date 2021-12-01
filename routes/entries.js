const express = require('express')
const {
  get,
  getEntry,
  destroy,
  post,
} = require('../controllers/entry')
const isAdmin = require('../middlewares/isAdmin')

const router = new express.Router()

router.get('/', get)
router.get('/:id', getEntry)
router.delete('/:id', isAdmin, destroy)
router.post('/', post)

module.exports = router
