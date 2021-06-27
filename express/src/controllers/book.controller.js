const { Book } = require('../models')
const { BookRepository } = require('../repositories')

class BookController {

  async get(req, res) {
    try {
      const books = await BookRepository.get({
        page: req.query.page,
        search: req.query.search
      })

      return res.status(200).json(books)
    } catch (err) {
      return res.status(400).json(err)
    }
  }

  async create(req, res) {
    try {
      const book = await Book.create(req.body)

      return res.status(200).json(book)
    } catch (err) {
      return res.status(400).json(err)
    }
  }

  async update(req, res) {
    try {
      const book = await Book.findByIdAndUpdate(req.params.book, req.body)

      return res.status(200).json(book)
    } catch (err) {
      return res.status(400).json(err)
    }
  }

  async delete(req, res) {
    try {
      const book = await Book.findByIdAndDelete(req.params.book)

      return res.status(200).json(book)
    } catch (err) {
      return res.status(400).json(err)
    }
  }

  async find(req, res) {
    try {
      const book = await BookRepository.find(req.params.isbn)

      return res.status(200).json(book)
    } catch (err) {
      return res.status(400).json(err)
    }
  }

  async addStock(req, res) {
    try {
      const book = await BookRepository.addStock(req.params.book, req.body.stock)

      return res.status(200).json({
        msg: 'Stock Added'
      })
    } catch (err) {
      return res.status(400).json(err)
    }
  }

}

module.exports = new BookController