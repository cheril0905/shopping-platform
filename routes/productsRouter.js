const express = require('express');
const router = express.Router();

// Example: GET /products
router.get('/', (req, res) => {
  res.send('List of products');
});

// Example: POST /products
router.post('/', (req, res) => {
  // Add product logic here
  res.send('Product created');
});

module.exports = router;
