const express = require("express")

const app = express(); // instance of express

app.use("/", (err, req, res, next) => {
    if(err){
        //log your error
        res.status(500).send("something went wrong from top");
    }
});

app.get("/getUserData", (req, res, next) => {
    // try{
        throw new Error("erorrr");
        res.send("User Data Sent");
    // }catch(err){
    //     res.status(500).send("something error contact support team");
    // }
});
//Wildcard error handling
app.use("/", (err, req, res, next) => {
    if(err){
        //log your error
        res.status(500).send("something went wrong");
    }
});


app.listen(3000, () => {
    console.log("Server is listening successfully on port 3000");
});