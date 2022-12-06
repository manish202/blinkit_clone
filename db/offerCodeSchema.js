const mongoose = require("./conn");
const offerCodeSchema = new mongoose.Schema({
    per:{
        type:Number,
        required:true,
        trim:true
    },
    min_txn:{
        type:Number,
        required:true,
    },
    code:{
        type:String,
        required:true,
        trim:true
    }
});

const offerCodeCollection = new mongoose.model("offer_codes",offerCodeSchema);
module.exports = offerCodeCollection;