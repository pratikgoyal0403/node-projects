const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    caption: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    comments:[
        {
            username: {type: String, ref: "user"},
            comment: {type: String}
        }
    ],
    userInfo:{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true
        },
        username: {
            type: String,
            ref: 'user',
            required: true
        },
        imageUrl: {
            type: String,
            ref: 'user'
        }
    }
},
    {timestamps: true}
)

module.exports = mongoose.model('post', PostSchema);