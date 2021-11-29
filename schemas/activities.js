const { body } = require('express-validator')

exports.activitySchema = [
  body('name')
    .exists()
    .withMessage('The name is required a value')
    // .bail() // Stops running validations if any of the previous ones have failed.
    .isString()
    .withMessage('The name must be a string')
    .trim()
    .isLength({ min: 3, max: 255 })
    .withMessage(
      'The name must have at least 3 characters and a maximum of 255 characters.',
    ),

  body('image')
    .optional({ nullable: true }),

  body('content')
    .exists()
    .withMessage('The content is required a value')
    // .bail() // Stops running validations if any of the previous ones have failed.
    .trim()
    .isLength({ min: 3 })
    .withMessage('The content must have at least 3 characters long'),
]
