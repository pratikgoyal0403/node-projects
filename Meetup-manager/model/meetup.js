const mongoose = require('mongoose');

const MeetupSchema = mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    imageUrl:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Meetup', MeetupSchema);