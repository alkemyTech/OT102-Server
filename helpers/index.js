const catchAsync = (fn) => (req, res, next) => {
  fn(req, res, next).catch(next)
}
// sendgrid mail sender
const sgMail = require('@sendgrid/mail')
const createHttpError = require('http-errors')
const config = require('../config/config').development

const sendMail = async (to = '', subject = '', message = '', html = '') => {
  sgMail.setApiKey(config.sendGridKey)
  const msg = {
    to,
    from: config.sendGridMail,
    subject,
    text: message,
    html,
  }

  try {
    await sgMail.send(msg)
    return true
  } catch (error) {
    const httpError = createHttpError(500, `Error sending mail: ${error}`)
    throw httpError
  }
}

module.exports = {
  catchAsync,
  sendMail,
}
