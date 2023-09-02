const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    firstname: {
        type: String,
        minlength: 2,
        maxlength: 12,
    },

    lastname: {
        type: String,
        minlength: 2,
        maxlength: 12,
    },

    username: {
        type: String,
        require: true,
        minlength: 5,
        maxlength: 10
    },

    email: {
        type: String,
        require: true,
        unique: true,
        validate: {
            validator: function (email) { 
                const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
                return emailRegex.test(email);
            },

            message: "Invalid Email"
        },
    },

    password: {
        type: String,
        require: true,
        minlength: 8,
    },

    role: {
        type: String,
        enum: ["user", "admin", "owner"],
        default: "user"
    }
}, { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
