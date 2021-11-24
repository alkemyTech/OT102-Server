const express = require('express')
const { getById } = require('../controllers/organizationsController')

const router = new express.Router()

router.get('/:id/public', getById)

module.exports = router