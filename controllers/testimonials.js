const { updateById } = require('../services/testimonials')
const { ErrorObject } = require('../helpers/error')
const { endpointResponse } = require('../helpers/success')
const { catchAsync } = require('../helpers/index')

module.exports = {
  updateTestimonial: catchAsync(async (req, res, next) => {
    try {
      const updatedTestimonial = await updateById(
        req.params.id,
        req.body.name,
        req.body.content,
      )
      endpointResponse({
        res,
        message: 'Testimonial succesfully updated',
        body: updatedTestimonial,
      })
    } catch (error) {
      next(
        new ErrorObject(
          `[Error retrieving entry by ID] - [testimonial - put]: ${error.message}`,
          404,
        ),
      )
    }
  }),
}
