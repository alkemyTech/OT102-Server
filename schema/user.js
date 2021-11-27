// const { body } = require('express-validator')

// exports.userSchema = [
//   body('firstName')
//     .exists()
//     .withMessage('The name is required a value')
//     .bail() // Stops running validations if any of the previous ones have failed.
//     .isString()
//     .withMessage('The name must be a string')
//     .bail()
//     .trim()
//     .isLength({ min: 3, max: 255 })
//     .withMessage(
//       'The name must have at least 3 characters and a maximum of 255 characters.',
//     ),

//   body('firstName')
//     .exists()
//     .withMessage('The name is required a value')
//     .bail() // Stops running validations if any of the previous ones have failed.
//     .isString()
//     .withMessage('The name must be a string')
//     .bail()
//     .trim()
//     .isLength({ min: 3, max: 255 })
//     .withMessage(
//       'The name must have at least 3 characters and a maximum of 255 characters.',
//     ),
// ]
