const express = require("express");
const app = express();
const port = 8000;
const path = require("path");
const mongoose = require("mongoose");
const statictamp = path.join(__dirname,"../public");
const static_path = path.join(__dirname,"../views/tamplate");
const engine = require('ejs-mate');
const methodOverride = require('method-override');
const chat = require("./model/model");
require("./db/connect");
app.use(express.static(statictamp));
app.use(methodOverride('_method'));
app.engine('ejs', engine);
app.set("views",static_path);
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.get("/",(req,res)=>{
    res.render("index");
})
app.get("/about",(req,res)=>{
    res.render("about");
})
app.get("/course",(req,res)=>{
    res.render("course");
})
app.get("/blog",(req,res)=>{
    res.render("blog");
})
// show router
app.get("/show", async(req,res)=>{
    let chats = await chat.find();
    console.log(chats);
    res.render("show",{chats});
})
// create router
app.get("/contact",(req,res)=>{
    res.render("contacts");
})
// insert router
app.post("/show", async(req,res)=>{
    let {fname,lname,email,phone,description} = req.body;
    let newdata = new chat({
        fname:fname,
        lname:lname,
        email:email,
        phone:phone,
        description:description,
    });
    newdata.save();
    res.redirect("/show");
});
// create update router
app.get("/show/:id/edit",async(req,res)=>{
    let {id} = req.params;
    let updatechat = await chat.findById(id);
    // console.log(updatechat);
    res.render("edit",{updatechat});
})
// create data update router
app.put("/show/:id",async(req,res)=>{
    let {id} = req.params;
    let {fname:newfname,lname:newlname,email:newemail,phone:newphone,description:newdescription} = req.body;
    let chatdata = await chat.findByIdAndUpdate(id,{
        fname:newfname,
        lname:newlname,
        email:newemail,
        phone:newphone,
        description:newdescription,
    },{runValidators:true,new:true});
 console.log(chatdata);
 res.redirect("/show");
})
// delete router
app.delete("/show/:id", async(req,res)=>{
    let {id} = req.params;
    let deletechat = await chat.findByIdAndDelete(id);
    console.log(deletechat);
    res.redirect("/show");
})
// err router
app.get("*",(req,res)=>{
    res.render("errors");
})
app.listen(port,()=>{
    console.log("connected");
})