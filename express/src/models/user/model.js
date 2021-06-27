const { model } = require('mongoose')
const UserSchema = require('./schema')

module.exports = model('user', UserSchema)