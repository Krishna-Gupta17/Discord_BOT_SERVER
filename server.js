require("dotenv").config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app =express();
const cookieParser = require('cookie-parser');
app.use(cors({
  origin: 'https://discord-bot-8boq.onrender.com'
}));

//imports
const connectmongo = require('./connection');
const URL=require("./models/url");
const urlRoute=require("./routes/index");
const staticRouter=require("./routes/staticRouter");
const userRoute=require("./routes/user");
const botrouter=require("./routes/bot");
const {restrictToLoggedInUserOnly,checkAuth}=require("./middlewares/auth");
//connections
connectmongo(process.env.MONGO_URL);
//set tempelate
app.set("view engine","ejs");
//views location tell to exprss
app.set("views", path.join(__dirname, "views"));
//rendering
// app.get("/test",async(req,res)=>{
//   const allUrls=await URL.find({});
//   console.log(allUrls);
//   return res.render("home",{
//     urls:allUrls,
//   });
// })
//middleware-plugin
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());  //json data supported
app.use(express.urlencoded({extended:false})); //form data supported
app.use(cookieParser());
//routes
app.use("/URL",restrictToLoggedInUserOnly,urlRoute); //inline middleware  - means works only if request comes on /URL
app.use("/user",userRoute);
app.use("/BOT",botrouter);
app.use("/",checkAuth,staticRouter);
const port=process.env.PORT || 8000;
app.listen(port,()=>{console.log(`server started at ${port}`)});


// const { url } = require('inspector'); deleted no meaning
