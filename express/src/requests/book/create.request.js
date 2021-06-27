const { body, validationResult } = require('express-validator')
const { auth } = require('../../middlewares')
const { uniqueISBN, images, existsRack } = require('./validator')
const upload = require('./upload')
const fs = require('fs')

const rules = [
  body('isbn')
    .isNumeric().bail().withMessage('must be numeric')
    .isLength({ min: 5 }).bail().withMessage('must be at least 5 chars long')
    .custom(uniqueISBN),
  body('title')
    .isString().bail().withMessage('must be string')
    .isLength({ min: 5 }).withMessage('must be at least 5 chars long'),
  body('author')
    .isString().bail().withMessage('must be string')
    .isLength({ min: 5 }).withMessage('must be at least 5 chars long'),
  body('publisher')
    .isString().bail().withMessage('must be string')
    .isLength({ min: 5 }).withMessage('must be at least 5 chars long'),
  body('year')
    .isLength({ min:4, max:4 }).bail().withMessage('must be year'),
  body('description')
    .isString().bail().withMessage('must be string')
    .isLength({ min: 20 }).withMessage('must be at least 20 chars long'),
  body('cover')
    .exists().bail().withMessage('required')
    .custom(images).withMessage('mimetypes not allowed'),
  body('rack')
    .exists().bail().withMessage('required')
    .custom(existsRack)
]

const handle = (req, res, next) => {
  try {
    const errors = validationResult(req).throw()

    next()
  } catch (err) {
    fs.unlink(req.file.path, () => {
      return res.status(422).json({ errors: err.mapped() })
    })
  }
}

module.exports = [auth, upload, rules, handle]