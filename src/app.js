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
  // this will undefined we are passing the json from postman->body->raw->write json
//In order to get this body we will need middlewares which is app.use(express.json()); activated for all routes

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
