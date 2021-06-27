const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { User } = require('../models')

class AuthService {

  async login({ email, password }) {
    const user = await User.findOne({ email }).lean()
    const match = await bcrypt.compare(password, user.password)

    if (!match) throw 'Password Incorrect'

    const token = await this.attempt(user)

    return token
  }

  async attempt({ _id, name, email }) {
    const appToken = process.env.APP_TOKEN
    const payload = {
      id: _id,
      name,
      email
    }

    const token = await jwt.sign(payload, appToken, { expiresIn: '1h' })

    return token
  }

}

module.exports = new AuthService