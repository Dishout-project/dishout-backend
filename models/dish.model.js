const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dishSchema = new Schema({
    dish: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
}, {
    timestamps: true,
});

const Dish = mongoose.model("Dish", dishSchema);

module.exports = Dish;