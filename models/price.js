const mongoose = require("mongoose")

let price = new mongoose.Schema({
    time: { type: String, required: true },
    price: { type: Number, required: true }
});

let priceDetails = mongoose.model("priceInfo", price);
module.exports = priceDetails;