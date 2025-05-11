const mongoose=require('mongoose');
const user=new mongoose.Schema({
 data:{
    type:String,
 },
 status1:{
    type:Boolean,
    required:true,
 }
},{timestamps:true})
const tod=mongoose.model('tod',user);
module.exports={
    tod,
}
