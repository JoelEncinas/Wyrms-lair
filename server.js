const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const hsb = require("hbs");
require("dotenv").config();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
hsb.registerPartials(__dirname + "/partials");

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.pug2uxj.mongodb.net/?retryWrites=true&w=majority`;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB"))
  .catch(console.error);

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(port, () => console.log(`Server started on port ${port}`));
