const { body } = require('express-validator')

exports.testimonialSchema = [
  body('name')
    .exists()
    .withMessage('Name is required')
    .isString()
    .withMessage('Name must be a string')
    .trim()
    .isLength({ min: 3, max: 255 })
    .withMessage('Name must be between 3 a 255 characters long'),

  body('image').optional({ nullable: true }),

  body('content')
    .exists()
    .withMessage('Content is required')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Content must be at least 3 characters long'),
]
