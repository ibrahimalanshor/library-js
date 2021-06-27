const { body, validationResult } = require('express-validator')
const { existUser } = require('./validator')
const { handle } = require('../../helpers')

const rules = [
  body('email').isEmail().withMessage('must be email').custom(existUser),
  body('password').isLength({ min: 5 }).withMessage('must be at least 5 chars long')
]

module.exports = [rules, handle]