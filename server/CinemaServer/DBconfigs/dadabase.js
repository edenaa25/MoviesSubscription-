const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/FullStackProject1_UsersDB").then(() => console.log("Connected to DB"))

