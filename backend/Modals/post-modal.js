const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    publish:
    {
        type:String,
        required:true,
    },
    description: String,
    time:String
})

const PostModal = mongoose.model("post",postSchema);
module.exports = PostModal;