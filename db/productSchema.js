const mongoose = require("./conn");
const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        maxlength:[100,"product name can't be more then 100 characters."]
    },
    image:{
        type:String,
        required:true,
        trim:true,
    },
    weight:{
        type:String,
        required:true,
        trim:true,
    },
    category:{
        type:String,
        required:true,
        trim:true
    },
    subcategory:{
        type:String,
        required:true,
        trim:true
    },
    brand:{
        type:String,
        required:true,
        trim:true
    },
    last_modify:{
        type:Date,
        default:Date.now
    },
    mrp:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    click_count:{
        type:Number,
        required:true,
        default:0
    }
});

const productCollection = new mongoose.model("products",productSchema);
module.exports = productCollection;