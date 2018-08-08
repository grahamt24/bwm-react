const express = require("express"),
  router = express.Router(),
  UserCtrl = require("../controllers/user"),
  BookingCtrl = require("../controllers/booking");


router.post("", UserCtrl.authMiddleware, BookingCtrl.createBooking);

router.get("/manage", UserCtrl.authMiddleware, BookingCtrl.getUserBookings);

module.exports = router;
