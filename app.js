const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const PORT = process.env.PORT || 3000

const router = require('./src/routes.js')

app.disable('x-powered-by')
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))
app.use(bodyParser.json())

app.use('/books', router)

app.use((err, req, res, next) => {
  const status = err.status || 500
  res.status(status).json({ error: err })
})

app.use((req, res, next) => {
  res.status(404).json({ error: { message: 'Not found' }})
})

const listener = () => `Listening on port ${PORT}!`
app.listen(PORT, listener)

module.exports = app