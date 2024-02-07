const mongoose = require("mongoose");
const newmongoose = mongoose.Schema({
fname:{
    type:String,
    required:true,
},
lname:{
    type:String,
    required:true,
},
email:{
    type:String,
    required:true,
    unique:true,
},
phone:{
    type:Number,
    required:true,
},
description:{
    type:String,
    required:true,
},
});

let chat = mongoose.model("collage_data",newmongoose);
module.exports = chat;