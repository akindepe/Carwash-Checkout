const express = require("express");
const isSalesPortalAuth = require("../middleware/is-allowed-in-sales");
const salesController = require("../controllers/sales");

const router = express.Router();

router.get(
  "/",
  isSalesPortalAuth.salesPortalAuth,
  salesController.getSalesportal
);
router.post(
  "/:orderNr", isSalesPortalAuth.salesPortalAuth, salesController.cancelOrder
);
router.post(
  "/cash/payment",
  isSalesPortalAuth.salesPortalAuth,
  salesController.cashPayment
);

module.exports = router;
