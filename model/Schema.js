const mongoose = require ("mongoose");


     let userSchema = new mongoose.Schema({
          firstName:String,
          lastName:String,
          age:Number,
          email:String,
          password:String,
          mobileNo:String,
          profilePic:String
     })
     let user = new mongoose.model("users",userSchema,
          "users");


module.exports= user;
