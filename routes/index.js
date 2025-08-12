const express = require('express');
const router = express.Router();

// Home page: registration and login UI
router.get('/', (req, res) => {
  res.render('index');
});

module.exports = router;
