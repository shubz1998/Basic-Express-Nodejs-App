var express = require('express');
var route = require("express");
var router = express.Router();
var User = require('../lib/user');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

router.get('/login' , function (req ,res) {
    res.render('login' , {'msg' : ""});
});

router.get('/portal' , function (req,res) {
    if(!req.session.user){
        return res.render('index');
    }
    user = req.session.user;
    return res.render('portal' , {'userinfo' : user});
});

router.post('/login' , function (req,res) {
    var username = req.body.username;
    var password = req.body.password;

    User.findOne({username: username, password:password}, function (err, user) {
        if(err){
            console.log(err);
            return res.status(500).send("Some Error Occured");
        }
        if(!user){
            return res.render('login' , {'msg' : "Wrong username/password"});
        }
        req.session.user = user;
        return res.render('portal',{'userinfo' : user});

    });
});

router.get('/logout' , function (req,res) {
    req.session.destroy();
    res.render('index');
});


router.get('/register' , function (req ,res) {
   res.render('register');
});

router.post('/register', function (req,res) {
    var username = req.body.username;
    var password = req.body.password;
    var fullname = req.body.fullname;

    var newuser = new User();
    newuser.username = username;
    newuser.password = password;
    newuser.fullname = fullname;


    newuser.save(function (err, saveduser) {
        if (err){
            console.log(err);
            return res.status(500).send("Username already exists");
        }
        console.log(saveduser);
        return res.render('index');
    });

});

 module.exports = router;
