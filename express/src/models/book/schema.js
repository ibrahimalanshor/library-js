const { Schema } = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const { coverSrc } = require('./getters')

const BookSchema = new Schema({
  isbn: String,
  title: String,
  author: String,
  publisher: String,
  year: String,
  description: String,
  cover: {
    type: String,
    get: coverSrc
  },
  stock: {
    type: Number,
    default: 0
  },
  rack: {
    type: Schema.Types.ObjectId,
    ref: 'rack'
  }
}, { timestamps: true, id: false })

BookSchema.plugin(mongoosePaginate)

BookSchema.set('toObject', { getters: true })
BookSchema.set('toJSON', { getters: true })

module.exports = BookSchema