const { validationResult } = require('express-validator')
//To generate unique identifiers
const { v4: uuidv4 } = require('uuid');
const HttpError = require('../models/http-error')
const getCoordinates = require('../util/location')

 
const PLACES = [{
        creatorId: 123,
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/20171126_Angkor_Wat_4712_DxO.jpg/1024px-20171126_Angkor_Wat_4712_DxO.jpg',
        title: "Angkor Wat1",
        description: "Tourist Place",
        address: "CV68+XQ Krong Siem Reap, Cambodia",
    }]

//Can also be set as function getPlaceByPlaceId {...}, const getPlaceByPlaceId = function() {...}
const getPlaceByPlaceId = async(req, res, next) => {
    //Extracting from url
    const placeId = req.params.placeId
    const identifiedPlace = PLACES.find(p => p.id === placeId);
   
    if(!identifiedPlace){
        /*METHOD 1
        If no place found, return error msg. Return otherwise after if(), next line will definitely execute. Other option is to use else() along with if()
        return res.status(404).json({message: 'No place found'}) */

        /*METHOD 2 
        For synchronous actions, can throw to trigger error handling middlware
        const error = new Error('No place found')
        error.code = 404
        throw error */
        /* METHOD 3*/
        throw new HttpError('No place found', 404);
    }
    //Response send on request encoded to json and set right headers
    //If key-value are named as same 'place', can simply return as res.json({ place })
    res.json({ place: identifiedPlace })
} 


const getPlacesByUserId = async(req, res, next) => {
    //Extracting from url
    const userId = req.params.userId

    /*Filter out all places created by this user as find() stops after first search and user can have multiple places associated with it */
    const identifiedPlace = PLACES.filter(p => p.creatorId === userId)

    if(identifiedPlace.length == 0){
        /* METHOD 1
        return res.status(404).json({message: 'No place found'})*/
        
        /*METHOD 2 
        For asynchronous actions, forward error to reach next middleware in line to trigger error handling middlware
        const error = new Error('No place found')
        error.code = 404
        next(error)*/

        /* METHOD 3
        using model */
        return next(new HttpError('No place found', 404))
    }
    /*Find returns an array[] of mongoose documents, so can't use toObject (converts mongoose document -> plain js object) with an array[], so we map against every place, converting each document to object and setting getters to true to retain all virtual properties
    res.json({ place: identifiedPlace.map(p => p.toObject({getters: true}))}). No need as set in model */
    res.json({place: identifiedPlace})
}


const createPlace = async(req, res, next) => {
//POST request have a request body, while GET don't have. So for POST request, we have to encode data into body we want to send
//To extract out of request body and store in constant
const { creator, title, description, address } = req.body;
//Stores errors as object if found in request object based on our validators. First extract then validate
const errors = validationResult(req)
if(!errors.isEmpty()){
    next(new HttpError('Invalid Input Fields', 422))
}
let coordinates;
try {
    coordinates = await getCoordinates(address)
} catch(error) {
    return next(error)
}
const createPlace = new Place({ 
    //We'll enter as creator and coordinates but stored in PLACES[]/ db as creatorId and loaction, rest are same
    creatorId: creator, 
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/20171126_Angkor_Wat_4712_DxO.jpg/1024px-20171126_Angkor_Wat_4712_DxO.jpg',
    title, 
    description, 
    address, 
    location: coordinates 
})
/*Add to PLACES[], push to add as last element and unshift as first element */
PLACES.push(createPlace) 

res.status(201).json({ place: createPlace })

}


const updatePlace = async(req, res, next) => {
    //Extracting from url
    const placeId = req.params.placeId
    //Extracting updated data from request body
    const { title, description } = req.body;
const errors = validationResult(req)
if(!errors.isEmpty()){
    throw new HttpError('Invalid Input Fields', 422)
}

/*We want update in an immutable way, means we don't want immediately change it in PLACES[] because objects are reference values in JS. Not a great practice because some data might have changed already whilst other data failed. So we'll first create copy of that place, change that copy and only once that copy is finished,
We want to change entirely in PLACES[] with that updated copy.
Hence, using spread operator here creates a new object and copies all key-value pairs of the old object into new object, 
    Get the place matching that id from db and update neccessary fields */
    const updatedPlace ={...PLACES.find(p => p.id === placeId)} 
   
    res.status(200).json({ place: updatedPlace })
}


const deletePlace = async(req, res, next) => {
    //Extracting from url
    const placeId = req.params.placeId
    /*Store only those that doesn't match with extracted one in database */
    PLACES = PLACES.filter(p => p.id !== placeId) 
    res.json({place: PLACES})
}

//Not exported as a function, but as a pointer to let express execute it
exports.getPlaceByPlaceId = getPlaceByPlaceId
exports.deletePlace = deletePlace
exports.updatePlace= updatePlace
exports.getPlacesByUserId = getPlacesByUserId
exports.createPlace = createPlace