const express = require("express")
//import connectDB from database.js
const connectDB = require("./config/database");
const app = express(); // instance of express
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");
//this express middleware reads json object converts it to js object and adds js object back to line 12 which is req.body
app.use(express.json()); 
app.use(cookieParser()); //miidleware to read cookies back 

//save userObj in User collection in database
app.post("/signup", async (req, res) => { 
    try{
      //Validation of data
    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;
    //Encrypt Password - use bcrypt library by npm 
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    //Creating a new instance of User model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

      await user.save();
      res.send("User Added Successfully!");
    } catch(err){
      res.status(400).send("ERROR:" + err.message);
    }
});

app.post("/login", async (req, res) => {
  try{
    const { emailId, password } = req.body;

    const user = await User.findOne({emailId: emailId});
    if(!user){
      throw new Error("Invalid credentials");
    }
    const isPasswordValid = await user.validatePassword(password);
    if(isPasswordValid){

      //Create JWT Token
      const token = await user.getJWT();
      console.log(token);
      //Add the token to cookie and send the response back to the user
      res.cookie("token", token);
      res.send("Login Successful!");
    }else{
      res.send("Password is invalid");
    }
  }catch(err){
      res.status(400).send("ERROR:" + err.message);
    }
});

app.get("/profile", userAuth, async (req, res) => {
  try{
    //now we can remove redundant code as it is there in auth.js
    const user = req.user;
    res.send(user);
  }catch(err){
      res.status(400).send("ERROR:" + err.message);
    }
});

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  //Sending a connection request
  const user = req.user;
  console.log("Sending a connection request");
  res.send(user.firstName + " Sent connection request!");
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
