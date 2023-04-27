const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).render("index");
});

router.get("/test", (req, res) => {
  res.status(200).render("partials/main_navbar");
});

module.exports = router;
