const express = require("express")
//import connectDB from database.js
const connectDB = require("./config/database");
const app = express(); // instance of express
const User = require("./models/user");

//save userObj in User collection in database
app.post("/signup", async (req, res) => {
    // const userObj = {
    //   firstName : "Sonam",
    //   lastName : "Verma",
    //   emailId : "sonam@verma.com",
    //   password : "sonam@123"
    // } 
    //Creating a new instance of User model
    // const user = new User(userObj);
    //or
    const user = new User({
      firstName : "Astha",
      lastName : "Verma",
      emailId : "astha@verma.com",
      password : "astha@123"
    });
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
