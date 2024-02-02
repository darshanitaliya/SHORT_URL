const express = require('express')
const urlRoute = require('./routes/url')
const conectToMongoDB = require('./conntect')

const app = express()
const PORT = 8000

conectToMongoDB('mongodb://127.0.0.1:27017/short-url').then(() =>
  console.log('MongoDB Conected')
)

app.use(express.json())

app.use('/url', urlRoute)

app.listen(PORT, () => console.log('Server Start'))
