const mongoose=require('mongoose');
const user=new mongoose.Schema({
    Name:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
       required:true,
       unique:true,
    },
    gender:{
        type:String,
        required:true,
    },
},{timestamps:true})
const todo=mongoose.model('todo',user);
module.exports={
    todo,
}
