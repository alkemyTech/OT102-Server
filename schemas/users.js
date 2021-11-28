const { body } = require('express-validator')
const { getUserByEmail } = require('../services/user')

const passwordChars = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/

exports.userRegisterSchema = [
  body('firstName')
    .exists()
    .withMessage('The firstname is required a value')
    .isString()
    .withMessage('The firstname must be a string')
    .trim()
    .isLength({ min: 3, max: 255 })
    .withMessage('The firstname must have at least 3 characters and a maximum of 255 characters.'),

  body('lastName')
    .exists()
    .withMessage('The lastname is required a value')
    .isString()
    .withMessage('The lastname must be a string')
    .trim()
    .isLength({ min: 3, max: 255 })
    .withMessage('The lastname must have at least 3 characters and a maximum of 255 characters.'),

  body('email')
    .exists()
    .withMessage('The email is required a value')
    .isEmail()
    .withMessage('Invalid email format')
    .custom((value) => getUserByEmail(value).then((user) => {
      if (user) {
        throw new Error('this email is already in use')
      }
    })),
  body('password')
    .exists()
    .withMessage('The password is required a value')
    .isLength({ min: 8 })
    .withMessage('The password must have at least 8 characters')
    .matches(passwordChars)
    .withMessage(
      'The password must have one uppercase, one lowercasse, one number and one special caracter',
    ),
]
