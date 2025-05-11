const {tod}=require('../model/todo');
// const {todo}=require("../model/signup");
async function create1(req,res){
const {data,status1}=req.body;
try{
const user=tod.create({
    data,
    status1,
})
console.log('succesfull');
}catch(err){
    console.log(err);
}
}
async function get1(req, res) {
    try {
      const data = await tod.find({});
      res.send(data);
      console.log('data fetched');
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).send({ error: 'Failed to fetch data' });
    }
  }
async function delete1(req,res){
    const id=req.params.id;
    console.log("iddddd",id)
    const user=await tod.findByIdAndDelete(id);
    if(user){
        res.json("todo deleted")
    }else{
        res.json('no todo found')
    }

}
module.exports={
    create1,
    get1,
    delete1,
}