const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    ID: {
        type: Number,
        required: true
    },
    Événement: {
        type: String,
        required: true
    },
    Année: {
        type: Number,
        required: true
    },
    Catégories: {
        type: [String],
        required: true
    },
    Image: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Event", eventSchema);
