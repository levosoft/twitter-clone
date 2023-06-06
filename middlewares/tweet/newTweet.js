const moment = require("moment");

/**
 * új tweet létrehozása a bejelentkezett felhasználóhoz
 * @param objRepo
 * @returns {function(*, *, *): *}
 */
module.exports = function (objRepo) {
  const { tweetModel, uuid, saveDB } = objRepo;

  return (req, res, next) => {
    if (typeof req.body.title === "undefined") {
      return next();
    }

    res.locals.tweet = tweetModel.insert({
      id: uuid.v4(),
      userId: req.session.userid,
      title: req.body.title,
      text: req.body.text,
      //image: req.body.image, //FIXME
      date: moment().format("YYYY-MM-DD, HH:mm"),
      deleted: false,
    });

    return saveDB(next);
  };
};
