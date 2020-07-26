const Meetup = require('../model/meetup');

exports.getHome = (req, res, next)=>{
    res.render('./meetup/home');
}
exports.getMeetups = (req, res, next)=>{
    Meetup.find().then(meetups=>{
        if(!meetups){
            return ;
        }
        res.render('./meetup/meetups', {meetups: meetups});
    }).catch(err=> console.log(err));
}
exports.getCreateMeetupPage = (req, res, next)=>{
    res.render('./meetup/createMeetup');
}
exports.getMeetup = (req, res, next)=>{
    const id = req.params.id;
    Meetup.findById(id).then(meetup =>{
        if(!meetup){
            return;
        }   
        res.render('./meetup/meetup', {meetup: meetup});
    }).catch(err=> console.log(err));
}
exports.postCreateMeetup = (req, res, next)=>{
    const title = req.body.title;
    const description = req.body.description;
    const date = req.body.date;
    const time = req.body.time;
    const image = req.file;
    const meetup = new Meetup({
        title: title,
        imageUrl: image.filename,
        description: description,
        date: date,
        time: time
    });
    meetup.save().then(meetup=>{
        res.redirect('/meetups');
    }).catch(err=>console.log(err));
}
exports.getProfile = (req, res, next)=>{
    res.render('./meetup/profile');
}