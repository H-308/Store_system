const mongoose = require("mongoose")

const connectDB = async () =>{

    try{
        await mongoose.connect(process.env.DATABASE_URI_HOME)
    }
    catch(err){
        console.error("fail to connect to data base")
    }

}

module.exports = connectDB