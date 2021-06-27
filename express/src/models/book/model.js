const { model } = require('mongoose')
const BookSchema = require('./schema')

module.exports = model('book', BookSchema)