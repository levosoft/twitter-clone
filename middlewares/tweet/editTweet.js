/**
 * adott felhasználóhoz tartozó tweet kinyerése (res.locals.tweet)
 * ha nincs ilyen, akkor /tweet ra irányít
 * @param objRepo
 * @returns {function(*, *, *): *}
 */
module.exports = function (objRepo) {
  const { tweetModel } = objRepo;
  return (req, res, next) => {
    const gal = tweetModel.findOne({
      id: req.params.tweetid, //FIXME
      user_id: req.session.userid,
    });

    if (!gal) {
      return res.redirect("/tweet");
    }

    res.locals.tweet = tweet;
    return next();
  };
};
