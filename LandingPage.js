const express = require("express");
const router = express.Router();
const private = require("./PrivateRouter");

router.get("/", private, (req, res) => {
  res.status(200).json("welcome to the homepage");
});

module.exports = router;
