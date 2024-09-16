const mongoose = require("mongoose")

const chatSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    dateTime: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model("ChatData", chatSchema)