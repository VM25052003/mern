const mongoose = require('mongoose')
const moment = require('moment');
const schema = mongoose.Schema

const task = new schema({
    task: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    lastDate: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                // Attempt to parse the date using moment.js with multiple formats
                const parsedDate = moment(value, [
                    moment.ISO_8601,
                    'YYYY-MM-DD',
                    'MM/DD/YYYY',
                    // Add more formats as needed
                ]);
                return parsedDate.isValid();
            },
            message: 'Invalid Date Format'
        }
    }
})

module.exports = mongoose.model('Task', task)