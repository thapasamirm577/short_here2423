const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const linkSchema = mongoose.Schema({
    originalLink: {
        type: String,
        required: true,
    },
    shortLink: {
        type: String,
        required: true,
    },
    createdAt: Date,
    linkBy:{
        type: ObjectId,
        ref: "User"
    }
});

module.exports = mongoose.model("Link",linkSchema);