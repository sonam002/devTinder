const express = require("express")

const app = express(); // instance of express

//handle incoming req(Request Handler)
// app.use("/", (req, res) => { // overwrites all routes no other route will work
//     res.send("Hello from the server!");
// });

app.use(
    "/test",
    (req, res, next) => {
        console.log("Handling the route test");
        next();
    },
    (req, res, next) => {
        console.log("Handling the route test 2");
        next();
    },
    (req, res) => {
        console.log("Handling the route test 3");
        res.send("3rd Response!!");
    }
);
app.use((req, res) => {
    res.send("Hello from the serverrrrrrrrrrrr");
});

app.listen(3000, () => {
    console.log("Server is listening successfully on port 3000");
});