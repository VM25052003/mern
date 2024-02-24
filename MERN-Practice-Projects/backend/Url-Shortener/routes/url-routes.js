const express = require('express')
const router = express.Router()
const urlController = require('../controllers/url-controllers')

router.get('/:shortId', urlController.getRedirectUrl)

router.get('/analytics/:shortId', urlController.getVisitCount)

router.post('/', urlController.postShortUrl)

module.exports = router