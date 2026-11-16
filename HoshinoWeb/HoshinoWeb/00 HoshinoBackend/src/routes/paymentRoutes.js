const express = require('express');
const router = express.Router();
const { createReservationAndPayment } = require('../controllers/paymentController');

router.post('/', createReservationAndPayment);

module.exports = router;