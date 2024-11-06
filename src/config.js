const express=require('express')
const mongoose=require('mongoose')
const connect=mongoose.connect('mongodb+srv://navan:12345@suraksha.1uiy6.mongodb.net/?retryWrites=true&w=majority&appName=Suraksha')
connect.then(()=>{
    console.log("Connected ");
    
})
.catch(()=>{
    console.log("Not Connected");
    
})
const loginschema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});
const collection = new mongoose.model("users",loginschema)
module.exports=collection;