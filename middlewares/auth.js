const {getUser}=require("../service/auth");
function checkForAuthentication(req,res,next){
  const authoriza=req.cookies?.uid; 
}
async function restrictToLoggedInUserOnly(req,res,next) {
  const userUid=req.cookies?.uid;
    const bodyToken = req.body?.token;
    if(bodyToken) console.log("TOKEN PASSED LAST AXIOS");
    const token= userUid||bodyToken; //here uid id name of cookie which we have given in controller userAuth,js
  if(!token) return res.redirect("/login");
  const user=getUser(token);
  if(!user) return res.redirect("/login");
  req.user=user;
  next();
};
async function checkAuth(req,res,next) {
  const userUid=req.cookies?.uid;  //here uid id name of cookie which we have given in controller userAuth,js
  const user=getUser(userUid);
  req.user=user;
  next();
};
module.exports={restrictToLoggedInUserOnly,checkAuth};