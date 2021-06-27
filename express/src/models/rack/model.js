const { model } = require('mongoose')
const RackSchema = require('./schema')

module.exports = model('rack', RackSchema)