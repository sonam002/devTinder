const express = require("express")
//import connectDB from database.js
const connectDB = require("./config/database");
const app = express(); // instance of express
const User = require("./models/user");

//this express middleware reads json object converts it to js object and adds js object back to line 12 which is req.body
app.use(express.json()); 

//save userObj in User collection in database
app.post("/signup", async (req, res) => {
  console.log(req.body); // becomes js object after line 8
    //Creating a new instance of User model
    const user = new User(req.body);

    try{
      await user.save();
      res.send("User Added Successfully!");
    } catch(err){
      res.status(400).send("Error saving the user:" + err.message);
    }
});

connectDB()
    .then(() => {
      console.log("Database connection established");
      app.listen(3000, () => {
      console.log("Server is listening successfully on port 3000");
      });
    })
    .catch((err) => {
        console.log("Database cannot be connected!");
    });
