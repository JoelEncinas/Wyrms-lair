const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Protected route
router.get("/", (req, res) => {
  // Verify JWT token from cookie
  const token = req.cookies.token;
  if (!token) {
    return res.redirect('/auth/login');
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
        return res.redirect('/auth/login');
    }

    res.render('protected', { username: decoded.userId });
  });
});

module.exports = router;
