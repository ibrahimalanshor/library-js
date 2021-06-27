const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors')
const routes = require('./routes')

class App {

  constructor(port = 4000) {
    this.app = express()
    this.port = port

    this.initConfig()
    this.initDB()
    this.initRoute()
  }

  initConfig() {
    this.app.use('/public', express.static(path.join(__dirname, '../public')))

    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(express.json())

    this.app.use(morgan('tiny'))

    this.app.use(cors())
  }

  initDB() {
    try {
      const { DB_URL, DB_NAME } = process.env

      mongoose.connect(`${DB_URL}/${DB_NAME}`, { useNewUrlParser: true, useUnifiedTopology: true })
    } catch (err) {
      console.log(err)
    }
  }

  initRoute() {
    for (let [name, route] of Object.entries(routes)) {
      this.app.use(`/api/${name}`, route)
    }
    
  }

  listen() {
    this.app.listen(this.port)
  }

}

module.exports = App