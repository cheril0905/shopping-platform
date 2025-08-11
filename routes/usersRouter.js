const express = require('express');
const router = express.Router();

// Example: GET /users
router.get('/', (req, res) => {
  res.send('List of users');
});

// Example: POST /users
router.post('/', (req, res) => {
  // Add user logic here
  res.send('User created');
});

module.exports = router;
