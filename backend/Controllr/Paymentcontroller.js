const paypal = require('./paypal');

exports.createOrder = async (req, res) => {
  try {
    const { amount, currency, description } = req.body;

    const create_payment_json = {
      "intent": "sale",
      "payer": {
        "payment_method": "paypal"
      },
      "redirect_urls": {
        "return_url": "http://localhost:3000/paymentsuccess",
        "cancel_url": "http://localhost:5000/api/payment/cancel"
      },
      "transactions": [{
        "amount": {
          "currency": currency,
          "total": (amount).toFixed(2) // amount should be in decimal format
        },
        "description": description
      }]
    };

    paypal.payment.create(create_payment_json, (error, payment) => {
      if (error) {
        console.error("PayPal Error:", error.response);
        return res.status(500).json({ message: 'Error creating payment', error: error.response });
      } else {
        console.log("Payment created successfully:", payment);
        for (let i = 0; i < payment.links.length; i++) {
          if (payment.links[i].rel === 'approval_url') {
            return res.json({ forwardLink: payment.links[i].href });
          }
        }
        res.status(500).send('No approval URL found');
      }
    });
    

  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.executePayment = (req, res) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  const execute_payment_json = {
    "payer_id": payerId,
    "transactions": [{
      "amount": {
        "currency": "USD",
        "total": "1.00"
      }
    }]
  };

  paypal.payment.execute(paymentId, execute_payment_json, (error, payment) => {
    if (error) {
      console.error(error.response);
      return res.status(500).send('Error executing payment');
    } else {
      res.send('Payment success');
    }
  });
};

exports.cancelPayment = (req, res) => res.send('Payment cancelled');