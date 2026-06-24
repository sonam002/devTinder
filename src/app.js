const express = require("express")

const app = express(); // instance of express

//Why do we even need middlewares? 
// Problem : We will have to write the same logic again and again for each route
app.get("/admin/getAllData", (req, res) => {
    //Logic of fetching the data
    const token = "abcd";
    const isAdminAuthorized = token === "xyz";
    if(isAdminAuthorized){
        res.send("All Data Sent");
    }else{
        res.status(401).send("Unauthorized request");
    }
});

app.get("/admin/deleteUser", (req, res) => {
    //Logic of deleting user
    res.send("Deleted a User");
});



app.listen(3000, () => {
    console.log("Server is listening successfully on port 3000");
});