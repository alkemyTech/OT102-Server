const express = require('express')
const { get, destroy } = require('../controllers/users')

const router = new express.Router()

/* GET users listing. */
router.get('/', get)
router.delete('/:id', destroy)

module.exports = router
