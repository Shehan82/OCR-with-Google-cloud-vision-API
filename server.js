const express = require("express");
const vision = require("@google-cloud/vision");
const multer = require("multer");

const path = require("path");

const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: storage,
});

const app = express();

const client = new vision.ImageAnnotatorClient({
  keyFilename: "API_key.json",
});

client.documentTextDetection("./my.png").then((results) => {
  //   const labels = results[0].labelAnnotations;
  //   console.log("Labels:");
  //   labels.forEach((label) => console.log(label.description));

  console.log(results[0].fullTextAnnotation.text);
});

app.post("/upload", upload.single("profile"), (req, res) => {
  console.log(req.file);
});

app.listen(8000, "127.0.0.1", () => console.log("server runing"));
