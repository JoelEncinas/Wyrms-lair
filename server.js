const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const hbs = require("hbs");

require("dotenv").config();

const app = express();

const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));

// handlebars
app.set("view engine", "hbs");
app.set("views", __dirname + "/views");

// routes
const authRoutes = require("./routes/auth");
const protectedRoutes = require("./routes/protected");

app.use('/auth', authRoutes);
app.use('/protected', protectedRoutes);

app.get("*", (req, res) => {
  res.json({message: "404"})
});

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.pug2uxj.mongodb.net/?retryWrites=true&w=majority`;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB"))
  .catch(console.error);

app.listen(port, () => console.log(`Server started on port ${port}`));
