const mongoose = require("./conn");
const categorySchema = new mongoose.Schema({
    cat_name:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        maxlength:[40,"category name can't be more then 40 characters."]
    },
    cat_image:{
        type:String,
        required:true,
        trim:true,
    },
    total_products:{
        type:Number,
        default:0,
        required:true,
        trim:true,
    },
    click_count:{
        type:Number,
        default:0,
        required:true,
        trim:true,
    },
    modify_date:{
        type:Date,
        default:Date.now
    }
    
});

const categoryCollection = new mongoose.model("categories",categorySchema);
module.exports = categoryCollection;