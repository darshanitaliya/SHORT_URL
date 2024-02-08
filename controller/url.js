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
  return res.render('home', { id: shortId })
}

exports.getAnalytics = async (req, res) => {
  const shortId = req.params.shortId
  const result = await URL.find({ shortId })
  return res.status(200).json({
    totalClicks: result[0].visitHistory.length,
    analytics: result[0].visitHistory,
  })
}
