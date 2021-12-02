const { body } = require('express-validator')

exports.updateEntry = [
  body('name').isLength({ min: 1 }).withMessage('Name must be specified'),
  body('content').isLength({ min: 1 }).withMessage('Content must be specified'),
  body('image').isURL().withMessage('Image must be a valid URL'),
  body('type').isLength({ min: 1 }).withMessage('Type must be specified'),
]
