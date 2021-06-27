const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    const appToken = process.env.APP_TOKEN

    if (!token) throw 'Unauthorized'

    await jwt.verify(token, appToken)

    next()
  } catch (err) {
    return res.status(401).json(err)
  }
}