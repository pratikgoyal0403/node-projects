const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const { validationResult } = require("express-validator");

exports.postLogin = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(404).json({ message: "invalid input received" });
  }
  const email = req.body.email;
  const password = req.body.password;
  let fetchedUser;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: "email not registered" });
      }
      fetchedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((result) => {
      if (!result) {
        return req.status(404).json({ message: "wrong password" });
      }
      const token = jwt.sign(
        {
          email: fetchedUser.email,
          userId: fetchedUser._id,
        },
        "supersecret",
        { expiresIn: "1h" }
      );
      return res.status(200).json({ message: "user found", user: fetchedUser, token: token });
    })
    .catch((err) => console.log(err));
};

exports.postSignup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(404).json({ message: "wrong input received" });
  }
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
      const user = new User({
        username: username,
        email: email,
        password: hashedPassword,
      });
      return user.save();
    })
    .then((user) => {
      if (!user) {
        return res
          .status(500)
          .json({ message: "something went wrong please try later" });
      }
      return res
        .status(201)
        .json({ message: "user sucessfully created", user: user });
    })
    .catch((err) => console.log(err));
};
