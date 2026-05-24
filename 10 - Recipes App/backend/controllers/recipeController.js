const recipe = require('../models/recipeModel');
const getAllRecipes = async (req, res) => {
    try {
        const recipes = await recipe.find();
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: error.message
            }
        );
    }
};

const getRecipeById = async (req, res) => {
    try {
        const { id } = req.params;
        const recipeById = await recipe.findById(id);
        if (!recipeById) {
            return res.status(404).json(
                {
                    success: false,
                    message: 'Recipe not found'
                }
            );
        }
        res.status(200).json(recipeById);
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: error.message
            }
        );
    }
};

const createRecipe = async (req, res) => {
    try {
        const newRecipe = await recipe.create(req.body);
        res.status(201).json(newRecipe);
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: error.message
            }
        );
    }
};

const updateRecipe = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedRecipe = await recipe.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedRecipe) {
            return res.status(404).json(
                {
                    success: false,
                    message: 'Recipe not found'
                }
            );
        }
        res.status(200).json(updatedRecipe);
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: error.message
            }
        );
    }
};

const deleteRecipe = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRecipe = await recipe.findByIdAndDelete(id);
        if (!deletedRecipe) {
            return res.status(404).json(
                {
                    success: false,
                    message: 'Recipe not found'
                }
            );
        }
        res.status(200).json(deletedRecipe);
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: error.message
            }
        );
    }
};

module.exports = {
    getAllRecipes,
    createRecipe,
    getRecipeById,
    updateRecipe,
    deleteRecipe
}