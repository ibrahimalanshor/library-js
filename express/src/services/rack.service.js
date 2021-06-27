const { Rack } = require('../models')
const { slugify } = require('../helpers')

class RackService {

  async update(rack, body) {
    try {
      body.slug = slugify(body.name)

      return Rack.findByIdAndUpdate(rack, body)
    } catch(err) {
      console.log(err)
    }
  }

}

module.exports = new RackService