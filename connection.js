const mongoose = require('mongoose');
async function connectmongo(url) {
  mongoose.connect(url)
  .then(()=>console.log("mongoDb connected"))
  .catch((err)=>console.log("error",err));
}
module.exports=connectmongo;