const express = require('express')
const { getById, put } = require('../controllers/organizationsController')

const isAdmin = require('../middlewares/isAdmin')

const router = new express.Router()

router.get('/:id/public', getById)
router.put('/:id', isAdmin, put)

module.exports = router
