const express = require('express')
const isAdmin = require('../middlewares/isAdmin')
const { get, destroy } = require('../controllers/members')

const router = express.Router()

/* GET all active members */
router.get('/', get)
router.delete('/:id', isAdmin, destroy)

module.exports = router
