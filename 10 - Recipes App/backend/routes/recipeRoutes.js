const express = require("express");
const router = express.Router();
const { getAllRecipes, createRecipe, getRecipeById, updateRecipe, deleteRecipe } = require("../controllers/recipeController");

router.get("/recipes/getAll", getAllRecipes);
router.post("/recipes/create", createRecipe);
router.get("/recipes/byId/:id", getRecipeById);
router.put("/recipes/update/:id", updateRecipe);
router.delete("/recipes/delete/:id", deleteRecipe);

module.exports = router;