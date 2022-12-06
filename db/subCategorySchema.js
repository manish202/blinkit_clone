const mongoose = require("./conn");
const subCategorySchema = new mongoose.Schema({
    sub_cat_name:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        maxlength:[40,"subcategory name can't be more then 40 characters."]
    },
    parent_cat:{
        type:String,
        required:true,
        trim:true
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

const subCategoryCollection = new mongoose.model("subcategories",subCategorySchema);
module.exports = subCategoryCollection;