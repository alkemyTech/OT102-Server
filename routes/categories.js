const express = require('express')
const { body, validationResult } = require('express-validator')

const { get, post } = require('../controllers/categories')
const { ErrorObject } = require('../helpers/error')

const router = new express.Router()

// extract to schema
const categorySchema = [
  body('name')
    .exists()
    .withMessage('The name is required a value')
    .bail() // Stops running validations if any of the previous ones have failed.
    .isString()
    .withMessage('The name must be a string')
    .bail()
    .trim()
    .isLength({ min: 3, max: 255 })
    .withMessage(
      'The name must have at least 3 characters and a maximum of 255 characters.',
    ),

  body('description')
    .isString()
    .withMessage('The description must be a string')
    .bail()
    .optional({ nullable: true })
    .trim()
    .isLength({ min: 3 })
    .withMessage('The description must have at least 3 characters long'),
]

// extract to middlwware
const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const [error] = errors.array()
    next(
      new ErrorObject(
        `[Error creating category] - [categories - POST]: ${error.msg}`,
        400,
      ),
    )
  }
  return next()
}
const validateRequest = (schema) => [schema, validate]

//
router.get('/', get)
router.post('/', validateRequest(categorySchema), post)

module.exports = router
