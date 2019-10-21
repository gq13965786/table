const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

//Bring in User model
let User = require('../models/user');

//Register Form
router.get('/users/register', function(req, res, next) {
  res.render('register');
});

//Register Proccess
router.post('/users/register', function(req, res){
  const name = req.body.name;
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const password2 = req.body.password2;
  const key = req.body.keynumber;

  //req.checkBody('keynumber', '问郭琦要注册码').notEmpty();
  //req.checkBody('keynumber', '问郭琦要注册码').equals(1024);
  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

  let errors = req.validationErrors();

  console.log(errors);

  if(errors){
    res.render('register', {
      errors:errors
    });
  } else {
    let newUser = new User({
      name:name,
      email:email,
      username:username,
      password:password
    });

    bcrypt.genSalt(10, function(err, salt){
      bcrypt.hash(newUser.password, salt, function(err, hash){
        if(err){
          console.log(err);
        }
        newUser.password = hash;
        newUser.save(function(err){
          if(err){
            console.log(err);
            return;
          } else {
            //req.flash('success','You are now registered and can log in');
            res.redirect('/users/login');
          }
        });
      });
    });
  }
});

//Login Form
router.get('/users/login', function(req, res){
  res.render('forgot');
});

//Login Proccess
router.post('/users/login', function(req, res, next){
  passport.authenticate('local', {
    successRedirect:'/views/admin.html',
    failureRedirect:'/users/login',
    failureFlash: true
  })(req, res, next);
});

//Logout
router.get('/users/logout', function(req, res){
  req.logout();
  //req.flash('success','You are logged out');
  res.redirect('/users/login');
});

module.exports = router;
