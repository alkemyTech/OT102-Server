const express = require('express')
const { get, post, destroy } = require('../controllers/users')

const router = new express.Router()

/* GET users listing. */
router.get('/', get)
router.post('/auth/register', post)
router.delete('/:id', destroy)

module.exports = router
