const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../model/users");

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let fetchedUser;
  Users.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return new Error("user not found");
      }
      fetchedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((result) => {
      if (!result) {
        return res.json({ message: "incorrect password" });
      }
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id.toString() },
        "somesecret",
        { expiresIn: "1hr" }
      );
      return res
        .status(200)
        .json({
          message: "logged in sucessfully",
          token: token,
          username: fetchedUser.username,
          userId: fetchedUser._id.toString(),
        });
    })
    .catch((err) => console.log(err));
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;
  bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
      const user = new Users({
        username: username,
        email: email,
        password: hashedPassword,
      });
      return user.save();
    })
    .then((result) => {
      res
        .status(201)
        .json({ message: "user created succesfully", user: result });
    })
    .catch((err) => console.log(err));
};
