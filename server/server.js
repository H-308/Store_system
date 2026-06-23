require("dotenv").config()
const express = require("express")
const cors = require("cors")
const corsOption = require("./config/corsOptions")
const app = express()
const PORT = process.env.PORT || 4500
const mongoose = require("mongoose")
const connectDB = require("./config/dbConn")

//middleWares
app.use(cors(corsOption))
app.use(express.json())
app.use(express.static("public"))

connectDB()

app.use("/products", require('./routers/productsRoute'))
app.use("/users", require('./routers/userRoute'))
app.use("/basket", require('./routers/basketRoute'))

mongoose.connection.once('open', ()=>{
    console.log('connected to DB');
    app.listen(PORT, ()=>{
        console.log(`server running on port ${PORT}`);
    })
})

mongoose.connection.on('error', err=>{
    console.log(err);
})
