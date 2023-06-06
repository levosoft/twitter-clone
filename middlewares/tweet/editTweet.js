const moment = require("moment");

/**
 * formból érkező új tweet adatok  (res.locals.tweet-t használva),
 * átirányít a belépett felhasználó idővonalára (history)
 * @param objRepo
 * @returns {function(*, *, *): *}
 */
module.exports = function (objRepo) {
  const { tweetModel, saveDB } = objRepo;
  return (req, res, next) => {
    console.log("editTweet - req.params.id", req.params.id);
    if (typeof req.params.id === "undefined") {
      return next();
    }

    // Tweet lekérése paraméter id alapján
    const tweet = tweetModel.findOne({ id: req.params.id });

    // Módosított adatok
    const updatedData = {
      title: req.body.title,
      text: req.body.text,
      date: moment().format("YYYY-MM-DD, HH:mm"),
    };

    // Ellenőrzés, hogy létezik-e a dokumentum
    if (tweet) {
      // Dokumentum frissítése
      Object.assign(tweet, updatedData);

      // Mentés az adatbázisban
      tweetModel.update(tweet);

      // A módosított adatok mentése
      return saveDB(next);
    } else {
      return next(new Error("A tweet nem található."));
    }
  };
};
