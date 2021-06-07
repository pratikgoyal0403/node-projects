const path = require('path');

const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');

const PostRoute = require('./routes/post');
const authRoute = require('./routes/auth');

const app = express();

const PORT = process.env.PORT || 5050;
const URI = //mongodb cloud database link can't upload on github

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'images');
    },
    filename: (req, file, cb)=>{
        cb(null, file.originalname);
    }
})

const fileFilter = (req, file, cb)=>{
    if(file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    }else{
        cb(null, false);
    }
}

app.use(cors())
app.use(express.json());
app.use(multer({storage: storage, fileFilter: fileFilter }).single('image'))
app.use('/images', express.static(path.join(__dirname, 'images')))
app.use(PostRoute);
app.use(authRoute);


mongoose.connect(URI, {useUnifiedTopology: true, useNewUrlParser: true}, ()=>{
    app.listen(PORT, ()=>{
    console.log('listening at port 5050')
})
});
