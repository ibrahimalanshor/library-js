require('dotenv').config()

const App = require('./src/app')
const app = new App(process.env.APP_PORT)

app.listen()