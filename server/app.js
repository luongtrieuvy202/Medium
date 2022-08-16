const express = require("express");
const routers = require("./routes/");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cloudinary = require("cloudinary");

const app = require("express");

const router = express.Router();

const url = process.env.MONGODB_URI;

cloudinary.config({
  cloud_name: "chidumennamdi",
  api_key: "",
  api_secret: "",
});

try {
  mongoose.connect(url, {});
} catch (err) {}

let port = 5000;

routers(router);

app.use(cors());
app.use(bodyParser.json());
app.use(helmet());

app.use("/api", router);

app.listen(port, () => {
  console.log(`Server started at port: ${port}`);
});
