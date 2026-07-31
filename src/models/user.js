const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email address" + value);
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
            throw new Error("Enter a Strong Password: " + value);
            }
        }
    },
    age: {
        type: Number,
        min: 18, // for number only min and for string minLength
    },
    gender: {
        type: String,
        //custom validations - and this validate function will only work if we signup new user not for existing users.
        validate(value) {
            if(!["male", "female", "others"].includes(value)){
                throw new Error("Gender data is not valid");
            }
        },
    },
    photoUrl: {
        type: String,
    },
    about: {
        type: String,
        default: "This is default description of the user!",
    },
    skills: {
        type: [String], 
    },
},
{
    timestamps: true,
});

userSchema.methods.getJWT = async function () { // no arrow fun as with this keyword we cannot use 
    const user = this;
    const token = await jwt.sign({ _id :  user._id }, "DEV@Tinder$790", {
        expiresIn: "0d",
    });
    return token;
};

const User = mongoose.model("User", userSchema);
module.exports = User;