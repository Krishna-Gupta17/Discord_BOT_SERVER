const express = require('express'); 
const {newShortUrl,newPath,clicks}= require('../controller/user.js');
const router=express.Router();
router
      .route("/")
      .post(newShortUrl);
router
      .route("/:shortId")
      .get(newPath);
router
      .route("/analytics/:id")
      .get(clicks);

      module.exports=router;



      // line 7-12 not so neccessary