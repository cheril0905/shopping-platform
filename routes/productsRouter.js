const express = require('express');
const router = express.Router();
const upload=require("../config/multer-config")
const productModel=require("../models/product-model")


// Example: POST /products
router.post("/create",upload.single("image"), async (req, res) => {
  // Add product logic here
    let { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;

    try {
        let product = await productModel.create({
            image: req.file.buffer,
            name,
            price,
            discount,
            bgcolor,
            panelcolor,
            textcolor,
        });
        req.flash("success","Product Created Successfully")
        res.redirect("/owners/admin");
        
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Something went wrong" });
    }
  
});

module.exports = router;
