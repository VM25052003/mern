const shortId = require('shortid')
const Url = require('../models/url')

const getRedirectUrl = async(req, res, next) => {
    const shortId = req.params.shortId
    const redirectUrl = await Url.findOneAndUpdate({shortId}, {
        $push: {
            visitHistory: {
                timestamp: Date.now()
            }
        }
    })
    res.redirect(redirectUrl.redirectUrl)
}

const postShortUrl = async(req, res, next) => {
    const url = req.body
    const short = shortId()
    if(!url) return res.status(400).json({message: 'Url is required'})
    const shortUrl = await Url.create({
        shortId: short,
        redirectUrl: url,
        visitHistory: [] 
    })
    return res.status(201).json({message: shortUrl})
}

const getVisitCount = async(req, res, next) => {
     const shortId = req.params.shortId
     const visitCount = await Url.findOne({shortId})
     return res.status(201).json({count: visitCount.visitHistory.length, data: visitCount.visitHistory})
}

exports.getRedirectUrl = getRedirectUrl
exports.postShortUrl = postShortUrl
exports.getVisitCount = getVisitCount