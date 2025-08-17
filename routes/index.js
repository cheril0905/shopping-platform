const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");

router.get("/", function (req, res) {
    let error = req.flash("error");
    let success = req.flash("success");
    res.render("index", { error, success,loggedin:false });
});


router.get("/shop", isLoggedIn, async function (req, res) {
   let products=await productModel.find()
   let success=req.flash("success");
    res.render("shop",{products,success});
});

router.get("/addtocart/:productid", isLoggedIn, async function (req, res) {
   let user=await userModel.findOne({email:req.user.email})
   user.cart.push(req.params.productid);
   await user.save();
   req.flash("success","Added to Cart")
   res.redirect("/shop")

});


router.get("/cart", isLoggedIn, async function (req, res) {
   let user=await userModel.findOne({email:req.user.email}).populate("cart")
   
    res.render("cart",{user});
});

router.get("/account", isLoggedIn, async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.user.email })
                                  .populate("cart");  // optional, in case you also want to show cart items
        if (!user) {
            req.flash("error", "User not found!");
            return res.redirect("/shop");
        }

        res.render("account", { user });
    } catch (err) {
        console.error(err);
        req.flash("error", "Something went wrong!");
        res.redirect("/shop");
    }
});



module.exports = router;
