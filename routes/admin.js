const express = require("express");
const adminModeStatus = require("../middleware/is-Admin");
const adminController = require("../controllers/admin");

const router = express.Router();


router.get(
  "/admin",
  adminModeStatus.isAdmin,
  adminController.getAdminHomePage
);


module.exports = router;
