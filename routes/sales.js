const express = require('express');

const salesController = require('../controllers/sales');

const router = express.Router();

router.get('/', salesController.getSalesportal);

module.exports = router;