const userModel = require('../models/user-model');
const Joi = require("joi");
const bcrypt = require('bcrypt');
const { generateToken } = require("../utils/generateToken");

const registerSchema = Joi.object({
  fullname: Joi.string().trim().min(3).required(),
  email: Joi.string().email().trim().required(),
  password: Joi.string().trim().min(6).required()
});

// POST /users/register
module.exports.registeredUser = async function (req, res) {
  const { error } = registerSchema.validate(req.body);
  if (error) {
    req.flash("error", error.details[0].message);
    return res.redirect("/");
  }

  try {
    let { email, fullname, password } = req.body;
    email = email.trim();
    fullname = fullname.trim();
    password = password.trim();

    const existing = await userModel.findOne({ email });
    if (existing) {
      req.flash("error", "You already have an account. Please login.");
      return res.redirect("/");
    }

    const hash = await bcrypt.hash(password, 10);
    const newUser = await userModel.create({ email, password: hash, fullname });
    const token = generateToken(newUser);
    res.cookie("token", token);

    req.flash("success", "Account created successfully!");
    return res.redirect("/");
  } catch (err) {
    console.error(err);
    req.flash("error", "Internal server error");
    return res.redirect("/");
  }
};


// POST /users/login
module.exports.loginUser = async function (req, res) {
  try {
    let { email, password } = req.body;
    email = (email || '').trim();
    password = (password || '').trim();

    const user = await userModel.findOne({ email });
    if (!user) {
      req.flash("error", "Invalid email or password");
      return res.redirect("/");
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      req.flash("error", "Invalid email or password");
      return res.redirect("/");
    }

    const token = generateToken(user);
    res.cookie("token", token);
    res.redirect("/shop");

  } catch (err) {
    console.error(err);
    req.flash("error", "Server error, please try again");
    return res.redirect("/");
  }
};

