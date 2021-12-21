const { body } = require('express-validator')

exports.slideSchema = [
  body('imageUrl')
    .exists()
    .withMessage('The name is required a value')
    .isString()
    .withMessage('The name must be a string')
    .trim()
    .isLength({ min: 3, max: 255 })
    .withMessage(
      'The imageUrl must have at least 3 characters and a maximum of 255 characters.',
    ),

  body('text')
    .exists()
    .withMessage('The text is required a value')
    .isString()
    .withMessage('The text must be a string')
    .trim()
    .isLength({ min: 3 })
    .withMessage('The text must have at least 3 characters long'),

  body('order')
    .exists()
    .withMessage('The order is required a value')
    .isInt()
    .withMessage('The description must be an integer'),
]
