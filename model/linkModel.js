const mongoose = require("mongoose");
const shortId = require("shortid");
const { ObjectId } = mongoose.Schema.Types;

const linkSchema = mongoose.Schema({
    originalLink: {
        type: String,
        required: true,
    },
    shortLink:{
        type: String,
        required: true,
        default: shortId.generate
    },
    createdAt: Date,
    linkBy:{
        type: ObjectId,
        ref: "User"
    }
});

module.exports = mongoose.model("Link",linkSchema);