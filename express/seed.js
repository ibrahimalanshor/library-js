const mongoose = require('mongoose')
const { User } = require('./src/models')

require('dotenv').config()

const { DB_URL, DB_NAME } = process.env

mongoose.connect(`${DB_URL}/${DB_NAME}`, { useNewUrlParser: true, useUnifiedTopology: true })

User.create({
  email: 'admin@admin.com',
  name: 'Admin',
  password: 'admin',
}, function (err, user) {
  if (err) console.log(err)

  console.log(user)
})