const mongoose = require("mongoose")
const User = require('../models/usersModel')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const register = async (req, res) => {
    const { fullName, userName, password, email, phone} = req.body
    if (!userName || !password) {
        return res.status(400).send("userName and password are requieres")
    }
    const user = await User.findOne({ userName: userName }).lean()
    if (user) {
        return res.status(400).send("user with that userName is already exists")
    }
    const hashCode = await bcrypt.hash(password, 10)
    await User.create({ fullName, userName, password: hashCode, email, phone})
    res.json({ message: "User created successfully" });

}

const deldeteUser = async (req, res) => {
    const { id } = req.params
    const user = User.findById(id)
    if (!user) {
        return res.status(400).send("user not found")
    }
    await user.deleteOne()
    res.json({ message: "User deleted successfully" });
}

const login = async (req, res) => {
    const { userName, password } = req.body
    if (!userName || !password) {
        return res.status(400).send("userName and password are requieres")
    }

    const user = await User.findOne({ userName }).lean()
    if (!user) {
        return res.status(401).send("Unauthorized")
    }

    const pass = await bcrypt.compare(password, user.password)
    if (!pass) {
        return res.status(401).send("Unauthorized")
    }

    const userInfo = {
        _id: user._id, fullName: user.fullName, role: user.role, userName: user.userName,
        email: user.email
    }

    const accessToken = jwt.sign(userInfo, process.env.ACCSES_TOKEN_PASSWORD)

    res.json({ message: "logged in successfully", accessToken })
}


// const getUserByUserName = async (req, res)=>{
//     const {fullName, userName, password, email, phone} = req.body
//     if(!userName || !password){
//         return res.status(400).send("userName and password")
//     }

//     await User.create({fullName, userName, password, email, phone})
// }

module.exports = { register, login, deldeteUser }