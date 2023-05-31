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
// const getGalOwnerMW = require("../middlewares/gal/getGalOwner");

// const modGalMW = require("../middlewares/mygal/modGal");
// const getMyGalMW = require("../middlewares/mygal/getMyGal");
// const getMyGalsMW = require("../middlewares/mygal/getMyGals");
// const delGalMW = require("../middlewares/mygal/delGal");
// const delPicMW = require("../middlewares/mygal/delPic");
// const newGalMW = require("../middlewares/mygal/newGal");

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

  //   // Jelszó módosítás
  //   app.use(
  //     "/newpw/:userid/:secret",
  //     getPublicGalsMW(objRepo),
  //     getUserByPwSecretMW(objRepo),
  //     modifyUserMW(objRepo, "password"),
  //     renderMW(objRepo, "newpw")
  //   );

  //   // Regisztráció screen
  //   app.use(
  //     "/reg",
  //     getPublicGalsMW(objRepo),
  //     regMW(objRepo),
  //     loginMW(objRepo),
  //     renderMW(objRepo, "reg")
  //   );

  // Kilépés
  app.get("/logout", logoutMW(objRepo));

  //   // Profil screen
  //   app.use(
  //     "/profile",
  //     authMW(objRepo),
  //     getLoggedInUserMW(objRepo),
  //     uploadMW.single("profile"),
  //     modifyProfileImgMW(objRepo),
  //     modifyUserMW(objRepo, "email"),
  //     modifyUserMW(objRepo, "name"),
  //     renderMW(objRepo, "profile")
  //   );

  // Főoldal + bejelentkezés kezelése
  app.use(
    "/",
    getTweetsMW(objRepo),
    //loginMW(objRepo),
    renderMW(objRepo, "index")
  );

  return app;
};
