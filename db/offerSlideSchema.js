const mongoose = require("./conn");
const offerSlideSchema = new mongoose.Schema({
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

const offerSlideCollection = new mongoose.model("offer_slides",offerSlideSchema);
module.exports = offerSlideCollection;