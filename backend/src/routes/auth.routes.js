const express = require("express");
const authController = require("../controllers/auth.controller");
const validate = require("../middleware/validate.middleware");
const { protect } = require("../middleware/auth.middleware");
const { validateRegister, validateLogin } = require("../utils/validators");

const router = express.Router();

router.post("/register", validate(validateRegister), authController.registerUser);
router.post("/login", validate(validateLogin), authController.loginUser);
router.post("/logout", authController.logoutUser);
router.get("/me", protect, authController.getCurrentUser);

module.exports = router;
