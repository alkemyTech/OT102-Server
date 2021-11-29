const express = require('express')
const {
  get, getActivity, destroy, post,
} = require('../controllers/activities')

// const { validateRequest } = require('../middlewares')

// const { activitySchema } = require('../schemas/activities')

const router = new express.Router()

router.get('/', get)
router.get('/:id', getActivity)
router.delete('/:id', destroy)
router.post('/', post)

module.exports = router
