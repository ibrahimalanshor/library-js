const { validationResult } = require('express-validator')

module.exports = (req, res, next) => {
  try {
    const errors = validationResult(req).throw()

    next()
  } catch (err) {
    return res.status(422).json({ errors: err.mapped() })
  }
}