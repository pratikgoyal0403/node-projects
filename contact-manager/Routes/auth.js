const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth");

const { body } = require("express-validator");
router.post(
  "/login",
  [
    body("email").isEmail().normalizeEmail(),
    body("password")
      .trim()
      .isLength({ min: 5, max: 20 })
      .withMessage("password must be of length between 5 to 20 characters"),
  ],
  authController.postLogin
);
router.post("/signup", [
    body("email").isEmail().normalizeEmail(),
    body("password")
      .trim()
      .isLength({ min: 5, max: 20 })
      .withMessage("password must be of length between 5 to 20 characters"),
], authController.postSignup);

module.exports = router;
