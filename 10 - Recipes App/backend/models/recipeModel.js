const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    ingredients: {
        type: [String],
        required: true
    },
    cookingTime: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        default: "General"
    },
    isVegetarian: {
        type: Boolean,
        default: true
    }
},
    {
        timestamps: true

    }
)

const Recipe = mongoose.model("Recipe", recipeSchema);

module.exports = Recipe;