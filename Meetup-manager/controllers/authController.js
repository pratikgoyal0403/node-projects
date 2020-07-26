const User = require('../model/users');
const bcrypt = require('bcrypt');
const { validationResult }  = require('express-validator');

exports.getLogin = (req, res, next)=>{
    const msg = []
    // const msg = req.flash('error');
    // if(msg.length > 0){
    //     msg = msg[0];
    // }else{
    //     msg = null;
    // }
    res.render('./auth/login', {errorMsg: msg});
}

exports.postLogin = (req, res, next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.render('/login', {errorMsg: errors.array()[0].msg});
    }
    const email = req.body.email;
    const password = req.body.password;
    let fetchedUser;
    User.findOne({email: email}).then(user=>{
        if(!user){
            req.flash('error', 'email does not match');
            return res.redirect('/login');
        }
        fetchedUser = user;
        return bcrypt.compare(password, user.password)
    }).then(result=>{
        if(!result){
            req.flash('error', 'wrong password entered');
            return res.redirect('/login');
        }
        req.session.user = fetchedUser;
        req.session.isAuthenticated = true;
        return res.redirect('/');
    })
    .catch(err=> console.log(err));
}

exports.getSignup = (req, res, next)=>{
    res.render('./auth/signup');
}

exports.postSignup = (req, res, next)=>{
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    bcrypt.hash(password, 12).then(hashedPassword=>{
        const user = new User({
            username: username,
            email: email,
            password: hashedPassword
        });
        return user.save();
    }).then(user=>{
        if(!user){
            return;
        }
        res.redirect('/login');
    }).catch(err=> console.log(err));
}