const User=require("../models/user");
const { v4: uuidv4 } = require('uuid');
const {setUser}=require("../service/auth");
async function handleUserSignup(req,res) {
  const {name,email,password}=req.body;
  const allUsers=await User.create({
    name:name,
    email:email,
    password:password,
  });
  return res.redirect("/");
}

async function handleUserLogin(req,res) {
  const {email,password}=req.body;
   const user=await User.findOne({email,password});
   if(!user) return res.render('login',{error:"Invalid Username Or Password"});
   const token=setUser(user);   // 2
   res.cookie("uid",token);
   if (req.headers["x-requested-by"] === "axios-bot") {
    req.user=user;  
 return res.json({token});  }
  res.redirect('/');
}

module.exports={handleUserSignup,handleUserLogin,};