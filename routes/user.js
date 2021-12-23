const express = require('express')
const { get, destroy, updateUser } = require('../controllers/users')

const router = new express.Router()

/* GET users listing. */
router.get('/', get)
router.delete('/:id', destroy)
router.put('/:id', updateUser)
module.exports = router
