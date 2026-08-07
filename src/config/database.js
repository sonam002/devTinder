const mongoose = require('mongoose');
const dns = require('node:dns');

dns.setServers(['8.8.8.8', '8.8.4.4']);

const connectDB = async () => {
    try {
        return await mongoose.connect(
            "mongodb+srv://namastenode:2nr5chrzVZgr3njv@namastenode.kim6fjp.mongodb.net/devTinder",
            {
                serverSelectionTimeoutMS: 10000,
            }
        );
    } catch (err) {
        console.error('MongoDB connection failed:', err);
        throw err;
    }
};

//because we only want to listen when our connection
//  is successful to moving code to app.js
module.exports = connectDB;
