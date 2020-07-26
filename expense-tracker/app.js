const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const apiRoute = require('./routes/apiRoutes');
const authRoute = require('./routes/auth');
const app = express();

const PORT = process.env.PORT || 8080;
const URI = process.env.DB_URI

app.use(bodyParser.json());
app.use(cors());
app.use(apiRoute);
app.use(authRoute);


mongoose.connect(
    URI,
    {useNewUrlParser: true, useUnifiedTopology: true},
  (err) => {
    app.listen(PORT, () => {
      console.log("this port is running at 8080");
    });
  }
);
