const { body } = require('express-validator')

exports.categorySchema = [
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

  body('description')
    .isString()
    .withMessage('The description must be a string')
    .optional({ nullable: true })
    .trim()
    .isLength({ min: 3 })
    .withMessage('The description must have at least 3 characters long'),
]
