const mongoose = require ("mongoose");
const express = require ("express");
const cors = require ("cors")
const multer = require ("multer");
const path =require("path");
const jwt = require("jsonwebtoken");
const app = express();
const Schema = require ("./model/Schema");
app.use(cors());
app.use(express.json());
app.use("/schema",Schema)
// app.use(express.urlencoded());
app.use("/uploads", express.static("uploads"));
app.use(express.static(path.join(__dirname, "./client/build")));

const storage = multer.diskStorage({
     destination:(req, file, cb)=> {
       cb(null, "uploads")
     },
     filename: function (req, file, cb) {
          console.log(file);
       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
       cb(null, `${Date.now()}_${file.originalname}`)
     },
   });
   
   const upload = multer({ storage: storage });
   
   app.get("*",(req,res)=>{
     res.sendFile("./client/build/index.html")
   });

app.post("/signup", upload.single("profilePic"),async (req,res)=>{ 
     console.log(req.body);
     console.log(req.file);
     try{
          let newuser = new user({
               firstName:req.body.firstName,
               lastName:req.body.lastName,
               age:req.body.age,
               email:req.body.email,
               password:req.body.password,
               mobileNo:req.body.mobileNo,
               profilePic:req.file.path,
          });
          
          await user.insertMany([newuser]);
          console.log("insert data into db")
          res.json({status:"success",msg:"user created successfully"});

     }catch(err){
          console.log("Unable insert data into db")
          res.json({status:"success",msg:"unable to Crate User."});
     };


});
app.post("/login",upload.none(), async(req,res)=>{
     console.log(req.body);

     let useArr = await User.find().and({email: req.body.email});
     if(useArr.length > 0){
           if(useArr[0].password == req.body.password){

               let token = jwt.sign({email:req.body.email,password:req.body.password},"babababa");

               let dataToSend ={
                    firstName:useArr[0].firstName,
                    lastName:useArr[0].lastName,
                    age:useArr[0].age,
                    email:useArr[0].email,
                    password:useArr[0].password,
                    profilePic:useArr[0].profilePic,
                    token:token,
     

               // let dataTOSend={
               //      firstName:req.body.firstName,
               //      lastName:req.body.lastName,
               //      age:req.body.age,
               //      email:req.body.email,
               //      password:req.body.password,
               //      mobileNo:req.body.mobileNo,
               //      profilePic:req.file.path
               }
               res.json({
                   status:"success",
                   msg:"Credential are correct.",
                   data:dataToSend,
                   });


          }else{
               res.json({status:"failure",
                    msg:"Invalid password."})
          }
     }else{
          res.json({status:"failure",
               msg:"User doest not exist."});
  };
});

app.post("/validateToken",upload.none(), async(req,res)=>{
     console.log(req.body);
      let decryptedCredentials = jwt.verify(req.body.token,"babababa");
      console.log(decryptedCredentials);

     let useArr = await user.find().and({email:decryptedCredentials.email});
     if(useArr.length > 0){
           if(useArr[0].password == decryptedCredentials.password){

               let token = jwt.sign({email:req.body.email,password:req.body.password},"babababa");

               let dataToSend ={
                    firstName:useArr[0].firstName,
                    lastName:useArr[0].lastName,
                    age:useArr[0].age,
                    email:useArr[0].email,
                    password:useArr[0].password,
                    profilePic:useArr[0].profilePic,
                    token:token,
     

               // let dataTOSend={
               //      firstName:req.body.firstName,
               //      lastName:req.body.lastName,
               //      age:req.body.age,
               //      email:req.body.email,
               //      password:req.body.password,
               //      mobileNo:req.body.mobileNo,
               //      profilePic:req.file.path
               }
               res.json({
                   status:"success",
                   msg:"Credential are correct.",
                   data:dataToSend,
                   });


          }else{
               res.json({status:"failure",
                    msg:"Invalid password."})
          }
     }else{
          res.json({status:"failure",
               msg:"User doest not exist."});
  };
});

          app.listen(9090,()=>{
          console.log("listening to port 9090");

});

// let userSchema = new mongoose.Schema({
//      firstName:String,
//      lastName:String,
//      age:Number,
//      email:String,
//      password:String,
//      mobileNo:String,
//      profilePic:String
// })
// let user = new mongoose.model("users",userSchema,
//      "users");

let connectToMDB = async()=>{
     try{
         await mongoose.connect("mongodb+srv://kadalianji402:kadali@batch09cluster.h5rth.mongodb.net/BRNDB?retryWrites=true&w=majority&appName=Batch09Cluster"

     );
     console.log("Successfully to connect to MDB")
     //insertDataIntoDB();


     }catch (err){
          console.log("unable to connect to MDB")
          
     };
};
connectToMDB();