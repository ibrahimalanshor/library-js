const { Rack } = require('../models')
const BookRepository = require('./book.repository')

class RackRepository {

  async get({ page = 1, search = ''}) {
    try {
      const query = Rack.aggregate([
        { $match: { name: { $regex: search, $options: 'i' } } },
        { $lookup: {
          from: 'books',
          localField: '_id',
          foreignField: 'rack',
          as: 'books'
        } },
        { $set: {
          booksCount: { $size: '$books' }
        } },
        { $unset: 'books' }
      ])

      const options = {
        sort: 'name',
        limit: 24,
        page
      }

      const racks = await Rack.aggregatePaginate(query, options)

      return racks
    } catch (err) {
      console.log(err)
    }
  }

  async find(slug, { page, search }) {
    const rack = await Rack.findOne({ slug })
    
    if (!rack) throw 'Not found'

    const books = await BookRepository.getByRack(rack.id, { page, search })

    return {rack, books}
  }

}

module.exports = new RackRepository