const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/Users');

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.post('/register', (req, res, next) => { //signup
  const {username , password} = req.body;

  bcrypt.hash(password,10)
    .then((hash)=>{
      const user = new User({
        username: username,
        password: hash
      });
      user.save()
        .then((data)=>{
          res.json(data);
        })
        .catch((err)=>{
          res.json(err);
        })
    });
});

router.post('/authenticate',(req,res) => { //login
  const {username , password} = req.body;
  // token-example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RVc2VyIiwiaWF0IjoxNTg1NjY0MjU3fQ.zEcd67T1i4I28Gm5--xLYjBScr2zLRy62zFnPcqvfhM
  User.findOne({
    username: username
  }, (err,user)=>{
    if(err){
      throw err;
    }
    if(!user){
      res.json({
        status: false,
        message: 'Auth failed, user not found.'
      })
    }else{
      bcrypt.compare(password,user.password)
        .then((result)=>{
          if(!result){
            res.json({
              status: false,
              message: 'Auth failed, wrong password.'
            })
          }else{
            const payload = {
              username:username
            };
            const token = jwt.sign(payload,req.app.get('api_secret_key'),{
              //expiresIn:200000
            });

            res.json({
              status: true,
              token
            })
          }
        })
    }

  });
});
  

module.exports = router;
