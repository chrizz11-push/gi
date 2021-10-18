const mongoose = require("mongoose")
const userValidation = mongoose.Schema({
    userName:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    }, 
})

module.exports = mongoose.model("validateUser", userValidation)

