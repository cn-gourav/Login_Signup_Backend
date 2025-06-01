const express = require('express');
const router = express.Router();
const User = require('../models/userModel');


router.get('/users', (req, res) => {
    res.send('User Home Page');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.post('/signup', async (req, res) => {
    let {name, email, password} = req.body;
    console.log(name, email, password);
    try{
     const user = new User({name, email, password});
     await user.save();
     res.redirect('/');
    }catch(err) {
        console.log(err);
        res.status(500).send('Error creating user');
    }
});

router.post('/login', async (req, res) => {
    let {name, password} = req.body;
    console.log(name, password);
    try {
        const user = await User.findOne({ name, password });
        if (user) {
            res.redirect('/');
        } else {
            res.status(401).send('user not found or incorrect password');
        }
     } catch (err) {
        console.log(err);
        res.status(500).send('Error logging in'); 
     }
}
);



module.exports = router;