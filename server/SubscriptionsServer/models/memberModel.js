const mongoose = require('mongoose')

const memberSchema = new mongoose.Schema({
   Name : String,
   Email: String,
   City: String
})

module.exports = mongoose.model('Member', memberSchema)
