const userModel=require('../models/user-model')
const Joi=require("joi")
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken')
const {generateToken}=require("../utils/generateToken")

const registerSchema = Joi.object({
  fullname: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
});



  
  
  


module.exports.registeredUser = async function (req, res) {
  const { error } = registerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  try {
    let { email, fullname, password } = req.body;
    let user = await userModel.findOne({ email: email });
    if (user) return res.status(401).send("You ALREADY HAVE AN ACCOUNT");

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    let newUser = await userModel.create({
      email,
      password: hash,
      fullname,
    });

    let token = generateToken(newUser);
    res.cookie("token", token);
    return res.send("user created successfully");
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ error: 'Internal server error' });
  }
};