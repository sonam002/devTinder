const express = require("express")
//import connectDB from database.js
const connectDB = require("./config/database");
const app = express(); // instance of express
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");

//this express middleware reads json object converts it to js object and adds js object back to line 12 which is req.body
app.use(express.json()); 

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
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(isPasswordValid){
      res.send("Login Successful!");
    }else{
      res.send("Password is invalid");
    }
  }catch(err){
      res.status(400).send("ERROR:" + err.message);
    }
});




//Get user by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try{
    const user = await User.findOne({emailId: userEmail});
    if(!user){
      res.status(404).send("User not found");
    }else{
      res.send(user);
    }
    // if(users.length === 0){ //by default if user is not present then return [] empty object
    //   res.status(404).send("User not found");
    // }else{
    //   res.send(users);
    // }
  }catch(err){
    res.status(400).send("something went wrong");
  }
});

// Feed API - GET /feed - get all the users from database
app.get("/feed", async (req, res) => {
  try{
    const users = await User.find({});
      res.send(users);
  }catch(err){
    res.status(400).send("something went wrong");
  }
});

//Delete a user from database
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try{
    const user = await User.findByIdAndDelete(userId);
    res.send("User deleted Successfully");
  }catch(err){
    res.status(400).send("Something went wrong");
  }
})

//Update data of the user - Any other data apart from schema will be ignored by mongo and not be updated
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId; //instead or req.body.userId we can put params and pass userId in URL cause its not good to update userId
  const data = req.body;

  try {
    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if(!isUpdateAllowed){
      throw new Error("Update not allowed!");
    }
    const user = await User.findByIdAndUpdate({_id : userId}, data, {
      returnDocument: "before",
      runValidators: true, //it allows to update existing data
    });
    console.log(user);
    res.send("User updated successfully");
  }catch(err){
    res.status(400).send("Update failed:" + err.message);
  }
})

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
