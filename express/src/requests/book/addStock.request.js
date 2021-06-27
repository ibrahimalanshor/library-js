const { body } = require('express-validator')
const { handle } = require('../../helpers')
const { auth } = require('../../middlewares')

const rules = [
  body('stock').isInt({ min: 1}).withMessage('min 1')
]

module.exports = [auth, rules, handle]