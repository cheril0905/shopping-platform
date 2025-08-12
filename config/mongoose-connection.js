const mongoose = require('mongoose');
const dbgr=require("debug")("development:mongoose") // nothing will be printed unless env variable is setup
const config=require("config");

mongoose
.connect(`${config.get("MONGODB_URI")}/scatch`)
.then(function(){
    dbgr("connected");
})
.catch(function(err){
    console.log(err);
})
module.exports=mongoose.connection;

