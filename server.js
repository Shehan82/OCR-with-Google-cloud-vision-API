const express = require("express");
const vision = require("@google-cloud/vision");

const app = express();

const client = new vision.ImageAnnotatorClient({
  keyFilename: "API_key.json",
});

client.textDetection("./love2.jpg").then((results) => {
  //   const labels = results[0].labelAnnotations;
  //   console.log("Labels:");
  //   labels.forEach((label) => console.log(label.description));

  console.log(results);
});

app.listen(8000, "127.0.0.1", () => console.log("server runing"));
