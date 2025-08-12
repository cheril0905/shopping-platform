const express = require('express');
const router = express.Router();
const userModel=require('../models/user-model')
const Joi=require("joi")
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken')
const {generateToken}=require("../utils/generateToken")
const{registeredUser}=require("../controllers/authController")

// Example: GET /users
router.get('/', (req, res) => {
  res.send('List of users');
});

// Example: POST /users
const registerSchema = Joi.object({
  fullname: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});

// POST /users/register with Joi validation
router.post('/register',registeredUser);

module.exports = router;
