const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    headBranch:{
        type:String
    },
    userBranch:{
        type:String,
    },
    userRole:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("User",userSchema);