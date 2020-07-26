const User = require('../model/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.postLogin = (req, res, next)=>{
    const email = req.body.email;
    const password = req.body.password;
    let fetchedUser;
    User.findOne({email: email}).then(user=>{
        if(!user){
            return res.status(204).json({message: 'user not found'});
        }
        fetchedUser = user;
        return bcrypt.compare(password, user.password);
    }).then(result=>{
        if(!result){
            return res.status(401).json({message: 'wrong password'})
        }
        const token = jwt.sign({
            email: fetchedUser.email,
            userId: fetchedUser._id.toString()
        }, 'somesuperdupersecret', {expiresIn: '2hr'})
        res.status(200).json({user: fetchedUser, token: token});
    }).catch(err=> console.log(err));
}

exports.postSignup = (req, res, next)=>{
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    bcrypt.hash(password, 12).then(hashedPassword=>{
        const user = new User({
            username,
            email,
            password: hashedPassword
        })
        return user.save();
    }).then(user=>{
        if(!user){
            return res.json(500).json({message: 'user not created'});
        }
        return res.json(201).json({user});
    }).catch(err=> console.log(err))
}

exports.getUserInfo = (req, res, next)=>{
    const userId = req.userId;
    User.findById(userId).then(user=>{
        if(!user){
            return res.status(404).json({message: "user not found"});
        }
        res.status(200).json({user: user});
    }).catch(err=> console.log(err));
}

exports.updateUserInfo = (req, res, next)=>{
    const userId = req.body.userId;
    const username = req.body.username;
    const userProfile = req.file;
    User.findById(userId).then(user => {
        if(!user){
            return res.status(500).json({message: 'user not found'}); 
        }
        user.username = username;
        user.profileImg = userProfile.path;
        return user.save()
    }).then(updatedUser=>{
        res.json(201).json({user: updatedUser});
    })
    .catch(err => console.log(err));
}
exports.getUserById = (req, res,next)=>{
    const userId = req.params.userId;
    User.findById(userId).then(user=>{
        if(!user){
            return res.status(404).json({message: "user not found"})
        }
        return res.status(200).json({user: user});
    }).catch(err=> console.log(err));
}