const mongoose = require("mongoose");

const registerSchema = mongoose.Schema({
    username : String,
    email : String,
    password : String,
    
})

const UserModal = mongoose.model("user",registerSchema);
module.exports = UserModal;