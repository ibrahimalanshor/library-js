const bcrypt = require('bcrypt')

module.exports = {
  encrypt: async function () {
    const hash = await bcrypt.hash(this.password, 10)

    this.password = hash
  }
}