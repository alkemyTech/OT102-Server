const { body } = require('express-validator')

exports.contactSchema = [
  body('name')
    .exists()
    .withMessage('Name is required')
    .isString()
    .withMessage('Name must be a string')
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage('Name must be at least 3 characters long'),

  body('email')
    .exists()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email must be a valid email')
    .trim(),
]
