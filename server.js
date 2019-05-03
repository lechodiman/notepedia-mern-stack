const express = require("express");

const connectDB = require("./config/db");
const users = require("./routes/api/users");
const notes = require("./routes/api/notes");
const cors = require("cors");
const cloudinary = require("cloudinary");

const app = express();
connectDB();

app.use(cors());
// Init Middleware (now body-parser comes with express)
app.use(express.json({ extended: false }));

/** configure cloudinary */
cloudinary.config({
  cloud_name: "dcdoxdoob",
  api_key: "621964442761743",
  api_secret: "owSxzmx6zvozdTxnGmGwlRfipZo"
});

// User Routes
app.use("/api/users", users);
app.use("/api/notes", notes);

let port = 5000 || process.env.PORT;

/** start server */
app.listen(port, () => {
  console.log(`Server started at port: ${port}`);
});
