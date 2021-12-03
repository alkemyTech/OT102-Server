const express = require('express')
const { get, getActivity, destroy, post } = require('../controllers/activities')

const { validateRequest } = require('../middlewares')
const isAdmin = require('../middlewares/isAdmin')
const { activitySchema } = require('../schemas/activities')

const router = new express.Router()

router.get('/', isAdmin, get)
router.get('/:id', isAdmin, getActivity)
router.delete('/:id', isAdmin, destroy)
router.post('/', [isAdmin, validateRequest(activitySchema)], post)

module.exports = router
