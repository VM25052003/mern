const express = require('express')
const router = express.Router()
const passwordController = require('../controllers/password-controller')

// POST /generate-password - generate password
router.post('/generate-password', passwordController.postGeneratePassword)

// POST /save-password - retrieve email-id and save
router.post('/save-password', passwordController.postSavePassword)

// POST /get-password - accept mail-id and fetch from database
router.post('/get-password', passwordController.postPassword)

module.exports = router