const express = require("express");
//const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
// const router = express.Router();
const recipeRoutes = require("./routes/recipeRoutes");

//dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to the Recipes API");
});

app.use("/api", recipeRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});