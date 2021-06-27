const path = require('path')
const { Book, Rack } = require('../../models')

module.exports = {
  uniqueISBN: isbn => {
    return Book.exists({ isbn }).then(exists => {
      if (exists) {
        return Promise.reject('already exists')
      }
    })
  },
  uniqueUpdateISBN: (isbn, { req }) => {
    const id = req.params.book

    return Book.findOne({ isbn }).select({ _id: 1 }).lean().then(book => {
      if (!!book && book._id != id) {
        return Promise.reject('already exists')
      }
    })
  },
  images: (cover, { req }) => {
    const allowed = ['jpg', 'png', 'jpeg']
    const mime = path.extname(req.file.path).slice(1)

    if (!allowed.includes(mime)) {
      throw new Error('mimetypes not supported')
    }

    return true
  },
  existsRack: _id => {
    return Rack.exists({ _id }).then(exists => {
      if (!exists) {
        return Promise.reject('doesn\'t exists')
      }
    })
  }
}