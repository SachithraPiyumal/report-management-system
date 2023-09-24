const mongoose=require("mongoose");

const reportSchema=new mongoose.Schema({
    headBranch:{
        type:String,
        required:true
    },
    userBranch:{
        type:String,
        required:true
    },
    report:{
        type:String,
        required:true
    }
  
})

module.exports = mongoose.model("Report",reportSchema);