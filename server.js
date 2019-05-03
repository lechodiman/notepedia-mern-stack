/** require dependencies */
const express = require("express");
const routes = require("./routes/");

const connectDB = require("./config/db");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cloudinary = require("cloudinary");

const app = express();
connectDB();
const router = express.Router();


/** configure cloudinary */
cloudinary.config({
  cloud_name: "dcdoxdoob",
  api_key: "621964442761743",
  api_secret: "owSxzmx6zvozdTxnGmGwlRfipZo"
});

let port = 5000 || process.env.PORT;

/* set up routes */
routes(router);

/* set up middlewares */
app.use(cors());
app.use(bodyParser.json());
app.use(helmet());

app.use("/api", router);

/** start server */
app.listen(port, () => {
  console.log(`Server started at port: ${port}`);
});
