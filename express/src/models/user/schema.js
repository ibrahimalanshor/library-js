const { Schema } = require('mongoose')
const methods = require('./methods')

const UserSchema = new Schema({
  email: String,
  name: String,
  password: String
})

for (let [name, method] of Object.entries(methods)) {
  UserSchema.methods[name] = method
}

UserSchema.pre('validate', async function () {
  await this.encrypt()
})

module.exports = UserSchema