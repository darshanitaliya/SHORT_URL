const express = require('express')
const conectToMongoDB = require('./conntect')
const URL = require('./model/url')
const path = require('path')
const cookieParser = require('cookie-parser')

const urlRoute = require('./routes/url')
const staticRoute = require('./routes/staticRouter')
const userRoute = require('./routes/user')
const { restrictToLoggedinUserOnly } = require('./middlewares/auth')

const app = express()
const PORT = 8000

conectToMongoDB('mongodb://127.0.0.1:27017/short-url').then(() =>
  console.log('MongoDB Conected')
)

app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/', staticRoute)
app.use('/user', userRoute)
app.use('/url', restrictToLoggedinUserOnly, urlRoute)

app.use('/test', async (req, res) => {
  const allUrl = await URL.find({})
  return res.render('home', {
    urls: allUrl,
  })
})

app.get('/url/:shortId', async (req, res) => {
  const shortId = req.params.shortId
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timeStamp: Date.now(),
        },
      },
    }
  )
  res.redirect(entry.redirectUrl)
})

app.listen(PORT, () => console.log('Server Start'))
