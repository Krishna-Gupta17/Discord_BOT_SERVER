const URL = require("../models/url");
const shortid = require("shortid");

async function newShortUrl(req, res) {
  const {url}=req.body;
  if (!url) return res.status(400).json({ error: "url is required" }); //url is name of key which we are posting in postman and same will be input name:url in home page
  const shortId = shortid.generate();
  console.log(shortId);
  await URL.create({
    shortId: shortId,
    redirectUrl: url,
    visitedHistory: [],
    createdBy:req.user._id, //middleware me dekho req.user banaya tha udhar se aaya hai req.user=user waha se _id le li
  });
  const shorted=`${process.env.SERVER_URL}/URL/` + shortId;
  if (req.headers["x-requested-by"] === "axios-bot") {
  return res.json({shorted,shortId});  }

  return res.render("home",{id:shortId}); // or whatever default response you wan
  
}
async function newPath(req, res) {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  if (!entry) {
  return res.status(404).send('Short URL not found');
}
  res.redirect(entry.redirectUrl);
}
async function clicks(req, res) {
  const shortId = req.params.id;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = {
  newShortUrl,
  newPath,
  clicks,
};
