const {todo}=require("../model/signup"); 
const {z}=require('zod');
async function handlesignup(req,res){
    const requireBody = z.object({
        email: z.string().min(8).max(100).email(),
        password: z.string().min(4).max(12),
      });
      
      console.log("zod checking");
      
      const parse = requireBody.safeParse(req.body);
      
      if (!parse.success) {
        res.json({
          message: "incorrect format",
          error: parse.error,
        });
        return;
      }
try{
    const { Name, email, password, gender } = req.body;
    const user1 = await todo.findOne({ email });

    if (user1) {
        console.log('sunny1');
        return res.json({message:'User already exists'});
    }

    const user = await todo.create({
        Name,
        email,
        password,
        gender,
    });

    res.json({ message: 'signup successfull', user });
}catch(err){
    res.json({message:err});
}
}
async function handlelogin(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await todo.findOne({ email, password });
    
    if (user) {
        console.log('sunny1');
        res.json({ message: 'Login successful' });
    } else {
        console.log('sunny12');
        res.status(404).json({ message: 'No user exists' });
    }
}

module.exports={
    handlesignup,
    handlelogin,
}