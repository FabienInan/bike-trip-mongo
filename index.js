const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require('body-parser');

const {article} = require('./model');
const {user} = require('./model');

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
  article.find({}, function (err, result) {
    if (err) {
      res.send(err);
    } else {
      const resultToSend = result.map(((article) => {
          return {
            _id: article._id,
            date: article.date,
            data: {
              fr: {
                title: article.data.fr.title,
                instagramId: article.data.fr.instagramId,
                content: article.data.fr && Buffer.from(article.data.fr.content).toString('utf8')
              },
              en: {
                title: article.data.en.title,
                instagramId: article.data.en.instagramId,
                content: article.data.en.content && Buffer.from(article.data.en.content).toString('utf8')
              },
            }
          }
        }));
      res.send(resultToSend);
    }
  })
});

router.route("/isAdmin").post((req, res) => {
  const login = req.body.login;
  const pwd = req.body.pwd;
  user.find({}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      const resultToSend = 
        {
          isAdmin: result.filter(userData => {
            const user = userData.toJSON();
            return user.login === login && user.pwd === pwd && user.isAdmin
          }).length > 0
        };
      res.send(resultToSend);
    }
  })
});

router.route("/saveArticle").post((req, res) => {

  const articleInstance = new article();
  articleInstance.data = req.body.data;
  articleInstance.date = req.body.date;

  articleInstance.save()
    .then(result => {
      if (result.id) {
        res.status(201).json({
          message: "Handling POST requests to /articles",
          article: result
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.route("/deleteArticle").delete((req, res) => {

  article.deleteOne({_id: req.body.id})
    .then(result => {
      if (result.deletedCount === 1) {
        res.status(201).json({
          message: "Handling DELETE requests to /articles"
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});