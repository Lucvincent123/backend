const { text } = require("express");
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    action: {
        type: Number,
        required: true,
        unique: true
    },
    imageUrl: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Category", categorySchema);
