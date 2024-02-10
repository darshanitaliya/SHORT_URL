const { v4: uuidv4 } = require('uuid')
const User = require('../model/user')
const { setUser } = require('../service/auth')
const { use } = require('../routes/user')

exports.handleUserSighup = async (req, res) => {
  const { name, email, password } = req.body

  await User.create({
    name,
    email,
    password,
  })
  return res.redirect('/')
}

exports.handleUserLogin = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email, password })
  if (!user) {
    return res.render('login', {
      error: 'Invalid Username or Password',
    })
  }
  const sessionId = uuidv4()
  setUser(sessionId, user)
  res.cookie('uid', sessionId)
  return res.redirect('/')
}
