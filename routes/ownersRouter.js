const express = require("express");
const router = express.Router();
const ownerModel=require("../models/owner-model")
const bcrypt=require("bcrypt")

if(process.env.NODE_ENV==="development"){
    router.post("/create", async function(req,res){
        let owners=await ownerModel.find();
        if(owners.length > 0){
            return res
                .send(503)
                .send("you dont have permission to create a new owner");
        }

        let{fullname,email,password,isAdmin}=req.body;
        
        


        let createUser=await ownerModel.create(
            {
            fullname,
            email,
            password,
            isAdmin,

            }
        );
     res.status(201).send(createUser)
    })
}


router.get("/",function(req,res){
    res.send("hey");
})




module.exports=router;