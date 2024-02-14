// For StateFull authantication

// const sessionIdToUserMap = new Map()

// exports.setUser = (id, user) => {
//   sessionIdToUserMap.set(id, user)
// }

// exports.getUser = (id) => {
//   return sessionIdToUserMap.get(id)
// }

// For Stateless Authantication JWT

const jwt = require('jsonwebtoken')
const secret = 'Darshan'

exports.setUser = (user) => {
  return jwt.sign({ _id: user._id, email: user.email }, secret)
}

exports.getUser = (token) => {
  if (!token) return null
  try {
    return jwt.verify(token, secret)
  } catch {
    return null
  }
}
