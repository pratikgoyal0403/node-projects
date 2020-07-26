const express = require("express");
const path = require("path");
const multer = require("multer");
const bodyParser = require("body-parser");
const jimp = require("jimp");

const app = express();

const PORT = process.env.PORT || 8080;

app.set("view engine", "ejs");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.post("/format", (req, res, next) => {
  const width = +req.body.width;
  const height = +req.body.height;
  const quality = +req.body.quality;
  const imageUrl = req.body.imageUrl;
  jimp
    .read(imageUrl)
    .then((img) => {
      return img
        .resize(width, height)
        .quality(quality)
        .writeAsync("uploads/edited.jpg");
    }).then(result=>{
        console.log(result);
        res.download('uploads/edited.jpg');
    })
    .catch((err) => console.log(err));
});

app.post("/upload", (req, res, next) => {
  const image = req.file;
  console.log(image);
  res.render("editor", {
    imageUrl: image.path,
  });
});

app.get("/", (req, res, next) => {
  res.render("home");
});

app.listen(PORT, (err) => {
  console.log("server is ready at port 8080");
});
