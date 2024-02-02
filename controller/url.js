const { nanoid } = require('nanoid')
const URL = require('../model/url')

exports.generateNewShortUrl = async (req, res) => {
  const body = req.body
  if (!body.url) return res.status(400).json({ error: 'Url is Required' })
  const shortId = nanoid(8)

  await URL.create({
    shortId: shortId,
    redirectUrl: body.url,
    visitHistory: [],
  })
  return res.json({ id: shortId })
}
