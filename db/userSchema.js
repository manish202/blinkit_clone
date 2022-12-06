const mongoose = require("./conn");
const userSchema = new mongoose.Schema({
    full_name:{
        type:String,
        required:true,
        trim:true,
        maxlength:[40,"full name can't be more then 40 characters."]
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        match:[/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,"email is invalid"]
    },
    mobile:{
        type:Number,
        required:true,
        trim:true,
        match:[/^[6-9]\d{9}$/,"invalid mobile number. only indian supported. start with (6,7,8,9)"]
    },
    password:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        default:null,
        trim:true,
        maxlength:[150,"address more then 150 characters is invalid."]
    },
    tokens:[{
        token:{
            type:String,
            required:true,
            default:null
        }
    }]
});

const userCollection = new mongoose.model("users",userSchema);
module.exports = userCollection;