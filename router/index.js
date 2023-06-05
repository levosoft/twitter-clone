const uuid = require("uuid");
const multer = require("multer");
const path = require("path");

//const emailService = require("../services/email");

const authMW = require("../middlewares/user/auth");
const getUserMW = require("../middlewares/user/getUser");
const loginMW = require("../middlewares/user/login");
const logoutMW = require("../middlewares/user/logout");
const regMW = require("../middlewares/user/reg");

const getTweetsMW = require("../middlewares/tweet/getTweets");
const getTweetMW = require("../middlewares/tweet/getTweet");
const getMyTweetsMW = require("../middlewares/tweet/getMyTweets");
const newTweetMW = require("../middlewares/tweet/newTweet");
const editTweetMW = require("../middlewares/tweet/editTweet");
const delTweetMW = require("../middlewares/tweet/delTweet");

const renderMW = require("../middlewares/render");

const uploadMW = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      return cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
      const rnd = Math.round(Math.random() * 1e9);
      const ext = path.extname(file.originalname).toLowerCase();
      return cb(null, `${file.fieldname}-${Date.now()}-${rnd}${ext}`);
    },
  }),
});

module.exports = function (app, { tweetModel, userModel, saveDB }) {
  const objRepo = {
    tweetModel,
    userModel,
    uuid,
    saveDB,
  };

  //   // Elfelejtett jelszó kérése screen
  //   app.use(
  //     "/forgotpw",
  //     getPublicGalsMW(objRepo),
  //     sendForgotPwMW(objRepo),
  //     renderMW(objRepo, "forgotpw")
  //   );

  // Regisztráció screen
  app.use(
    "/registration",
    //getPublicGalsMW(objRepo),
    regMW(objRepo),
    loginMW(objRepo),
    renderMW(objRepo, "reg")
  );

  // Kilépés
  app.get("/logout", logoutMW(objRepo));

  // Profil screen
  app.use(
    "/profile",
    authMW(objRepo),
    getUserMW(objRepo),
    //uploadMW.single("profile"),
    // modifyProfileImgMW(objRepo),
    // modifyUserMW(objRepo, "email"),
    // modifyUserMW(objRepo, "name"),
    renderMW(objRepo, "profile")
  );

  // app.use(
  //   "/tweet",
  //   authMW(objRepo),
  //   getUserMW(objRepo),
  //   //uploadMW.array('images', 10),
  //   newTweetMW(objRepo),
  //   //modGalMW(objRepo),
  //   renderMW(objRepo, "tweet")
  // );

  app.get(
    "/tweet",
    authMW(objRepo),
    getUserMW(objRepo),
    //uploadMW.array('images', 10),
    //newTweetMW(objRepo),
    //modGalMW(objRepo),
    renderMW(objRepo, "tweet")
  );

  app.post(
    "/tweet",
    authMW(objRepo),
    getUserMW(objRepo),
    //uploadMW.array('images', 10),
    newTweetMW(objRepo),
    //modGalMW(objRepo),
    getTweetsMW(objRepo),
    renderMW(objRepo, "history")
  );

  app.get(
    "/history",
    authMW(objRepo),
    getUserMW(objRepo),
    getTweetsMW(objRepo),
    renderMW(objRepo, "history")
  );

  //Adatkezelési tájékoztató
  app.get("/privacypolicy", renderMW(objRepo, "pp"));

  //Hibás reg
  app.get("/regerr", renderMW(objRepo, "regerr"));

  // Főoldal + bejelentkezés kezelése
  app.use(
    "/",
    getTweetsMW(objRepo),
    loginMW(objRepo),
    renderMW(objRepo, "index")
  );

  return app;
};
