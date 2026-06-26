const express = require("express")
//import connectDB from database.js
const connectDB = require("./config/database");
const app = express(); // instance of express

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
