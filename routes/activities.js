const express = require('express')
const {
  get,
  getActivity,
  destroy,
  post,
  update,
} = require('../controllers/activities')

const { validateRequest } = require('../middlewares')
const isAdmin = require('../middlewares/isAdmin')
const { activitySchema } = require('../schemas/activities')

const router = new express.Router()

router.get('/', get)
router.get('/:id', getActivity)
router.delete('/:id', isAdmin, destroy)
router.post('/', [isAdmin, validateRequest(activitySchema)], post)
router.put('/:id', [isAdmin, validateRequest(activitySchema)], update)
module.exports = router
