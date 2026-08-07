const express = require("express");
const router = express.Router();

router.get("/profile", userAuth, async (req, res) => {
  try{
    //now we can remove redundant code as it is there in auth.js
    const user = req.user;
    res.send(user);
  }catch(err){
      res.status(400).send("ERROR:" + err.message);
    }
});

module.exports = profileRouter;