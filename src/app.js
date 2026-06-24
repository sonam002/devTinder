const express = require("express")

const app = express(); // instance of express

//Handle Auth Middleware for GET, PUT, POST...requests
//Another way of writing middlewares
const { adminAuth, userAuth } = require("./middlewares/auth");
app.use("/admin", adminAuth);

app.get("/user", userAuth, (req, res, next) => {
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