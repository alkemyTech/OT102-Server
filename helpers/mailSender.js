// sendgrid mail sender
const sgMail = require('@sendgrid/mail')
const createHttpError = require('http-errors')
const config = require('../config/config').development
const template = require('../views/template1')

exports.sendMail = async (to = '', subject = '', message = '') => {
  sgMail.setApiKey(config.sendGridKey)
  const msg = {
    to,
    from: config.sendGridMail,
    subject,
    html: template(subject, message),
  }

  try {
    await sgMail.send(msg)
    return true
  } catch (error) {
    const httpError = createHttpError(500, `Error sending mail: ${error}`)
    throw httpError
  }
}
