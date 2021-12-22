const { body } = require('express-validator')

exports.entrySchema = [
  body('name')
    .exists()
    .withMessage('The name is a required value')
    .isLength({ min: 1 })
    .withMessage('Name must be specified'),
  body('content')
    .exists()
    .withMessage('The content is a required value')
    .isLength({ min: 1 })
    .withMessage('Content must be specified'),
  body('image').isURL().withMessage('Image must be a valid URL'),
  body('categoryId').isInt().withMessage('CategoryId must be an integer'),
]
