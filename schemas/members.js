const { body } = require('express-validator')

exports.memberSchema = [
  body('name')
    .exists()
    .withMessage('The name is required a value')
    .isString()
    .withMessage('The name must be a string')
    .trim()
    .isLength({ min: 3, max: 255 })
    .withMessage(
      'The name must have at least 3 characters and a maximum of 255 characters.',
    ),

  body('image')
    .exists()
    .withMessage('The image URL is required a value')
    .isString()
    .withMessage('The image field must be a string URL')
    .trim()
    .isLength({ min: 3 })
    .withMessage('The image URL must have at least 3 characters long'),
]
