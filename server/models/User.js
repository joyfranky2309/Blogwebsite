const { default: mongoose } = require("mongoose");

const userSchema =new mongoose.Schema({
    role:{
        type:String,
        enum:["admin","user"],
        default:"user"
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    prefernces:{
        type:String,
    }
})
module.exports=mongoose.model("User",userSchema)