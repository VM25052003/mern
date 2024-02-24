const mongoose = require('mongoose')
const schema = mongoose.Schema

const movies = new schema({
    title: {
      type: String,
      required: true
    },
    writer: {
      type: String,
      default: null
    },
    year: {
      type: Number,
      default: null
    },
    actors: [{
      type: String,
      default: null
    }],
    franchise: {
      type: String,
      default: null  // Set default value as null or any other appropriate default value
    },
    synopsis: {
      type: String,
      default: null
    }
})

module.exports = mongoose.model('Movie', movies)
/*
title : Fight Club
writer : Chuck Palahniuk
year : 1999
actors : [
  Brad Pitt
  Edward Norton
]
*/
