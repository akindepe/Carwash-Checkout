const express = require("express");
const { check,body } = require("express-validator");

const authController = require("../controllers/auth");

const router = express.Router();

router.get("/login", authController.getLogin);
router.post(
  "/login",
  [
    body("username")
      .isAlphanumeric()
      .withMessage("Benutzername  ungültig "),
     
    body("password", " Passwort ungültig ")
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim(),
  ],
  authController.postLogin
);

module.exports = router;
