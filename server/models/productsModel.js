
const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        require: true

    },
    descreption: {
        type: String,
        maxLength: 100
    },
    available: {
        type: Boolean,
        default: true
    },
    
    image:{
        type:String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Product', productSchema)