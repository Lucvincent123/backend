const mongoose = require("mongoose");

const insaSchema = new mongoose.Schema({
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
    Image: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Insa", insaSchema, "events_insa");
