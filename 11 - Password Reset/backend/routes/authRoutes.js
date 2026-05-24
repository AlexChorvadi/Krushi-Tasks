const express = require("express");
const router = express.Router();
const { register, login, forgot, verifyResetToken, resetPassword  } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.post("/forgot", forgot);
router.post("/verify-token", verifyResetToken);
router.post("/reset-password", resetPassword);

module.exports = router;