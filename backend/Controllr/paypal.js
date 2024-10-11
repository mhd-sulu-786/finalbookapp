const paypal = require('paypal-rest-sdk');

paypal.configure({
  mode: 'sandbox', // Change to 'live' for production
  client_id: "AU93-C3Cfwyw1hrmYcICZVirWG2GgPlSeTa7id46MTI-IKTwisrnCDSvF-ieka36rfhG9iw-idb_q0VN",
  client_secret: "EGfLFWw1zZ7VFwLPF_POFGJJEhPq1yoZhMC8WShrUhkUub31VFSBWl5vfs18cfd3GSiKrS7b8FCUSj1U"
});

module.exports = paypal;
