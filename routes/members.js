const express = require('express')

const { endpointResponse } = require('../helpers/success')
const { ErrorObject } = require('../helpers/error')
const { Member } = require('../models')
const { catchAsync } = require('../helpers')

const router = express.Router()

router.get(
  '/',
  catchAsync(async (req, res, next) => {
    try {
      const allMembers = await Member.findAll()
      endpointResponse({
        res,
        message: 'Members were retrieved successfully.',
        body: allMembers,
      })
    } catch (error) {
      next(
        new ErrorObject(
          `[Error retrieving members] - [members - get]: ${error.message}`,
          500,
        ),
      )
    }
  }),
)

module.exports = router
