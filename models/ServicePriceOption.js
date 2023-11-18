const mongoose = require('mongoose');

const servicePriceOptionSchema = new mongoose.Schema({
    service: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Service",
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        enum: ["Hourly", "Weekly", "Monthly"],
        default: "Hourly"
    },
})

const ServicePriceOption = mongoose.model("ServicePriceOption", servicePriceOptionSchema)

module.exports = ServicePriceOption;

