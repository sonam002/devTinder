const express = require("express");
const authrouter = express.Router();

authRouter.post("/signup", async (req, res) => { 
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

authRouter.post("/login", async (req, res) => {
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

module.exports = authRouter;