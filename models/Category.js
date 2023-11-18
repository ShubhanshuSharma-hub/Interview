const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    services: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Service',
        },
    ],
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
