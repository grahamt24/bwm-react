const express = require("express"),
      User = require('../controllers/user'),
      router = express.Router();

router.post("/auth", User.auth);

router.post("/register", User.register);

module.exports = router;
