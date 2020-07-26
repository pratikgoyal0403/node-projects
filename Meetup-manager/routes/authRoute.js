const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const authController = require("../controllers/authController");

router.get("/login", authController.getLogin);
router.post(
  "/login",
  [
    body("email").isEmail().normalizeEmail(),
    body("password")
      .trim()
      .isLength({ min: 5, max: 25 })
      .withMessage("password must be within 5 to 25 characters long"),
  ],
  authController.postLogin
);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

module.exports = router;
