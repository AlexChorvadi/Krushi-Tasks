const express = require("express");
const router = express.Router();
const { register, login, verifyToken, getProfile  } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.get("/profile", verifyToken, getProfile);


module.exports = router;