const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ["Normal", "VIP"],
        default: "Normal",
    },
    priceOptions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ServicePriceOption",
    },],
})

const Service = mongoose.model("Service", serviceSchema)

module.exports = Service;

