const express = require("express");
const router = express.Router();
const URL=require("../models/url");
router.get("/:shortId", async function newPath(req, res) {
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
});

module.exports=router;

