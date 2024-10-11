const express = require('express');
const router = express.Router();
const paymentController = require('../Controllr/Paymentcontroller');

router.post('/pay', paymentController.createOrder);
router.get('/success', paymentController.executePayment);
router.get('/cancel', paymentController.cancelPayment);

module.exports = router;