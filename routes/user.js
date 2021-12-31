const express = require('express')
const {
  get, getRoles, getUserById, destroy, updateUser,
} = require('../controllers/users')

const router = new express.Router()

/* GET users listing. */
router.get('/', get)
router.get('/roles', getRoles)
router.get('/:id', getUserById)
router.delete('/:id', destroy)
router.put('/:id', updateUser)
module.exports = router
