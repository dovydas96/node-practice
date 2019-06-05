const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

//Login Page
router.get('/login', (req, res) => res.render('login'));

//Register
router.get('/register', (req, res) => res.render('register'));


// Register Handle
router.post('/register', (req,res) => {
    const { name,email,password,password2 } = req.body;
    let errors = [];

    //Check required fields
    if(!name || !email || !password || !password2) {
        errors.push({msg:'Please fill in all fields'})
    }

    //Check passwords match
    if(password !== password2){
        errors.push({msg:'Passwords do not match!'})
    }

    //Check pass length
    if(password.length < 6 ){
        errors.push({msg:'Passwords should be at least 6 characters!'})
    }

    if(errors.length > 0){ 
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });
    }
    else{
        // Validation Passed
        User.findOne({email: email})
        .then(user => {
            if(user){
                // User already Exists
                errors.push( {msg:'User is already registered'})
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
            } else {
                const newUser = new User({
                    name,
                    email,
                    password
                });
                // Hash Password
                bcrypt.genSalt(10, (err,salt) => 
                    bcrypt.hash(newUser.password,salt, (err,hash) => 
                    {
                        if(err) throw err;
                        // Set Hashed
                        newUser.password = hash;
                        //Save user
                        newUser.save()
                        .then(user => {
                            req.flash('sucess_msg', 'You are now registered')
                            res.redirect('/users/logn');
                        })
                        .catch(err => console.log(err));
                   }));

            } 
        });

    }


} );

module.exports = router;

