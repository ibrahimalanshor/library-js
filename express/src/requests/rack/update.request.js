const { body } = require('express-validator')
const { auth } = require('../../middlewares')
const { handle } = require('../../helpers')
const { uniqueUpdateRack } = require('./validator')

const rules = [
  body('name')
    .isString().withMessage('must be string').bail()
    .isLength({ min: 3 }).withMessage('must be at least 3 chars long')
    .custom(uniqueUpdateRack),
  body('location')
    .isString().withMessage('must be string').bail()
    .isLength({ min: 1 }).withMessage('must be at least 1 chars long')
]

module.exports = [auth, rules, handle]