const mongoose = require('mongoose')

const conectToMongoDB = async (url) => {
  return mongoose.connect(url)
}

module.exports = conectToMongoDB
