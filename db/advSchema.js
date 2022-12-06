const mongoose = require("./conn");
const advSchema = new mongoose.Schema({
    image:{
        type:String,
        required:true,
        trim:true
    },
    click_count:{
        type:Number,
        required:true,
        default:0
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
    }
});

const advCollection = new mongoose.model("adv_slides",advSchema);
module.exports = advCollection;