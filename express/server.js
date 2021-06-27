require('dotenv').config()

const App = require('./src/app')
const app = new App(process.env.PORT)

app.listen()