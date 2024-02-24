const express = require('express')
const router = express.Router()
const { check } = require('express-validator')
const placesControllers = require('../controllers/places-controllers')

// GET /places/:placeId to get a place by placeId
router.get('/:placeId', placesControllers.getPlaceByPlaceId)

// GET /places/user/:userId to get a place by userId
router.get('/user/:userId', placesControllers.getPlacesByUserId)

//POST /places to create place
//middleware that is executed for validation, takes name of field
router.post('/', [ 
            check('title').not().isEmpty(),
            check('description').isLength({ min: 5}),
            check('address').not().isEmpty()
            ], placesControllers.createPlace)

// PATCH /places/:placeId to update a place by placeId
router.patch('/:placeId', placesControllers.updatePlace)

// DELETE /places/:placeId to delete a place by placeId
router.delete('/:placeId', placesControllers.deletePlace)

module.exports = router