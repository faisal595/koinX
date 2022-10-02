const mongoose = require("mongoose");

const address = new mongoose.Schema({
    transactions: { type: Array, required: true }
});

const addressURL = mongoose.model("userAddress", address);
module.exports = addressURL;