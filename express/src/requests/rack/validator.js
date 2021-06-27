const { Rack } = require('../../models')

module.exports = {
  uniqueRack: name => {
    return Rack.exists({ name }).then(exists => {
      if (exists) {
        return Promise.reject('already exists')
      }
    })
  },
  uniqueUpdateRack: (name, { req }) => {
    const id = req.params.rack

    return Rack.findOne({ name }).select({ _id: 1 }).lean().then(rack => {
      if (!!rack && rack._id != id) {
        return Promise.reject('already exists')
      }
    })
  }
}