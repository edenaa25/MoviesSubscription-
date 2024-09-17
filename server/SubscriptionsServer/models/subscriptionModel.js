const mongoose = require('mongoose')

const subscriptionSchema = new mongoose.Schema({
    MemberId: String,
    Movies : [{movieId:String ,date: Date} ]
})

module.exports = mongoose.model('Subscription', subscriptionSchema)
