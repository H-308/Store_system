
const mongoose = require("mongoose")

const usersSchema = new mongoose.Schema({
    fullName: {
        type: String,
        maxLength: 20
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        maxLength: 25
    },
    phone: {
        type: String,
        maxLength: 16
    },
    role: {
        type: String,
        enum: ["User", "Admin"],
        default: "User"
    },
    active: {
        type: Boolean,
        default: true
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('User', usersSchema)