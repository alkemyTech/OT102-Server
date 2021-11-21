const express = require('express')

const router = express.Router()

/* GET test PING route. */
router.get('/ping', async (req, res) => {
  try {
    const pongResponse = {
      status: true,
      body: {
        message: 'PONG'
      }
    }
    res.status(200).send(pongResponse)
  } catch (Error) {
    res.status(500).send({ Error: 'Something went wrong.' })
  }
})

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: 'Express' })
})

module.exports = router
