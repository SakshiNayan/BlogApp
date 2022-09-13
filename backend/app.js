
const express = require("express");
const mongoose = require("mongoose")
 
const app = express();
const register = require("./Routes/register")
const post = require ("./Routes/post")



//body-parser middilware
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.listen(3001, (err)=>{
    if(!err){
        console.log("Server is Running at 3001 port")
    }
    else{
        console.log(err)
    }
})

//const mongodb ="mongodb+srv://Sakshi09:test123@instaclone.gwk4cly.mongodb.net/blogApp?retryWrites=true&w=majority"
mongoose.connect("mongodb://localhost/blogApp" ,(data)=>{
    console.log("Successfully connect to db")
},(err)=>{
    console.log(err)
});


app.use("/user",register);
app.use("/uploads",post)

app.get("/",(req,res)=>{
    res.send("BLOG APP ")
})
