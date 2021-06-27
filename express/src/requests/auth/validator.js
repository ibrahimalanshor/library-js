const { User } = require('../../models')

module.exports = {
  existUser: async email => {
    return User.exists({ email }).then(exists => {
      if (!exists) {
        return Promise.reject('doesn\'t exists')
      }
    })
  }
}