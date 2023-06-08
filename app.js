const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const { initDB } = require("./services/db");

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(
  session({
    secret: "szu/titk0s tit0k",
    resave: false,
    saveUninitialized: true,
  })
);

// parse application/json
app.use(bodyParser.json());
// parse application/x-www-from-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

initDB((err, { tweetModel, userModel, saveDB }) => {
  if (err) {
    return console.log("App cannot start", err);
  }
  require("./router")(app, { tweetModel, userModel, saveDB });
  app.listen(3000, () => {
    console.log(`Running on: 3000`);
  });
});
