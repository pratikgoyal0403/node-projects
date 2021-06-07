const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const session = require("express-session");
const mongoDbStore = require("connect-mongodb-session")(session);
const flash = require("connect-flash");

const appRoute = require("./routes/appRoute");
const authRoute = require("./routes/authRoute");
const User = require('./model/users');

const app = express();

const PORT = process.env.PORT || 5050;
const URI =
  //db uri

const store = new mongoDbStore({
  uri: URI,
  collection: "sessions",
});

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  multer({ storage: diskStorage, fileFilter: fileFilter }).single("image")
);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "images")));
app.use(
  session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
app.use(flash());

//checking if user is logged in or not
app.use((req, res, next)=>{
    if(!req.session.user){
        return next();
    }
    User.findById(req.session.user._id).then(user=>{
        if(!user){
            return res.send('no user found')
        }
        req.session.user = user;
        next();
    }).catch(err=> console.log(err));
})

app.use((req, res, next)=>{
    res.locals.isAuthenticated = req.session.isAuthenticated;
    next();
})

app.use(appRoute);
app.use(authRoute);

mongoose.connect(
  URI,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => {
    app.listen(PORT, () => {
      console.log("server is listening at port 5050");
    });
  }
);
