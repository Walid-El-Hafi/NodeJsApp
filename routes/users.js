const router = require('express').Router();
const express = require('express')
const app = express()
const User = require('../models/User');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
//const session = require('express-session');
const { registerValidation, loginValidation} = require('../validation');
//const security = require('../middlewares/security');
//Registre

router.post('/register',async (req,res) => {

    /*const { error } = registerValidation(req.body);
     if(error) return res.status(400).send(error.details[0].message)*/

    const emailexist = await User.findOne({email: req.body.email});
    if(emailexist) return res.status(400).send('email already exists');
    
   /* const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password,salt);*/

    const user = new User( { 
        name : req.body.name,
        email : req.body.email,
        phone_number : req.body.phone_number,
        password : req.body.password //hashPassword
     });
     try {
         const saveUser = await user.save();
         res.send(saveUser);
     }
     catch(err) {
         res.status(400).send(err);
     }
})

//Login

router.post('/login', async (req,res) => {
    
    const { error } = loginValidation(req.body); 
    if(error) return res.status(400).send(error.details[0].message);
    console.log("Log : ",req.body.email)
    console.log("Password : ",req.body.password)
    const user = await User.findOne({ email: req.body.email,password : req.body.password});
    if(!user) return res.status(401).send('email or password is wrong');

    const token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET,{expiresIn : "1h"});

    res.header('auth-token',token).json({token,user} );
     
      return res.status(200).send(token)

 
})
module.exports = router