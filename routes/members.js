const express = require('express')

const { endpointResponse } = require('../helpers/success')
const { ErrorObject } = require('../helpers/error')
const { Member } = require('../models')
const { catchAsync } = require('../helpers')

const router = express.Router()

const getMembers = async () => {
  try {
    return await Member.findAll()
  } catch (error) {
    throw Error(error.message)
  }
}

router.get(
  '/',
  catchAsync(async (req, res, next) => {
    try {
      const allMembers = await getMembers()
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
