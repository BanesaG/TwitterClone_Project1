const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const TweetSchema = new Schema({
    tweet: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        default: "Letter"
    },
    date: {
        type: Date,
        default: Date.now()
    },
});

const Tweet = mongoose.model('Tweet', TweetSchema);
module.exports = Tweet;