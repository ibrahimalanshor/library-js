const { Book } = require('../models')

class BookRepository {

  async get({ page = null, search = null }) {
    try {
      const query = search ? { title: { $regex: search, $options: 'i' } } : {}
      const options = {
        sort: '-createdAt',
        populate: [
          {
            path: 'rack',
            select: '_id name slug location'
          }
        ],
        page
      }

      const books = await Book.paginate(query, options)

      return books
    } catch (err) {
      console.log(err)
    }
  }

  async getByRack(rack, { page = null, search = ''}) {
    try {
      const query = {
        title: { $regex: search, $options: 'i' },
        rack
      }

      const options = {
        sort: '-createdAt',
        populate: [
          {
            path: 'rack',
            select: '_id name slug location'
          }
        ],
        page
      }

      const books = await Book.paginate(query, options)

      return books
    } catch (err) {
      console.log(err)
    }
  }

  async find(isbn) {
    try {
      const book = await Book.findOne({ isbn }).populate('rack', '_id name slug location')

      return book
    } catch (err) {
      console.log(err)
    }
  }

  async addStock(id, stock) {
    try {
      const book = await Book.updateOne({ _id: id }, { $inc: { stock } })

      return book
    } catch (err) {
      console.log(err)
    }
  }

}

module.exports = new BookRepository