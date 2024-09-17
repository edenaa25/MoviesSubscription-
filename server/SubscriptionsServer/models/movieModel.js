const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
   Name : String,
   Genres : [String],
   Image: String,
   Premiered : Date
})

module.exports = mongoose.model('movie', movieSchema)
