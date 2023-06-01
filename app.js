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

// app.get("/", function (req, res) {
//   console.log(req.session);

//   if (!req.session.number) {
//     req.session.number = 0;
//   }
//   res.render("index", { number: req.session.number });
// });

// app.get("/increase-session", function (req, res) {
//   req.session.number++;
//   return res.redirect("/");
// });

// app.get("/new-session", function (req, res) {
//   req.session.regenerate(function (err) {
//     console.log("BOOOOM!!!");
//   });
//   return res.redirect("/");
// });

// app.listen(3000, function () {
//   console.log("Running on :3000");
// });
