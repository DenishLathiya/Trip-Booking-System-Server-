const { signup } = require("../models/signup");
const express = require('express')
const router  = express.Router();

router.post('/create', async(req,res)=>{
    const email= req.body.Email;
    try{
           const existuser = await signup.findOne({ Email: email });

           if(existuser){
             return res.status(404).json({ msg: "User already exists!" });
           }else{
                let user = new signup({
          FirstName:req.body.FirstName,
          LastName:req.body.LastName,
          Email:req.body.Email,
          password:req.body.password,
          cpassword:req.body.cpassword,
          });
          console.log(user);
      
            user = await user.save();
            if (!user) {
    return res.status(500).json({
      error: "Error saving product",
      success: false
    });
  }
  res.status(201).json(user);
           } 
    }catch (err) {
    console.error(err); 
    res.status(500).json({ error: err.message });
  }
})

router.get('/', async(req,res)=>{
    try{
          const user = await signup.find();
           if (!user) {
            return res.status(500).json({ success: false });
        }
        res.send(user);
    }catch (err) {
    console.error(err); 
    res.status(500).json({ error: err.message });
  }
})

router.post('/login', async (req, res) => {
  const { Email, password } = req.body;

  try {
    const user = await signup.findOne({ Email });

    if (!user || user.password !== password) {
      return res.status(401).json({ msg: "Invalid email or password." });
    }

    res.status(200).json({ msg: "Login successful.", user});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;