// midleware to check if the user.roleId user is admin
const jwt = require('jsonwebtoken')
const config = require('../config/config').development

const isAdmin = (req, res, next) => {
  const token = req.headers['x-access-token']
  if (!token) {
    return res.status(401).send({ auth: false, message: 'No token provided.' })
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res
        .status(500)
        .send({ auth: false, message: 'Failed to authenticate token.' })
    }
    if (decoded.roleId === 1) {
      next()
    } else {
      return res
        .status(403)
        .send({ auth: false, message: 'You are not an admin' })
    }
    return null
  })
  return null
}
module.exports = isAdmin

// examples

// route.get('/', isAdmin, (req, res) => {
//   res.send('You are an admin')
// })

// token1 = jwt.sign({ id: 1, roleId: 1 }, config.secret, { expiresIn: '1h' })
// token2 = jwt.sign({ id: 1, roleId: 2 }, config.secret, { expiresIn: '1h' })
//
// axios.get('http://localhost:3000/pong/admin', {
//   headers: {
//     'x-access-token': token1
//   }
// })
//   .then(res => {
//     console.log(res.data)
//   })
//   .catch(err => {
//     console.log(err)
//   })
//
