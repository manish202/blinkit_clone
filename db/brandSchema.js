const mongoose = require("./conn");
const brandSchema = new mongoose.Schema({
    brand_name:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        maxlength:[30,"brand name can't be more then 30 characters."]
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

const brandCollection = new mongoose.model("brands",brandSchema);
module.exports = brandCollection;