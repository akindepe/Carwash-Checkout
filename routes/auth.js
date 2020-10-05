const express = require("express");
const { check,body } = require("express-validator");

const authController = require("../controllers/auth");

const router = express.Router();

router.get("/login", authController.getLogin);
router.post(
  "/login",
  [
    check("username")
      .isAlphanumeric()
      .isLength({ min: 5 })
      .withMessage("benutzername oder passwort ungültig "),
     
    body("password", " benutzername oder passwort ungültig")
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim(),
  ],
  authController.postLogin
);
router.get("/admin/login", authController.getAdminLogin);
router.post(
  "/admin/login",
  [
    check("username")
      .isAlphanumeric()
      .isLength({ min: 5 })
      .withMessage("benutzername oder passwort ungültig "),

    body("password", "benutzername oder passwort ungültig")
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim(),
  ],
  authController.postAdminLogin
);
router.get("/logout", authController.postLogout);

module.exports = router;
