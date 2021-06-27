const { AuthService } = require('../services')

class AuthController {

  async login(req, res) {
    try {
      const token = await AuthService.login(req.body)

      return res.status(200).json(token)
    } catch (err) {
      return res.status(400).json(err)
    }
  }

}

module.exports = new AuthController