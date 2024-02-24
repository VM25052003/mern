const mongoose = require('mongoose')
const schema = mongoose.Schema

const urlSchema = new schema({
    shortId: {
        type: String,
        required: true,
        unique: true
    },
    redirectUrl: {
        type: String,
        required: true
    },
    visitHistory: [{
        timestamp: {
            type: Number,
        }
    }]
}, {
    timestamps: true
})

const url = mongoose.model('url', urlSchema)
module.exports = url