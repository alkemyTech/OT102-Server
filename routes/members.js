const express = require('express')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    res.status(200).send()
  } catch (e) {
    throw Error('Error while retrieving members')
  }
})

module.exports = router
