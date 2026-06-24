const express = require("express")

const app = express(); // instance of express

//Handle Auth Middleware for GET, PUT, POST...requests
//Why do we even need middlewares? 
// Problem : We will have to write the same logic again and again for each route
//Solution : We can make a common route /admin which can handle all routes starting with /admin
app.use("/admin", (req, res, next) => {
    //Logic of fetching the data
    const token = "xyz";
    const isAdminAuthorized = token === "xyz";
    if(!isAdminAuthorized){
        res.status(401).send("Unauthorized request");
    }else{
        next();
    }
});

app.get("/user", (req, res, next) => {
   res.send("User Data Sent");
});

app.get("/admin/getAllData", (req, res, next) => {
   res.send("All Data Sent");
});

app.get("/admin/deleteUser", (req, res) => {
    //Logic of deleting user
    res.send("Deleted a User");
});



app.listen(3000, () => {
    console.log("Server is listening successfully on port 3000");
});