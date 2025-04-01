const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    ID: {
        type: Int,
        required: true
    },
    Événement: {
        type: String,
        required: true
    },
    Année: {
        type: Int,
        required: true
    },
    Catégorie: {
        type: Array,
        required: true
    },
    Image: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Event", eventSchema);
