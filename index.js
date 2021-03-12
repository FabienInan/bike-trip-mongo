const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require('body-parser');

const Article = require("./model");

const app = express();

const PORT = 4000;
app.use(cors());

mongoose.connect("mongodb+srv://Fabien:biketrip@cluster0.envcj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
  useNewUrlParser: true
});

const connection = mongoose.connection;

connection.once("open", function () {
  console.log("Connection with MongoDB was successful");
});

app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});

const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", router);

router.route("/getArticles").get((req, res) => {
  Article.find({}, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

router.route("/saveArticle").post((req, res) => {

  const article = new Article();
  article.data = req.body.dat;
  article.date = req.body.date;

  article.save()
    .then(result => {
      res.status(201).json({
        message: "Handling POST requests to /articles",
        article: result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});