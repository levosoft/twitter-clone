/**
 * adott felhasználóhoz tartozó tweet kinyerése (res.locals.tweet beállítása)
 * ha nincs ilyen, akkor /tweet ra irányít
 * @param objRepo
 * @returns {function(*, *, *): *}
 */
module.exports = function (objRepo) {
  const { tweetModel } = objRepo;
  return (req, res, next) => {
    console.log("getTweet - req.params.id", req.params.id);
    const tweet = tweetModel.findOne({
      id: req.params.id,
      userId: req.session.userid,
    });

    if (!tweet) {
      return res.redirect("/tweet");
    }

    res.locals.tweet = tweet;
    console.log("getTweet - res.locals.tweet", tweet);
    return next();
  };
};
